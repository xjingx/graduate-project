import { defineComponent } from 'vue';
import { FiledProps } from './types';
import SchemaItem from './SchemaItems';

export default defineComponent({
  name: 'SchemaForm',
  props: FiledProps,
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v);
    };

    return () => {
      const { schema, value } = props;
      return (
        <SchemaItem schema={schema} value={value} onChange={handleChange} />
      );
    };
  }
});
