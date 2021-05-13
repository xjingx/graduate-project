import { defineComponent, computed } from 'vue';
import { FiledItemProps, CommonWidgetNames } from '../types';
import { getWidget } from '../ThemeProcess';

export default defineComponent({
  name: 'ImgFeild',
  props: FiledItemProps,
  setup(props) {
    const handleChange = (v: string) => {
      return props.onChange(v);
    };

    // 如果uiSchema 变了，不用computed 拿到的widget是不会变得
    const ImgWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.ImgWidget, props);
      return widgetRef.value;
    });

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema;
      return rest;
    });

    return () => {
      const { value, errorSchema, schema, required } = props;
      const ImgWidget = ImgWidgetRef.value;

      return (
        <ImgWidget
          value={value}
          errors={errorSchema._errors}
          onChange={handleChange}
          schema={schema}
          required={required}
          options={widgetOptionsRef.value}
        />
      );
    };
  }
});
