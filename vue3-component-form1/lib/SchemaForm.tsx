import { defineComponent, provide, watch, reactive } from 'vue'; //provide和inject解决循环引用，可以在孙子节点通过inject拿到
import { FiledFormProps } from './types'; //provide提供的祖先节点
import SchemaItem from './SchemaItems';
import { ProvideKey } from './provideKeys';

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

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return {
                valid: true,
                errors: []
              };
            }
          };
        }
      },
      {
        immediate: true
      }
    );

    return () => {
      const { schema, value } = props;
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
        />
      );
    };
  }
});
