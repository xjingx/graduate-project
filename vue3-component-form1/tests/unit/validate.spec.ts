import Ajv from 'ajv';
import { validateFormData, mergeObject } from '../../lib/validate'

describe('utils', () => {
  it('test toErrorSchema method', () => {
    const validator: Ajv.Ajv = new Ajv({allErrors: true})
    const schema = {
      type: 'object',
      properties: {
        pass1: {
          type: 'string',
          minLength: 10,
          //test: true,
          title: 'password',
        },
        pass2: {
          type: 'string',
          minLength: 10,
          title: 're try password',
        },
        color: {
          type: 'string',
          format: 'color',
          title: 'Input Color'
        }
      },
      required: ['pass1',]
    };
    const data = {
      pass1: ''
    };
    async function customValidate(data: any, errors: any) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (data.pass1 !== data.pass2) {
            errors.pass2.addError('密码必须相同');
          }
          resolve({});
        }, 2000);
      });
    }
    const res = new Promise(() => {})
    expect(validateFormData(validator, data, schema, 'zh', customValidate)).toEqual(res);
  })

  it('test toErrorSchema method', () => {
    const obj1 = {pass1: {_errors: ['不应少于10个字符']}}
    expect(mergeObject(obj1, {})).toEqual(obj1);
  })

  it('test toErrorSchema method', () => {
    const obj1 = {pass1: {_errors: ['不应少于10个字符']}}
    expect(mergeObject(obj1, {}, true)).toEqual(obj1);
  })

})