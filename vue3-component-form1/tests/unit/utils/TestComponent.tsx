import { defineComponent, PropType } from 'vue'
import JsonSchemaForm, { Schema, ThemeProcess } from '../../../lib'
import defaultTheme from '../../../lib/theme'

// vjsf-theme-default // import {ThemeProvider} from 'vue3-jsonschema-form'
// vue3-jsonschema-form

export const ThemeDefaultProvider = defineComponent({
  setup(p, { slots }) {
    return () => (
      <ThemeProcess theme={defaultTheme}>
        {slots.default && slots.default()}
      </ThemeProcess>
    )
  },
})

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <ThemeDefaultProvider>
        <JsonSchemaForm {...props} />
      </ThemeDefaultProvider>
    )
  },
})