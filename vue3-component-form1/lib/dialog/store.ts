import { defineComponent } from 'vue';
import mitt from 'mitt';

const emitter = mitt();

class PulginCore {
  bus: any;
  constructor() {
    this.bus = mitt();
  }
  show({data, onClickSure}: any) {
    this.bus.emit('show', { data, onClickSure })
  }
  close() {
    this.bus.emit('close')
  }
};
const dialogBus = new PulginCore();


export default dialogBus;