import {
  defineComponent,
  PropType,
  provide,
  computed,
  inject,
  ComputedRef
} from 'vue';
import { Theme, SelectionWidgetNames, CommonWidgetNames } from './types';
import { ThemeProvideKey } from './provideKeys';

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
  widgetName: T
) {
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
