import { PropType, defineComponent, inject, DefineComponent, Ref } from 'vue';
import { ProvideKey } from './provideKeys';
import { Options } from 'ajv';
// 枚举类型
export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean'
}

type SchemaRef = { $ref: string };

export interface Schema {
  type?: SchemaTypes | string;
  const?: any;
  format?: string;

  title?: string;
  default?: any;

  properties?: {
    [key: string]: Schema;
  };
  items?: Schema | Schema[] | SchemaRef;
  uniqueItems?: any;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[];
  enum?: any[];
  enumNames?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}

interface ContextRef {
  doValidate: () => {
    errors: any[];
    valid: boolean;
  };
}

export const FiledFormProps = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  contextRef: {
    type: Object as PropType<Ref<ContextRef | undefined>>
  },
  ajvOptions: {
    type: Object as PropType<Options>
  }
} as const;

export const FiledItemProps = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true
  }
} as const;

export const TypeHelper = defineComponent({
  props: FiledItemProps
});

export type FieldTypeHelper = typeof TypeHelper;

export function GetSchemaItemContent() {
  const SchemaItemContent: { SchemaItem: FieldTypeHelper } | undefined = inject(
    ProvideKey
  );

  if (!SchemaItemContent) {
    throw Error('this key is not exist');
  }

  return SchemaItemContent;
}

export function GetThemeContent() {
  const ThemeContent: { theme: Theme } | undefined = inject(ProvideKey);

  if (!ThemeContent) {
    throw Error('this key is not exist');
  }

  return ThemeContent;
}

// 定义props类型
export const CommonWidgetProps = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  }
} as const;

// 这里类似于一种继承，继承了CommonWidgetProps
export const SelectionWidgetProps = {
  ...CommonWidgetProps,
  options: {
    type: Array as PropType<
      {
        key: string;
        value: any;
      }[]
    >,
    required: true
  }
} as const;

// 定义组件类型
export type CommonWidget = DefineComponent<typeof CommonWidgetProps, {}, {}>;

export type SelectionWidget = DefineComponent<
  typeof SelectionWidgetProps,
  {},
  {}
>;

// 公共widget 没啥用 在某个widget没开发完成前 占位置的
export const CommonWidget: CommonWidget = defineComponent({
  props: CommonWidgetProps,
  setup() {
    return () => null;
  }
});

export enum SelectionWidgetNames {
  SelectionWidget = 'SelectionWidget'
}

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget'
}

export interface Theme {
  widgets: {
    [SelectionWidgetNames.SelectionWidget]: SelectionWidget;
    [CommonWidgetNames.TextWidget]: CommonWidget;
    [CommonWidgetNames.NumberWidget]: CommonWidget;
  };
}
