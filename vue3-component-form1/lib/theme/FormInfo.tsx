import { defineComponent } from 'vue';
import { CommonWidgetProps, CommonWidget } from '../types';

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
  }
});

// 主要是为了将错误信息绑定
const FormInfo = defineComponent({
  name: 'FormInfo',
  props: CommonWidgetProps,
  setup(props, { slots }) {
    const classesRef = useStyles();

    return () => {
      const { schema, errors } = props;
      console.log('err', errors);
      const classes = classesRef.value;
      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema.title}</label>
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
export function withFormItem(Widget: any) {
  return defineComponent({
    name: `${Widget.name}`,
    props: CommonWidgetProps,
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
