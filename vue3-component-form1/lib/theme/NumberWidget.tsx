import { CommonWidget, CommonWidgetProps } from '../types';
import { defineComponent, nextTick } from 'vue';

const NumberWidget: CommonWidget = defineComponent({
  props: CommonWidgetProps,
  setup(props) {
    const handleChange = (e: any) => {
      //e.target.value = props.value;
      props.onChange(e.target.value);
    };

    return () => {
      const { value } = props;
      return (
        <input type="number" value={value as any} onInput={handleChange} />
      );
    };
  }
});

export default NumberWidget;
