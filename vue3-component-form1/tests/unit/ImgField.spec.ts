import { mount } from '@vue/test-utils'

import  ImgField  from '../../lib'

import TestComponent from './utils/TestComponent'

describe('ImgField', () => {
  let schema: any
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'img',
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

    const imgFiled = wrapper.findComponent(ImgField)

    expect(imgFiled.exists()).toBeTruthy()
  })

})