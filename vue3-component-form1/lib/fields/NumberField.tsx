import { defineComponent } from 'vue';
import { FiledPropsNumber } from '../types';

export default defineComponent({
  name: 'NumberFeild',
  props: FiledPropsNumber,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value;

      const num = Number(value);

      if (Number.isNaN(num)) {
        props.onChange(undefined);
      } else {
        props.onChange(num);
      }
    };

    return () => {
      const { value } = props;
      return <input type="number" value={value} onInput={handleChange} />;
    };
  }
});
