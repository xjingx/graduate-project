import { CommonWidget, CommonWidgetProps } from '../../lib/types';
import { defineComponent, nextTick } from 'vue';

import { withFormItem } from '../../lib/theme/FormInfo';

const PasswordWidget: CommonWidget = withFormItem(
  defineComponent({
    name: 'PasswordWidget',
    props: CommonWidgetProps,
    setup(props) {
      const handleChange = (e: any) => {
        //e.target.value = props.value;
        props.onChange(e.target.value);
      };

      return () => {
        const { value } = props;
        return (
          <input type="password" value={value as any} onInput={handleChange} />
        );
      };
    }
  })
);

export default PasswordWidget;
