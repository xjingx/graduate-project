import { defineComponent, computed } from 'vue';
import { SchemaTypes, FiledItemProps } from './types';
import StringField from './fields/StringField';
import NumberField from './fields/NumberField';
import ObjectField from './fields/ObjectField';
import { retrieveSchema } from './utils';

export default defineComponent({
  name: 'SchemaItem',
  props: FiledItemProps,
  setup(props) {
    const retrieveSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props;
      return retrieveSchema(schema, rootSchema, value);
    });

    return () => {
      console.log('111', props.value);
      const { schema } = props;
      const retrieveSchema = retrieveSchemaRef.value;

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
        case SchemaTypes.OBJECT: {
          Component = ObjectField;
          break;
        }
        default: {
          console.warn(`${type} is not exist`);
        }
      }
      return <Component {...props} schema={retrieveSchema} />;
    };
  }
});
