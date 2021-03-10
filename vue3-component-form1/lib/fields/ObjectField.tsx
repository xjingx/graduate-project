import { defineComponent, inject } from 'vue';
import { FiledItemProps } from '../types';
import { SchemaItemProvideKey } from '../provideKeys';
import { isObject } from '../utils';

const TypeHelper = defineComponent({
  props: FiledItemProps
});

type SchemaItemTypeHelper = typeof TypeHelper;

export default defineComponent({
  name: 'ObjectField',
  props: FiledItemProps,
  setup(props) {
    const SchemaItemContent:
      | { SchemaItem: SchemaItemTypeHelper }
      | undefined = inject(SchemaItemProvideKey);

    if (!SchemaItemContent) {
      throw Error('this key is not exist');
    }

    const handleObjectFieldChange = (k: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {};

      if (v === undefined) {
        //v就是在表单上修改的新值，如果是undefined就在原来的value上删去这一行的值
        delete value[k];
      } else {
        value[k] = v; //如果不是undefined，就得在原来的基础上修改或者添加这一行，修改和添加都是一样的
      }

      props.onChange(value); //触发onChange提交最新的value
    };

    return () => {
      const { schema, rootSchema, value } = props;
      const { SchemaItem } = SchemaItemContent;
      const properties = schema.properties || {}; //有可能不存在properties

      const currentValue: any = isObject(value) ? value : {};

      console.log('propertise', properties);

      return Object.keys(properties).map(
        (key: any, index: number) => (
          <SchemaItem
            schema={properties[key]}
            rootSchema={rootSchema}
            value={currentValue[key]}
            key={index}
            onChange={(v: any) => handleObjectFieldChange(key, v)}
          />
        )
        // key={index}其实就和v-for一样给个标识，value就是默认值，如果value不是对象，就设置为空对象，因为有些ObjectSchema
        // 可能就没有设置默认值
      );
    };
  }
});
