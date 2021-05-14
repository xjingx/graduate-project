import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

import { StringField } from '../../lib'
import { format } from '../../src/formats/customFormat'
import TestComponent from './utils/TestComponent'

describe('JsonSchemaFrom', () => {
  it('should render correct StringField field', async () => {
    let value = {
      pass1: ''
    }
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
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
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
        },
        value: value,
        onChange: (v: any) => {
          value = v
        },
        customValidate,
        customFormats: format,
      },
    })

    const StringFiel = wrapper.findComponent(StringField)
    expect(StringFiel.exists()).toBeTruthy()
  })

  it('should render correct StringField field', async () => {
    let value = {}
    const wrapper = mount(format.component, {
      props: {
        schema: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
              format: 'color',
              title: 'Input Color'
            }
          },
          required: []
        },
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })

    expect(wrapper).toBeTruthy()
  })
})