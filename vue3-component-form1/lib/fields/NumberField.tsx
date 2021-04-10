import { defineComponent, computed } from 'vue';
import { FiledItemProps, CommonWidgetNames } from '../types';
import { getWidget } from '../ThemeProcess';

export default defineComponent({
  name: 'NumberFeild',
  props: FiledItemProps,
  setup(props) {
    const handleChange = (v: string) => {
      const num = Number(v);

      if (Number.isNaN(num)) {
        props.onChange(undefined);
      } else {
        props.onChange(num);
      }
    };

    const NumberWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.NumberWidget, props);
      return widgetRef.value;
    });

    return () => {
      const { value, errorSchema, schema, required } = props;
      const NumberWidget = NumberWidgetRef.value;
      return (
        <NumberWidget
          value={value}
          errors={errorSchema._errors}
          onChange={handleChange}
          required={required}
          schema={schema}
        />
      );
    };
  }
});
