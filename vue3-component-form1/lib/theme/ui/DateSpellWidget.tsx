import { CommonWidget, CommonWidgetProps } from '../../types';
import { defineComponent, nextTick, ref, watch } from 'vue';

import { ElDatePicker } from 'element-plus'

import { withFormItem } from '../FormInfo';

const PasswordWidget: CommonWidget = withFormItem(
  defineComponent({
    name: 'DateSpellWidget',
    props: CommonWidgetProps,
    setup(props) {

      console.log('123', ElDatePicker)

      const changeValueRef = ref(props.value);

      // 为什么要这么麻烦，因为双向绑定不能直接绑定props，绑定的是声明的变量changeValueRef.value
      // 而我们在这个变量改变时，必须去通过onChange去改变我们props里的value
      // 而props里的value改变时，又要去使changeValueRef.value改变
      // TODO: 我也不知道为啥changeValueRef不会自动改变，有待去验证(可能是和写在return前面有关，可以验证一下)
      watch(changeValueRef, (newValue, oldValue) => {
        if (newValue !== props.value) {
          props.onChange(newValue);
        }
      });

      // 引用类型的watch用法
      watch(
        () => props.value,
        (newValue, oldValue) => {
          if (newValue !== changeValueRef.value) {
            changeValueRef.value = newValue;
          }
        }
      );

      return () => {
        return (
          <ElDatePicker unlink-panels range-separator="至" start-placeholder="开始时间"
          end-placeholder="结束时间" placeholder="选择日期时间" type="datetimerange" v-model={ changeValueRef.value } />
        );
      };
    }
  })
);

export default PasswordWidget;
