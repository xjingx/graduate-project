import { defineComponent } from 'vue';
import { FiledPropsString } from '../types';

export default defineComponent({
  name: 'StringFeild',
  props: FiledPropsString,
  setup(props) {
    const handleChange = (e: any) => {
      console.log(e);
      props.onChange(e.target.value);
    };
    return () => {
      const { value } = props;
      return <input type="text" value={value} onInput={handleChange} />;
    };
  }
});
