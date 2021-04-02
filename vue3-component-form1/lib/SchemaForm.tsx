import {
  defineComponent,
  provide,
  watch,
  Ref,
  shallowRef,
  reactive,
  ref,
  watchEffect,
  computed
} from 'vue'; //provide和inject解决循环引用，可以在孙子节点通过inject拿到provide提供的祖先节点
import {
  FiledFormProps,
  defaultAjvOptions,
  CommonWidget,
  Schema
} from './types';
import SchemaItem from './SchemaItems';
import {
  ProvideKey,
  formatMapRefProvideKey,
  transformSchemaProvideKey
} from './provideKeys';
import { validateFormData, ErrorSchema } from './validate';
import Ajv from 'ajv';

export default defineComponent({
  name: 'SchemaForm',
  props: FiledFormProps,
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v);
    };

    const ProvideContent: any = {
      SchemaItem
    }; //如果使用单纯的对象，当Item发生变化时，孙子节点使用这个组件的位置是没办法更新的，用reactive可以监听到更新
    //只不过这个地方用单纯对象也可以，SchemaItem一般是不会进行改变的，因为是个组件，不是变量

    provide(ProvideKey, ProvideContent);

    // formatRef
    const formatMapRef = computed(() => {
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats];
        return customFormats.reduce((result, format) => {
          //  validatorRef.value.addFormat(format.name, format.definition);
          result[format.name] = format.component;
          return result;
        }, {} as { [key: string]: CommonWidget });
      } else {
        return {};
      }
    });

    const forMatProvide: any = {
      formatMapRef
    };

    provide(formatMapRefProvideKey, forMatProvide);

    const transformSchemaRef = computed(() => {
      if (props.customKeywords) {
        const customKeyWords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords];

        return (schema: Schema) => {
          let newSchema = schema;
          customKeyWords.forEach((keyword) => {
            if ((newSchema as any)[keyword.name]) {
              newSchema = keyword.transformSchema(schema);
            }
          });
          return newSchema;
        };
      }
      return (s: Schema) => s;
    });

    const transformSchemaProvide: any = {
      transformSchemaRef
    };

    provide(transformSchemaProvideKey, transformSchemaProvide);

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({});

    const validatorRef: Ref<Ajv.Ajv> = shallowRef() as any;

    // 生成ajv的实例
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions
      });

      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats];
        customFormats.forEach((format) => {
          validatorRef.value.addFormat(format.name, format.definition);
        });
      }

      if (props.customKeywords) {
        const customKeyWords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords];
        // 这addKeyword 注意一下
        customKeyWords.forEach((keyword) =>
          validatorRef.value.addKeyword(keyword.name, keyword.definition)
        );
      }
    });

    const verifyResolveRef = ref();
    const veriFyIndex = ref(0);

    // deep: ture深度监听，里面每个对象变化都能检测到，而不仅仅是整个一级对象（应该是这意思）
    watch(
      () => props.value,
      () => {
        if (verifyResolveRef.value) {
          doValidate();
        }
      },
      { deep: true }
    );

    // 异步校验，有可能结果没返回时，又输入了东西，就要覆盖之前的结果
    async function doValidate() {
      const index = (veriFyIndex.value += 1);
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate
      );

      if (index !== veriFyIndex.value) return;

      errorSchemaRef.value = result.errorSchema;

      verifyResolveRef.value(result);
      //重置
      verifyResolveRef.value = undefined;
      //return result;
    }
    // 这修改了props.contextRef，好像在app.tsx里拿得到
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return new Promise((resolve) => {
                verifyResolveRef.value = resolve;
                doValidate();
              });
            }
          };
        }
      },
      {
        immediate: true
      }
    );

    return () => {
      const { schema, value, uiSchema } = props;
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          uiSchema={uiSchema || {}}
          errorSchema={errorSchemaRef.value || {}}
        />
      );
    };
  }
});
