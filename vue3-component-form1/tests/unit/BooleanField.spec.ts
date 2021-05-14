import { mount } from '@vue/test-utils'

import  BooleanField  from '../../lib'

import TestComponent from './utils/TestComponent'

describe('BooleanField', () => {
  let schema: any
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'boolean',
        },
      },
    }
  })

  it('should render properties to correct fileds', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema,
        value: {},
        onChange: () => {},
      },
    })

    const booleanFiled = wrapper.findComponent(BooleanField)

    expect(booleanFiled.exists()).toBeTruthy()
  })

})