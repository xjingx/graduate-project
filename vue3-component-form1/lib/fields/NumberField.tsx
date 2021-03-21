import { defineComponent } from 'vue';
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

    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget);

    return () => {
      const { value } = props;
      const NumberWidget = NumberWidgetRef.value;
      return <NumberWidget value={value} onChange={handleChange} />;
    };
  }
});
