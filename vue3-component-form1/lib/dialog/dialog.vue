<template>
  <div class="dialog">
    <back-dialog :dialogData="dialogData" :onclickSure="onclickSure"></back-dialog>
  </div>
</template>

<script>
import backDialog from './back-dialog';

export default {
  name: 'dialog',
  components: {
    backDialog,
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
  computed: {

  },
};
</script>

<style scoped>
.dialog{
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 90;
}
</style>