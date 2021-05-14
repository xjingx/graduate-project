import { 
  getCurrentInstance, 
  defineComponent, 
  ref, 
  Ref, 
  reactive,
  watchEffect, 
  onBeforeUnmount 
} from 'vue';
import { createUseStyles } from 'vue-jss';

import MonacoEditor from './components/MonacoEditor';

import demos from './demos';

import SchemaForm, { ThemeProcess } from '../lib';

// 这里面是theme的内容
import theme from '../lib/theme';
import { format } from './formats/customFormat';
import customKeyword from './formats/customKeyword';

import BackDialog from '../lib/dialog/index'
import Swiper from '../lib/swiper/index';

console.log('----->', demos);

// TODO: 在lib中export
type Schema = any;
type UISchema = any;

function toJson(data: any) {
  return JSON.stringify(data, null, 2);
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto'
  },
  menu: {
    marginBottom: 20
  },
  title: {
    width: 700,
    display: 'flex',
    flexDirection: 'row',
  },
  code: {
    width: 700,
    flexShrink: 0
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%'
    }
  },
  content: {
    display: 'flex'
  },
  form: {
    padding: '0 20px',
    flexGrow: 1
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef'
    }
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7'
    }
  },
});

export default defineComponent({
  setup() {
    const selectedRef: Ref<number> = ref(0);

    const ctx: any = getCurrentInstance();
    ctx.ctx.$backDialog.bus.on('show', show);
    ctx.ctx.$backDialog.bus.on('close', close);

    const demo: {
      schema: Schema | null;
      data: any;
      uiSchema: UISchema | null;
      schemaCode: string;
      dataCode: string;
      uiSchemaCode: string;
      customValidate: ((d: any, e: any) => void) | undefined;
      title: string;
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined,
      title: '',
    });

    const dialogShow: Ref<any> = ref()
    dialogShow.value = false;

    function show() {
      dialogShow.value = true;
    }
    function close() {
      dialogShow.value = false;
    }
    function showDialog() {
      ctx.ctx.$backDialog.show({data: {}, onClickSure: oC});
    }
    function oC() {
      dialogShow.value = false;
    }

    watchEffect(() => {
      // 点击首页按钮会触发这个watch，改变index从而改变d，然后改变demo
      const index = selectedRef.value;
      const d: any = demos[index];
      demo.schema = d.schema;
      demo.data = d.default;
      demo.uiSchema = d.uiSchema;
      demo.schemaCode = toJson(d.schema);
      demo.dataCode = toJson(d.default);
      demo.uiSchemaCode = toJson(d.uiSchema);
      demo.customValidate = d.customValidate;
      demo.title = d.name;
    });

    const isLunbo: Ref<any> = ref();
    const dialog: Ref<any> = ref();

    watchEffect(() => {
      isLunbo.value = demo.title === 'lunbo' ? true : false;
    })

    watchEffect(() => {
      dialog.value = demo.title === 'dialog' ? true : false;
    })

    const methodRef: Ref<any> = ref();

    const classesRef = useStyles();

    const handleChange = (v: any) => {
      // 这是传给Schema的，改变时只改变demo.data和datacode，所以只有value部分的monacoEditor代码会变
      demo.data = v;
      demo.dataCode = toJson(v);
    };

    function handleCodeChange(
      // 这是传给monacoEditor的，通过这个方法，monacoEditor改变时会改变demo的值，
      // 反过来改变monacoEditor渲染的代码，同时demo的值改变，也会使Schema组件的渲染改变，以此做到双向绑定
      filed: 'schema' | 'data' | 'uiSchema',
      value: string
    ) {
      try {
        const json = JSON.parse(value);
        demo[filed] = json;
        (demo as any)[`${filed}Code`] = value;
      } catch (err) {
        // some thing
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v);
    const handleDataChange = (v: string) => handleCodeChange('data', v);
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v);

    const contextRef = ref();
    const nameRef = ref();

    function doVerify() {
      contextRef.value.doValidate().then((res: any) => {
        console.log(res);
      });
    }

    const images = [
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg',
        id: 11351
      },
      {
        linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2197820&g_f=shoujijiaodian',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
        id: 11372
      },
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg',
        id: 11378
      },
      {
        linkUrl: 'https://y.qq.com/msa/218/0_4085.html',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg',
        id: 11375
      },
      {
        linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2195876&g_f=shoujijiaodian',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg',
        id: 11287
      }
    ]
    
    function getSwiperSchema(text: string) {
      console.log('getSwiperSchema', text);
    }
    return () => {
      const classes = classesRef.value;
      const selected = selectedRef.value;

      console.log(methodRef);

      return (
        // <StyleThemeProvider>
        // <VJSFThemeProvider theme={theme as any}>
        <div class={classes.container}>
          <div class={classes.menu}>
            <div class={classes.title}>
              <h1>Vue3 JsonSchema Form</h1>
              {dialog.value ? 
                (<button onClick={showDialog}>唤起弹窗</button>) : ''
              }
            </div>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              {isLunbo.value ? 
                (<div>
                  <Swiper autoplay={3000} images={images} onGetSwiperSchema={getSwiperSchema}></Swiper>
                </div>) : ''
              }
              <MonacoEditor
                code={demo.schemaCode}
                class={classes.codePanel}
                onChange={handleSchemaChange}
                title="Schema"
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  class={classes.codePanel}
                  onChange={handleUISchemaChange}
                  title="UISchema"
                />
                <MonacoEditor
                  code={demo.dataCode}
                  class={classes.codePanel}
                  onChange={handleDataChange}
                  title="Value"
                />
              </div>
            </div>
            <div class={classes.form}>
              <ThemeProcess theme={theme}>
                <SchemaForm
                  schema={demo.schema}
                  uiSchema={demo.uiSchema || {}}
                  onChange={handleChange}
                  value={demo.data}
                  contextRef={contextRef}
                  customFormats={format}
                  customKeywords={customKeyword}
                  ref={nameRef} //不知道这个是啥
                  customValidate={demo.customValidate}
                />
              </ThemeProcess>
              {/* <SchemaForm
                schema={demo.schema!}
                uiSchema={demo.uiSchema!}
                onChange={handleChange}
                contextRef={methodRef}
                value={demo.data}
              /> */}
              <button onClick={doVerify}>校验</button>
            </div>
          </div>
          {dialogShow.value ? 
            (<BackDialog dialogData={demo.data} onclickSure={close}></BackDialog>) : ''
          }
        </div>
        // </VJSFThemeProvider>
        // </StyleThemeProvider>
        
      );
    };
  }
});
