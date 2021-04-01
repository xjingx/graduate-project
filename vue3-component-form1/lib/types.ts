import { PropType, defineComponent, inject, DefineComponent, Ref } from 'vue';
import {
  ProvideKey,
  ThemeProvideKey,
  formatMapRefProvideKey,
  transformSchemaProvideKey
} from './provideKeys';
import {
  Options,
  FormatDefinition,
  KeywordDefinition,
  CompilationContext
} from 'ajv';
import { ErrorSchema } from './validate';
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
  doValidate: () => Promise<{
    errors: any[];
    valid: boolean;
  }>;
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
  // 可以不传，应该类似于增加一些ajv错误配置之类的
  ajvOptions: {
    type: Object as PropType<Options>
  },
  locale: {
    type: String,
    default: 'zh'
  },
  customValidate: {
    type: Function as PropType<(data: any, errors: any) => void>
  },
  uiSchema: {
    type: Object as PropType<uiSchema>
  },
  customFormats: {
    type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>
  },
  customKeywords: {
    type: [Array, Object] as PropType<CustomKeyWord[] | CustomKeyWord>
  }
} as const;

// error信息
export const defaultAjvOptions: Options = {
  // 使用ajv包的必须配置
  allErrors: true
  // validate里面toPath解析的是.pass1.xx这种路径，jsonPointers会转成/obj/a这种斜杠
  //jsonPointers: true
};

export type uiSchema = {
  widget?: string | CommonWidget;
  // properties对应对象的元素
  properties?: {
    [key: string]: uiSchema;
  };
  // items对应数组元素，单类型数组就第一种，多类型就第二种
  items?: uiSchema | uiSchema[];
} & {
  [key: string]: any;
};

export interface CustomFormat {
  name: string;
  definition: FormatDefinition;
  component: CommonWidget;
}

interface CustomKeywordDefinition {
  type?: string | Array<string>;
  async?: boolean;
  $data?: boolean;
  errors?: boolean | string;
  metaSchema?: object;
  schema?: boolean;
  statements?: boolean;
  dependencies?: Array<string>;
  modifying?: boolean;
  valid?: boolean;
  macro: (
    schema: any,
    parentSchema: object,
    it: CompilationContext
  ) => object | boolean;
}

export interface CustomKeyWord {
  name: string;
  definition: CustomKeywordDefinition;
  transformSchema: (originSchema: Schema) => Schema;
}

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
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true
  },
  uiSchema: {
    type: Object as PropType<uiSchema>,
    required: true
  }
} as const;

export const TypeHelper = defineComponent({
  props: FiledItemProps
});

export type FieldTypeHelper = typeof TypeHelper;

// 获取SchemaItem
export function GetSchemaItemContent() {
  const SchemaItemContent: { SchemaItem: FieldTypeHelper } | undefined = inject(
    ProvideKey
  );

  if (!SchemaItemContent) {
    throw Error('this key is not exist');
  }

  return SchemaItemContent;
}

// 获取Theme(好像没用了)
export function GetThemeContent() {
  const ThemeContent: { theme: Theme } | undefined = inject(ThemeProvideKey);

  if (!ThemeContent) {
    throw Error('this key is not exist');
  }

  return ThemeContent;
}

// 获取formatRef
export function GetFormatRefContent() {
  const FormatRefContent:
    | { formatMapRef: Ref<{ [key: string]: CommonWidget }> }
    | undefined = inject(formatMapRefProvideKey);

  if (!FormatRefContent) {
    throw Error('this key is not exist');
  }

  return FormatRefContent;
}

// 获取transformSchema

export function GetTransformSchema() {
  const TransformSchemaContent:
    | { transformSchemaRef: Ref<(schema: Schema) => Schema> }
    | undefined = inject(transformSchemaProvideKey);

  if (!TransformSchemaContent) {
    throw Error('this key is not exist');
  }

  return TransformSchemaContent;
}

// 定义props类型
export const CommonWidgetProps = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  errors: {
    type: Array as PropType<string[]>
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  options: {
    type: Object as PropType<{ [keys: string]: any }>
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
