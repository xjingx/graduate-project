import { CommonWidget, CommonWidgetProps } from '../types';
import { defineComponent, nextTick, computed } from 'vue';

import { withFormItem } from './FormInfo';

const TextWidget: CommonWidget = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetProps,
    setup(props) {
      const handleChange = (e: any) => {
        //e.target.value = props.value;
        props.onChange(e.target.value);
      };

      const styleRef = computed(() => {
        return {
          color: (props.options && props.options.color) || 'black'
        };
      });

      return () => {
        const { value } = props;
        return (
          <input
            type="text"
            value={value as any}
            onInput={handleChange}
            style={styleRef.value}
          />
        );
      };
    }
  })
);

export default TextWidget;
