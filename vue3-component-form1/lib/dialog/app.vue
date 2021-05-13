<template>
  <div>
      <Dialog :dialogData="dialogData" :onclickSure="onclickSure"></Dialog>
  </div>
</template>

<script>
import Dialog from './dialog';
export default {
  name: 'BackDialog',
  components: {
    Dialog,
  },
  props: {
    dialogData: {
      type: Object,
      default: () => ({}),
    },
    onclickSure: {
      type: Function,
      default: () => () => ({}),
    }
  },
  data() {
    return {
    };
  },
  mounted() {
    this.stop();
  },
  beforeUnmount() {
    this.move();
  },
  methods: {
      stop(){
        const mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
      },
      /***取消滑动限制***/
      move(){
        const mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      }
  }
};
</script>

<style scoped>

</style>