<template>
  <div class="back-dialog">
    <div class="dialog-content">
      <img class="dialog-img" :src="img" />
      <div class="title">
        <p class="title-font">{{text}}</p>
      </div>
      <div class="play-button">
        <div>
          <ElButton @click = "closeDialog" class="button-content" type="info" plain>取消</ElButton>
        </div>
        <div>
          <ElButton @click = "clickSure" class="button-content" type="primary" plain>确定</ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'element-plus/lib/theme-chalk/index.css'
import { ElButton } from 'element-plus'


export default {
  name: 'backDialog',
  components: {
    ElButton,
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
      img: '',
      text: '',
    };
  },
  mounted() {
    this.img = this.dialogData.picUrl;
    this.text = this.dialogData.text;
  },
  methods: {
    closeDialog() {
      this.$backDialog.close();
    },
    clickSure() {
      this.onclickSure();
    }
  }
};
</script>

<style scoped>
.back-dialog {
  display: flex;
  flex: 1;
  background-color: rgba(00, 00, 00, 0.6);
}
.dialog-content {
  height: 300px;
  width: 500px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10%;
}
.dialog-img {
  position: relative;
  left: 50%;
  transform: translate(-50%, 20%);
  width: 150px;
  height: 80px;
}
.title {
  width: 100%;
  height: 40px;
  text-align: center;
}
.title-font {
  line-height: 40px;
  font-size: 32px;
}
.play-button {
  display: flex;
  justify-content: space-around;
  align-content: center;
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  height: 80px;
}
.button-content {
  height: 100%;
  width: 230px;
}
</style>