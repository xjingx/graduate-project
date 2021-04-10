<template>
  <div class="ic-slider-item" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'swiper-item',
  data() {
    return {
      offset: 0
    };
  },
  computed: {
    style() {
      return {
        width: this.$parent.width + 'px',
        transform: `translate3d(${this.offset}px, 0, 0)`
      };
    }
  },
  beforeCreate() {
    this.$parent.swipes.push(this);
  },
  unmounted() {
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
  },
  mounted() {
    console.log('21312345345')
  }
};
</script>