import { defineComponent, computed } from 'vue';
import { FiledItemProps, CommonWidgetNames } from '../types';
import { getWidget } from '../ThemeProcess';

export default defineComponent({
  name: 'StringFeild',
  props: FiledItemProps,
  setup(props) {
    const handleChange = (v: string) => {
      const re= /select|update|delete|exec|count|'|"|=|;|>|<|%/gi
      v = v.replace(re, '');
      return props.onChange(v);
    };

    // 如果uiSchema 变了，不用computed 拿到的widget是不会变得
    const TextWidgetRef = computed(() => {
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props);
      return widgetRef.value;
    });

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema;
      return rest;
    });

    return () => {
      const { value, errorSchema, schema, required } = props;
      const TextWidget = TextWidgetRef.value;

      return (
        <TextWidget
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
