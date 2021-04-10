import Ajv from 'ajv';
import toPath from 'lodash.topath';
import { Schema } from './types';
import { isObject } from './utils';

const i18n = require('ajv-i18n'); // eslint-disable-line

interface FormatErrorsObject {
  name: string;
  property: string;
  message: string | undefined;
  params: Ajv.ErrorParameters;
  schemaPath: string;
}

interface MiddleObject {
  [level: string]: ErrorSchema;
}

export type ErrorSchema = MiddleObject & {
  _errors?: string[];
};

function toErrorSchema(errors: FormatErrorsObject[]) {
  if (errors.length < 1) {
    return {};
  }

  return errors.reduce((errorSchema, error) => {
    const { property, message } = error;
    const path = toPath(property); // /id/'123 -> [id, 123]
    let parent = errorSchema;

    console.log('path------>', path);
    // 如果property是根节点，那么toPath会创建一个空数组，直接移除
    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1);
    }

    // 遍历到最后
    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        (parent as any)[segment] = {};
      }
      parent = parent[segment];
    }

    if (Array.isArray(parent._errors)) {
      parent._errors = parent._errors.concat(message || '');
    } else {
      if (message) {
        parent._errors = [message];
      }
    }

    return errorSchema;
  }, {} as ErrorSchema);
}

function formatErrors(errors: Ajv.ErrorObject[] | null | undefined) {
  if (errors === null || errors === undefined) {
    return [];
  }

  return errors.map((error) => {
    return {
      name: error.keyword,
      property: `${error.dataPath}`,
      message: error.message,
      params: error.params,
      schemaPath: error.schemaPath
    };
  });
}

/**
 *
 *
 */
export async function validateFormData(
  validator: Ajv.Ajv,
  formData: any, //就是default里面的内容
  schema: Schema,
  locale = 'zh',
  customValidate?: (data: any, errors: any) => void
) {
  let validateError = null;
  try {
    validator.validate(schema, formData);
  } catch (err) {
    validateError = err;
  }

  i18n[locale](validator.errors);

  let errors = formatErrors(validator.errors);

  if (validateError) {
    errors = [
      ...errors,
      {
        message: validateError.message
      } as FormatErrorsObject
    ];
  }

  const errorSchema = toErrorSchema(errors);

  if (!customValidate) {
    return {
      errors,
      errorSchema,
      valid: errors.length === 0 ? true : false
    };
  }

  /**
   * {
   *   obj: {
   *     a: {
   *       b: str
   *     }
   *     _errors: []
   *   }
   * }
   *
   *
   */
  const proxy = createErrorProxy();
  await customValidate(formData, proxy);
  const newErrorSchema = mergeObject(errorSchema, proxy, true);

  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0
  };
}

// vue的核心 proxy
// raw.obj.a
function createErrorProxy() {
  const raw = {};
  return new Proxy(raw, {
    get(target, key, reciver) {
      if (key === 'addError') {
        // 往对象增加一个_errors
        return (msg: string) => {
          const _errors = Reflect.get(target, '_errors', reciver);
          if (_errors && Array.isArray(_errors)) {
            _errors.push(msg);
          } else {
            (target as any)._errors = [msg];
          }
        };
      }
      const res = Reflect.get(target, key, reciver);
      if (res === undefined) {
        // 这地方不能直接返回res[key]，因为每次读取res[key]都会走入get
        const p: any = createErrorProxy();
        (target as any)[key] = p;
        return p;
      }
      return res;
    }
  });
}

export function mergeObject(obj1: any, obj2: any, concatArrays = false) {
  const acc = Object.assign({}, obj1);
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {},
      right = obj2[key];
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObject(left, right, concatArrays);
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right);
    } else {
      acc[key] = right;
    }
    return acc;
  }, acc);
}
