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
        transform: `translateX(${this.offset}px)`
      };
    }
  },
  beforeCreate() {
    this.$parent.swipes.push(this);
  },
  unmounted() {
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
  },
};
</script>