import { PropType } from 'vue';
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
  type: SchemaTypes | string;
  const?: any;
  format?: string;
  default?: any;
  properties?: {
    [key: string]: Schema | { $ref: string };
  };
  items?: Schema | Schema[] | SchemaRef;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  // vjsf?: VueJsonSchemaConfig;
  required?: string[];
  enum?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;
}

export const FiledProps = {
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
  }
} as const;
