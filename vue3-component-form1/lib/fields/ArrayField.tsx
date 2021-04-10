import { defineComponent, PropType } from 'vue';
import {
  FiledItemProps,
  GetSchemaItemContent,
  SelectionWidgetNames,
  Schema
} from '../types';
import { createUseStyles } from 'vue-jss';
import { getWidget } from '../ThemeProcess';
import 'element-plus/lib/theme-chalk/index.css'
import { ElButton } from 'element-plus'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eeeeee'
  },
  actions: {
    background: '#eeeeee',
    padding: 6,
    textAlign: 'right'
  },
  action: {
    '& + &': {
      marginLeft: 10 // 这样可以除了第一个，后面都带有margin-left: 10,很神奇，可以实现类似flex的效果
    }
  },
  content: {
    padding: 10
  }
});

const SingleArraySchema = defineComponent({
  name: 'SingleArraySchema',
  props: {
    //增加的方法
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { slots }) {
    const classesRef = useStyles();

    const handleOnAdd = () => props.onAdd(props.index);
    const handleOnDelete = () => props.onDelete(props.index);
    const handleOnUp = () => props.onUp(props.index);
    const handleOnDown = () => props.onDown(props.index);

    // vue3 的slot获取都是函数形式
    return () => {
      const classes = classesRef.value;
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <a onClick={handleOnAdd} class={classes.actions}>
              <i class="el-icon-plus"></i>
            </a>
            <a onClick={handleOnDelete} class={classes.actions}>
              <i class="el-icon-delete"></i>
            </a>
            <a onClick={handleOnUp} class={classes.actions}>
              <i class="el-icon-sort-up"></i>
            </a>
            <a onClick={handleOnDown} class={classes.actions}>
              <i class="el-icon-sort-down"></i>
            </a>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      );
    };
  }
});

/**
 * 三种情况 1.item是一个对象，表明单一数组type，可以增删 2.item是个固定数组，数组里面是有不同type的对象
 *         3.第一中的延申，不过有特殊字串表明功能
 *         1.{items:{type:string}} 2.{items:[{type:string},{type:number}]} 3.{items:{type:string,enum:['1','2']}}
 */

export default defineComponent({
  name: 'ArrayField',
  props: FiledItemProps,
  setup(props) {
    const SchemaItemContent = GetSchemaItemContent();
    //const ThemeContent = GetThemeContent();

    const handleVariedTypeChange = (v: any, index: number) => {
      //第二种array类型的handleChange,v是值，index是具体哪一项
      const { value } = props;
      const defaultValue = Array.isArray(value) ? value : [];

      defaultValue[index] = v;
      props.onChange(defaultValue);
      // 要理解这个onChange的顺序，这个handleVariedTypeChange方法最后是由StringField或者NumberField调用的
      // 而调用的这个现在props.onChange是最早由item传进来的，也就是修改demo.data的方法，也可能是ObjectField那里来的
    };

    const handleSingleSchemaChange = (v: any, index: number) => {
      //第一种array类型的handleChange,v是值，index是具体哪一项，和上面一样
      const { value } = props;
      const defaultValue = Array.isArray(value) ? value : [];

      defaultValue[index] = v;
      props.onChange(defaultValue);
    };

    // 第一种array类型的增删方法实现
    // 增加
    const handleOnAdd = (index: number) => {
      const { value } = props;
      const defaultValue = Array.isArray(value) ? value : [];

      // 虽然是undefine，但是依旧可以把默认的value数组多增加一项，这样在渲染时就会多渲染一个SingleArraySchema组件
      defaultValue.splice(index + 1, 0, undefined);

      props.onChange(defaultValue);
    };
    // 删除
    const handleOnDelete = (index: number) => {
      const { value } = props;
      const defaultValue = Array.isArray(value) ? value : [];

      // 删除这项
      defaultValue.splice(index, 1);

      props.onChange(defaultValue);
    };
    // 上移
    const handleOnUp = (index: number) => {
      // index为0，就不能上移了
      if (index === 0) {
        return;
      }
      const { value } = props;
      const defaultValue = Array.isArray(value) ? value : [];

      // splice返回的是带有删除项的数组
      const item = defaultValue.splice(index, 1);
      defaultValue.splice(index - 1, 0, item[0]);

      props.onChange(defaultValue);
    };
    // 下移
    const handleOnDown = (index: number) => {
      const { value } = props;
      const defaultValue = Array.isArray(value) ? value : [];

      // 如果是最后一项，就无法下移了
      if (index === defaultValue.length - 1) {
        return;
      }
      // splice返回的是带有删除项的数组
      const item = defaultValue.splice(index, 1);
      defaultValue.splice(index + 1, 0, item[0]);

      props.onChange(defaultValue);
    };

    // Ref不能写在return里面，里面是render函数，创建Ref只能写在上面
    const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget);

    return () => {
      //const SelectArrayComponent = ThemeContent.theme.widgets.SelectionWidget;
      const SelectionWidget = SelectionWidgetRef.value;

      console.log('selection', SelectionWidget);

      const { schema, rootSchema, value, errorSchema, uiSchema } = props;
      const SchemaItem = SchemaItemContent.SchemaItem;

      const isVariedType = Array.isArray(schema.items); // 判断是否为多种type的item，也就是是否为第二重情况
      const isSelect = schema.items && (schema.items as any).enum; //判断是否为第一种，就是有没有enum

      console.log('isVa', isVariedType);

      if (isVariedType) {
        const items: Schema[] = schema.items as any;
        const defaultValue: Array<any> = Array.isArray(value) ? value : []; //判断默认值是否存在

        return items.map((v: Schema, index: number) => {
          const itemUIschema = uiSchema.items;
          // 判断是不是数组 从而决定应该是什么
          const us = Array.isArray(itemUIschema) // 得到对应index的uiSchema值，传入
            ? itemUIschema[index] || {}
            : itemUIschema || {};
          return (
            <SchemaItem
              schema={v}
              uiSchema={us}
              key={index}
              rootSchema={rootSchema}
              errorSchema={errorSchema[index] || []}
              value={defaultValue[index]}
              onChange={(v: any) => handleVariedTypeChange(v, index)}
            />
          );
        });
      } else if (!isSelect) {
        const defaultValue = Array.isArray(value) ? value : [];
        console.log('de', defaultValue);
        // 为什么这个不用items，因为这个items只有一种情况，恒只有一种，根据value的值来渲染看多少个组件
        // uiSchema也就只有一种类型，所以直接传
        return defaultValue.map((v: any, index: number) => {
          return (
            <SingleArraySchema
              index={index}
              onAdd={handleOnAdd}
              onDelete={handleOnDelete}
              onUp={handleOnUp}
              onDown={handleOnDown}
            >
              <SchemaItem
                schema={schema.items as Schema}
                uiSchema={(uiSchema.items as any) || {}}
                value={v}
                key={index}
                rootSchema={rootSchema}
                errorSchema={errorSchema[index] || []}
                onChange={(v: any) => handleSingleSchemaChange(v, index)}
              />
            </SingleArraySchema>
          );
        });
      } else {
        const enumOptions = (schema as any).items.enum;
        const options = enumOptions.map((opValue: any) => {
          return {
            key: opValue,
            value: opValue
          };
        });
        return (
          <SelectionWidget
            onChange={props.onChange}
            value={props.value}
            options={options}
            errors={errorSchema._errors}
            schema={schema}
          ></SelectionWidget>
        );
      }
    };
  }
});
