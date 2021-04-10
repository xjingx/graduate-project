import { defineComponent } from 'vue';
import { CommonWidgetProps, CommonWidget } from '../types';
import 'element-plus/lib/theme-chalk/index.css'

import { createUseStyles } from 'vue-jss';

const useStyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    color: '#777'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    margin: '5px 0',
    padding: 0,
    paddingLeft: 20
  },
  itemLabel: {
    content: '*',
    color: '#F56C6C',
    marginRight: '4px',
  }
});

// 主要是为了将错误信息绑定
const FormInfo = defineComponent({
  name: 'FormInfo',
  props: CommonWidgetProps,
  setup(props, { slots }) {
    const classesRef = useStyles();

    return () => {
      const { schema, errors, required } = props;
      console.log('err', errors);
      const classes = classesRef.value;
      return (
        <div class={classes.container}>
          <div style="display: flex">
            {required ? <label class={classes.itemLabel}>*</label> : {}}
            <label style="line-height: 20px" class="el-form-item__label">{schema.title}</label>
          </div>
          {slots.default && slots.default()}
          <ul class={classes.errorText}>
            {errors?.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        </div>
      );
    };
  }
});

export default FormInfo;

//HOC, Vue的高阶组件
// composition api 怎么进行逻辑抽离的？
// 这里主要是为了将错误信息errors的处理抽离出来

export function withFormItem(Widget: any) {
  return defineComponent({
    name: `${Widget.name}`,
    props: CommonWidgetProps, // 这里props讲道理是从widget里面拿的，多余的在attrs里
    setup(props, { attrs }) {
      return () => {
        return (
          <FormInfo {...props}>
            <Widget {...props} {...attrs} />
          </FormInfo>
        );
      };
    }
  }) as any;
}
