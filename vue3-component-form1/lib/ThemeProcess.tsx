import {
  defineComponent,
  PropType,
  provide,
  computed,
  inject,
  ComputedRef,
  ref,
  shallowRef,
  ExtractPropTypes
} from 'vue';
import {
  Theme,
  SelectionWidgetNames,
  CommonWidgetNames,
  uiSchema,
  CommonWidget,
  FiledItemProps,
  GetFormatRefContent
} from './types';
import { ThemeProvideKey } from './provideKeys';
import { isObject } from './utils';

const ThemeProcess = defineComponent({
  name: 'ThemeProcess',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup(props, { slots }) {
    const ThemeContent = computed(() => props.theme);

    // 把theme内容传递下去
    provide(ThemeProvideKey, ThemeContent);

    return () => {
      return slots.default && slots.default();
    };
  }
});

export function getWidget<T extends SelectionWidgetNames | CommonWidgetNames>(
  widgetName: T,
  props?: ExtractPropTypes<typeof FiledItemProps>
) {
  const formatContent = GetFormatRefContent();

  // 是对象就直接返回,有可能是string
  if (props) {
    const { uiSchema, schema } = props;
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget as CommonWidget);
    }
    if (schema.format) {
      if (formatContent.formatMapRef.value[schema.format]) {
        // 拿到的是组件 转成ref
        return shallowRef(formatContent.formatMapRef.value[schema.format]);
      }
    }
  }
  // 因为是计算类型 所以ComputedRef， 如果key不对，inject返回undefined，inject后面是提供的泛型
  const content: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(
    ThemeProvideKey
  );

  if (!content) {
    throw new Error('theme not exist');
  }

  // widget = content.value.widget[widgetName]
  // 这里必须是computed返回的Ref，如果像上面那样写，widget在代码运行时就确定了，永远不会变
  const widgetRef = computed(() => content.value.widgets[widgetName]);

  return widgetRef;
}

export default ThemeProcess;
