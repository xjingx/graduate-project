import { createApp } from 'vue';
import App from './App';
import dialog from '../lib/dialog/store';
import EventBus from '../lib/dialog/event-bus';

declare module '@vue/runtime-core' {
  // 3. 声明为 Vue 补充的东西
    interface ComponentCustomProperties  {
      $eventBus: any,
      $backDialog: any
    }
}

const app = createApp(App);
app.config.globalProperties.$backDialog = dialog;
app.mount('#app');

