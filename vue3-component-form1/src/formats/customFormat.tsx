import { CustomFormat, CommonWidgetProps } from '../../lib/types';
import { defineComponent, computed } from 'vue';
import { withFormItem } from '../../lib/theme/FormInfo';

export const format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  },
  component: withFormItem(
    defineComponent({
      name: 'ColorWidget',
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
              type="color"
              value={value as any}
              onInput={handleChange}
              style={styleRef.value}
            />
          );
        };
      }
    })
  )
};
