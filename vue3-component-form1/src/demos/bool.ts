import DateWidget from '../../lib/theme/ui/DateTimeWidget';
export default {
  name: 'bool',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'boolean',
        title: '1'
      },
      pass2: {
        type: 'boolean',
        title: '2'
      },
    }
  },
  default: {
    pass1: true
  },
  uiSchema: {
    properties: {

    }
  }
}
