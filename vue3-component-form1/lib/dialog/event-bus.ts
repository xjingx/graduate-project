import Vue from 'vue';
const EventBus = {
  install(Vue: any) {
    if (Vue.prototype.$eventBus) {
      return;
    }

    const bus = new Vue();

    Object.defineProperty(Vue.prototype, '$eventBus', {
      get() {
        return bus;
      },
    });
  },
};

export default EventBus;