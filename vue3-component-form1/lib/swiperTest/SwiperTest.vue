<template>
  <div class="ic-slider">
    <div 
      v-if="count > 1"
      :style="trackStyle"
      class="ic-slider__track"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
    >
      <!--<slot></slot>-->
      <SwiperItem v-for="items in images" :key="items.id">
        <img :src="items.picUrl"/>
      </SwiperItem>
    </div>
    <div 
      v-else
      class="ic-slider__track"
    >
      <!--<slot></slot>-->
      <SwiperItem v-for="items in images" :key="items.id">
        <img :src="items.picUrl"/>
      </SwiperItem>
    </div>
    <div class="ic-slider__indicators" v-if="showIndicators && count > 1">
      <!--eslint-disable-next-line-->
      <i v-for="index in count" :key="index" :class="{ 'ic-slider__indicator--active': index - 1 === activeIndicator }" />
    </div>
</div>
</template>

<script>
import SwiperItem from './SwiperItem'
export default {
  name: 'SwiperTest',
  components: {
    SwiperItem,
  },
  props: {
    autoplay: Number,
    showIndicators: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 500
    },
    images: {
      type: Object,
    }
  },
  data() {
    return {
      width: 0,
      offset: 0, // 本身组件的显示宽度
      startX: 0, // 开始点击的位置
      startY: 0,
      active: 0,
      deltaX: 0, // 用户拖拽移动的距离
      swipes: [], // 图片组件实例
      direction: '',
      currentDuration: 0,
      mouseDown: false,
    };
  },
  mounted() {
    this.initialize();
    // 监听 resize事件,改变窗口重新初始化
    window.addEventListener('resize', () => {
        this.initialize();
    })
    this.createSchemaForm()
  },
  unmounted() {
    clearTimeout(this.timer);
  },
  watch: {
    swipes() {
      this.initialize();
    }
  },
  computed: {
    count() {
      return this.swipes.length;
    },
    trackStyle() {
      return {
        paddingLeft: this.width + 'px',
        width: (this.count + 2) * this.width + 'px',
        transitionDuration: `${this.currentDuration}ms`,
        transform: `translateX(${this.offset}px)`
      };
    },
    // 算出现在是哪张图片，然后转化dots的样式
    activeIndicator() {
      // 计算余数了 当active等于5和0的时候余数一样，所以dots都会在第一个
      return (this.active + this.count) % this.count;
    }
  },
  methods: {
    initialize() {
      clearTimeout(this.timer);
      this.width = this.$el.getBoundingClientRect().width;
      this.active = 0;
      this.currentDuration = 0;
      this.offset = this.count > 1 ? -this.width : 0;
      this.swipes.forEach(swipe => {
        swipe.offset = 0;
      });
      this.autoPlay();
    },
    onMouseDown(e) {
      this.mouseDown = true;
      clearTimeout(this.timer);
      this.deltaX = 0;
      this.direction = '';
      this.currentDuration = 0;
      this.startX = e.clientX;
      this.startY = e.clientY;
      if (this.active <= -1) {
        this.move(this.count);
      }
      if (this.active >= this.count) {
        this.move(-this.count);
      }
    },
    onMouseMove(event) {
      if (this.mouseDown) {
        this.direction = this.direction || this.getDirection(event);
        if (this.direction === 'horizontal') {
          event.preventDefault();
          this.deltaX = event.clientX - this.startX;
          // 随着用户动作 左移或者右移 往左拉为负，右拉为正
          this.move(0, this.range(this.deltaX, [-this.width, this.width]));
        }
      }
    },
    onMouseUp() {
      if (this.deltaX) {
        // 移动距离大于50就切换到上一张或者下一张，算之前取绝对值
        this.move(Math.abs(this.deltaX) > 50 ? (this.deltaX > 0 ? -1 : 1) : 0);
        this.currentDuration = this.duration;
      }
      this.autoPlay();
      this.mouseDown = false;
    },
    /*onTouchStart(event) {
      clearTimeout(this.timer);
      this.deltaX = 0;
      this.direction = '';
      this.currentDuration = 0;
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
      // 这个地方进行了巧妙设计，在要往前或者往后移动五个图片的时候，本来会有一段滑动过程
      // 但是这个时候会将第一张或者最后一张图片移动五个图片的距离，
      if (this.active <= -1) {
        this.move(this.count);
      }
      if (this.active >= this.count) {
        this.move(-this.count);
      }
    },
    onTouchMove(event) {
      this.direction = this.direction || this.getDirection(event.touches[0]);
      if (this.direction === 'horizontal') {
        event.preventDefault();
        this.deltaX = event.touches[0].clientX - this.startX;
        // 随着用户动作 左移或者右移 往左拉为负，右拉为正
        this.move(0, this.range(this.deltaX, [-this.width, this.width]));
      }
    },
    onTouchEnd() {
      if (this.deltaX) {
        // 移动距离大于50就切换到上一张或者下一张，算之前取绝对值
        this.move(Math.abs(this.deltaX) > 50 ? (this.deltaX > 0 ? -1 : 1) : 0);
        this.currentDuration = this.duration;
      }
      this.autoPlay();
    },*/
    move(move = 0, offset = 0) {
      const { active, count, swipes, deltaX, width } = this;
      if (move) {
        if (active === -1) {
          swipes[count - 1].offset = 0;
        }
        // 第一张图 如果active等于4，就要把第一张图片移到最后一张图右边去
        swipes[0].offset = active === count - 1 && move > 0 ? count * width : 0;
        // 如果之前active等于4，现在这个时候
        // active变成五，之后在touchstart的时候取到的active就是5
        // 然后会move(-5)，然后等touchend的时候，active已经是0了
        this.active += move;
      } else {
        if (active === 0) {
          swipes[count - 1].offset = deltaX > 0 ? -count * width : 0;
        } else if (active === count - 1) {
          swipes[0].offset = deltaX < 0 ? count * width : 0;
        }
      }
      // active等于4的时候，执行完上面的代码，active变成5，这个时候已经往右移动了7200了
      // 上面同时把第一张图移动了 6000，所以会最后一张和第一张图无缝连接，当点击移动后的第一张图
      // start事件发生时，执行move(-5)，将active变成0，然后offset变成-1200，又是第一张图的位置，
      // 这个时候上面将第一张图的移动距离变成0，又是原来的位置，所以start事件里的这次移动就等于
      // 将整个组件再次还原到原来的位置了，然后在end事件发生时，就会直接切换到第二张图的位置，
      // 等于在active=5，也就是最后一个多余空格时会做两件事，先把第一张图位置还原，再把组件位置还原
      // 点击事件结束时，再把整个组件往下幅图移动。
      this.offset = offset - (this.active + 1) * this.width;
    },
    autoPlay() {
      const { autoplay } = this;
      if (autoplay && this.count > 1) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          // 每次先制成0，因为当active等于5，将整个组件位置切换时，
          // 是不能有动画的，这个地方同时可以体现为什么必须要先将
          // 第一幅图移动到最后一幅图后面，再移回来，再切换组件，
          // 因为只有这样用户才能无感知
          // 因为切换没有动画，同时相同的图片进行切换，用户在点击事件没结束时，切换
          // 已经完成，如果直接从最后一张图切换，在用户点击时，就算没有动画，最后一张图
          // 直接闪变成第一张图，用户会受到感知
          this.currentDuration = 0;
          // active等于5时，自动执行一次move，因为自动播放没有touch事件了
          // 这个地方就要自动执行一次，保证图片位置还原了
          if (this.active >= this.count) {
            this.move(-this.count);
          }
          setTimeout(() => {
            this.currentDuration = this.duration;
            this.move(1);
            this.autoPlay();
          }, 30);
        }, autoplay);
      }
    },
    getDirection(touch) {
      const distanceX = Math.abs(touch.clientX - this.startX);
      const distanceY = Math.abs(touch.clientY - this.startY);
      return distanceX > distanceY ? 'horizontal' : distanceX < distanceY ? 'vertical' : '';
    },
    range(num, arr) {
      return Math.min(Math.max(num, arr[0]), arr[1]);
    },
    createSchemaForm() {
      let items = [];
      let defaults = [];
      items = this.images.map((item) => {
        return {
          type: 'object',
          properties: {
            linkUrl: {
              type: 'string',
              title: 'linkUrl'
            },
            picUrl: {
              type: 'img',
              title: 'pcUrl'
            }
          }
        }
      });
      defaults = this.images.map((item) => {
        return {
          linkUrl: item.linkUrl,
          picUrl: item.picUrl
        }
      });
      const ObjectArray = JSON.stringify({
        name: 'lunbo',
        schema: {
          type: "array",
          title: "轮播数据",
          items,
        },
        default: defaults,
        uiSchema: {
          properties: {}
        }
      });
      this.$emit('getSwiperSchema', ObjectArray);
    }
  }
};
</script>

<style>
  body{
    margin:0px;
    padding:0px;
  }
  .ic-slider {
    overflow: hidden;
    position: relative;
    user-select: none;
  }

  .ic-slider .ic-slider-item {
    float: left;
    height: 100%;
  }
  .ic-slider .ic-slider-item img{
    width:100%;
  }
  .ic-slider .ic-slider__track {
    height: 100%;
    overflow: hidden;
  }
  .ic-slider__indicators {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
  }
  .ic-slider__indicators > i {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ccc;
}
 
  .ic-slider__indicators .ic-slider__indicator--active {
    width: 20px;
    border-radius: 5px;
    background: #fff;
}
</style>