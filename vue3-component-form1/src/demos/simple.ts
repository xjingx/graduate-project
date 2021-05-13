export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      testImg: {
        title: 'imgTest',
        type: 'img',
        default: 'aa'
      },
      firstName: {
        title: 'firstName',
        type: 'string',
        default: 'Chuck111'
      },
      lastName: {
        title: 'lastName',
        type: 'string',
        default: 'Chuck113331'
      },
      telephone: {
        title: 'telephone',
        type: 'string',
        minLength: 10
      },
      staticArray: {
        title: 'staticArray',
        type: 'array',
        items: [{ type: 'string' }, { type: 'number' }]
      },
      singleTypeArray: {
        title: 'singleTypeArray',
        type: 'array',
        items: {
          type: 'string'
        }
      },
      singleTypeOptionsArray: {
        title: 'singleTypeOptionsArray',
        type: 'array',
        items: {
          type: 'string',
          enum: ['123', '456', 789]
        }
      }
    }
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name'
      },
      lastName: {
        title: 'Last name'
      },
      telephone: {
        title: 'Telephone'
      }
    }
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    singleTypeArray: ['jingxiang xu']
  }
};
