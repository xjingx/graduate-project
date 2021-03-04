import { defineComponent } from 'vue';
import { SchemaTypes, FiledProps } from './types';
import StringField from './fields/StringField';
import NumberField from './fields/NumberField';

export default defineComponent({
  name: 'SchemaItem',
  props: FiledProps,
  setup(props) {
    return () => {
      const { schema } = props;
      console.log('item', props);

      //TODO: 如果type不存在，需要猜测用户的type
      const type = schema.type;
      let Component: any;

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField;
          break;
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField;
          break;
        }
        default: {
          console.warn(`${type} is not exist`);
        }
      }
      return <Component {...props} />;
    };
  }
});
