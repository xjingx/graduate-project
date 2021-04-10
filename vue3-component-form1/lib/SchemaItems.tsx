import { defineComponent, computed } from 'vue';
import { SchemaTypes, FiledItemProps, GetTransformSchema } from './types';
import StringField from './fields/StringField';
import NumberField from './fields/NumberField';
import ObjectField from './fields/ObjectField';
import ArrayField from './fields/ArrayField';
import BooleanField from './fields/BooleanField';
import { retrieveSchema } from './utils';

export default defineComponent({
  name: 'SchemaItem',
  props: FiledItemProps,
  setup(props) {
    const transformSchemaContent = GetTransformSchema();
    // 遍历处理
    const retrieveSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props;
      return transformSchemaContent.transformSchemaRef.value(
        retrieveSchema(schema, rootSchema, value)
      );
    });

    return () => {
      console.log('111', props.uiSchema);
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
        case SchemaTypes.ARRAY: {
          Component = ArrayField;
          break;
        }
        case SchemaTypes.BOOLEAN: {
          Component = BooleanField;
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
