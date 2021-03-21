import { defineComponent } from 'vue';
import { FiledItemProps, CommonWidgetNames } from '../types';
import { getWidget } from '../ThemeProcess';

export default defineComponent({
  name: 'StringFeild',
  props: FiledItemProps,
  setup(props) {
    const handleChange = (v: string) => {
      return props.onChange(v);
    };

    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget);

    return () => {
      const { value } = props;
      const TextWidget = TextWidgetRef.value;

      return <TextWidget value={value} onChange={handleChange} />;
    };
  }
});
