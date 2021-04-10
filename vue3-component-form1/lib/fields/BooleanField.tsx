import { defineComponent, computed } from 'vue';
import { FiledItemProps, CommonWidgetNames } from '../types';
import { getWidget } from '../ThemeProcess';

export default defineComponent({
  name: 'BooleanFeild',
  props: FiledItemProps,
  setup(props) {
    const handleChange = (v: boolean) => {
      return props.onChange(v);
    };

    const BooleanWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.BooleanWidget, props);
      return widgetRef.value;
    });

    return () => {
      const { value, errorSchema, schema } = props;
      const BooleanWidget = BooleanWidgetRef.value;
      return (
        <BooleanWidget
          value={value}
          errors={errorSchema._errors}
          onChange={handleChange}
          schema={schema}
        />
      );
    };
  }
});
