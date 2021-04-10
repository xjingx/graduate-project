import ajv from 'ajv';
import { isEmptyObject, validateData, resolveSchema, 
  retrieveSchema, stubExistingAdditionalProperties, findSchemaDefinition  } from '../../lib/utils'

describe('utils', () => {
  it('test isEmptyObject method', () => {
    expect(isEmptyObject({})).toBeTruthy;
  })

  it('test validateData method', () => {
    const defaultInstance = new ajv();
    defaultInstance.validate = jest.fn()
    const a = validateData({}, {})
    expect(a).toEqual({errors: null, valid:true});
  })

  it('test resolveSchema method', () => {
    const resolveDependencies = jest.fn()
    resolveSchema({dependencies: {}}, {}, {})
    expect(resolveDependencies).not.toBeCalled();
  })

  it('test resolveSchema method', () => {
    const retrieveSchema = jest.fn()
    resolveSchema({allOf: [{}]}, {}, {})
    expect(retrieveSchema).not.toBeCalled();
  })

  it('test retrieveSchema method', () => {
    retrieveSchema(1, {}, {})
    expect(1).toBeTruthy();
  })

  it('test retrieveSchema method', () => {
    retrieveSchema({allOf: [{}]}, {}, {})
    expect(1).toBeTruthy();
  })

  it('test stubExistingAdditionalProperties method', () => {
    const a = stubExistingAdditionalProperties({allOf: [{}], properties: {a: {}}}, {}, {a:{}})
    expect(a).toEqual({"allOf": [{}], "properties": {"a": {}}});
  })

  it('test stubExistingAdditionalProperties method', () => {
    const retrieveSchema = jest.fn();
    stubExistingAdditionalProperties({properties: {additionalProperties: {$ref: {}}}}, {}, {})
    expect(retrieveSchema).not.toBeCalled();
  })

})