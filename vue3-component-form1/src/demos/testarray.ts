
export default {
  name: 'testarrays',
  schema: {
    type: 'array',
    title: 'zxczxc',
    items: [{
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'xx'
        },
        age: {
          type: 'string',
          title: 'yy'
        }
      }
    },
    {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'xx'
        },
        age: {
          type: 'string',
          title: 'yy'
        }
      }
    },
    {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'xx'
        },
        age: {
          type: 'string',
          title: 'yy'
        }
      }
    }]
  },
  default: [
    {
      name: '11',
      age: '22',
    },
    {
      name: '22',
      age: '33',
    }
  ],
  uiSchema: {
    properties: {
    }
  }
}
