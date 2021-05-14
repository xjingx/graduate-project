import Ajv from 'ajv';

import { Schema } from './types';
;
import mergeAllOf from 'json-schema-merge-allof';

export function isObject(thing: any) {
  return typeof thing === 'object' && thing !== null && !Array.isArray(thing);
}

export function isEmptyObject(thing: any) {
  return isObject(thing) && Object.keys(thing).length === 0;
}

export function hasOwnProperty(obj: any, key: string) {
  /**
   * 直接调用`obj.hasOwnProperty`有可能会因为
   * obj 覆盖了 prototype 上的 hasOwnProperty 而产生错误
   */
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// import { isObject, hasOwnProperty, getSchemaType, guessType } from './utils'
// import { validateData } from './validator'

// TODO: 应该跟SchemaForm的instance保持一致
const defaultInstance = new Ajv();
export function validateData(schema: any, data: any) {
  const valid = defaultInstance.validate(schema, data);
  return {
    valid,
    errors: defaultInstance.errors
  };
}

// function resolveSchema(schema: any, data: any = {}) {}

export function resolveSchema(schema: Schema, rootSchema = {}, formData = {}) {
  if (hasOwnProperty(schema, 'allOf') && Array.isArray(schema.allOf)) {
    return {
      ...schema,
      allOf: schema.allOf.map((allOfSubschema) =>
        retrieveSchema(allOfSubschema, rootSchema, formData)
      )
    };
  } else {
    // No $ref or dependencies attribute found, returning the original schema.
    return schema;
  }
}

export function retrieveSchema(
  schema: any,
  rootSchema = {},
  formData: any = {}
): Schema {
  if (!isObject(schema)) {
    return {} as Schema;
  }
  let resolvedSchema = resolveSchema(schema, rootSchema, formData);

  // TODO: allOf and additionalProperties not implemented
  if ('allOf' in schema) {
    try {
      resolvedSchema = mergeAllOf({
        // TODO: Schema type not suitable
        ...resolvedSchema,
        allOf: resolvedSchema.allOf
      } as any) as Schema;
    } catch (e) {
      console.warn('could not merge subschemas in allOf:\n' + e);
      const { allOf, ...resolvedSchemaWithoutAllOf } = resolvedSchema;
      return resolvedSchemaWithoutAllOf;
    }
  }
  return resolvedSchema;
}

