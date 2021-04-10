import DateTimeWidget from '../../lib/theme/ui/DateTimeWidget';
import DateWidget from '../../lib/theme/ui/DateWidget';
import DateTimeAllWidget from '../../lib/theme/ui/DateTimeAllWidget';
import DateSpellWidget from '../../lib/theme/ui/DateSpellWidget';
export default {
  name: 'test',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        title: 'dateTimeString'
      },
      pass2: {
        type: 'number',
        title: 'dateTimeNumber'
      },
      pass3: {
        type: 'string',
        title: 'dateString'
      },
      pass4: {
        type: 'number',
        title: 'dateNumber'
      },
      pass5: {
        type: 'string',
        title: 'dateTimeAllString'
      },
      pass6: {
        type: 'number',
        title: 'dateTimeAllNumber'
      },
      pass7: {
        type: 'number',
        title: 'DateSpellWidget'
      },
    }
  },
  default: {
    
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: DateTimeWidget
      },
      pass2: {
        widget: DateTimeWidget
      },
      pass3: {
        widget: DateWidget
      },
      pass4: {
        widget: DateWidget
      },
      pass5: {
        widget: DateTimeAllWidget
      },
      pass6: {
        widget: DateTimeAllWidget
      },
      pass7: {
        widget: DateSpellWidget
      }
    }
  }
}
