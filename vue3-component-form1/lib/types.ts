import { PropType, defineComponent, inject } from 'vue';
import { SchemaItemProvideKey } from './provideKeys';
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

export const FiledPropsString = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    type: String,
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

export const FiledPropsNumber = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    type: Number,
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
    SchemaItemProvideKey
  );

  if (!SchemaItemContent) {
    throw Error('this key is not exist');
  }

  return SchemaItemContent;
}
