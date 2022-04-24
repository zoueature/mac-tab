<template>
  <div class="wrapper" ref="wallpapers">
    <slot></slot>
  </div>
</template>

<script>
import BS from "better-scroll";
let scroll
export default {
  name: "ScrollerCom",
  props:[
    "data"
  ],
  mounted() {
    this.$nextTick(() => {
      scroll = new BS(this.$refs.wallpapers, {
        zoom: true,
        mouseWheel: {
          speed: 0.001,
          easeTime: 100,
          dampingFactor: 0.03,
        },
        pullUpLoad: true
      })
      scroll.on('scrollEnd', () => {
        // 滚动到底部
        if (scroll.y <= (scroll.maxScrollY + 50)) {
          this.$emit('pullingUp')
        }
      })
      // scroll.on('pullingUp', this.pullingUpHandler)
    })
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      this.refresh()
      setInterval(() => {
        this.refresh()
      }, 100)
    }
  },
  methods: {
    refresh() {
      // 代理better-scroll的refresh方法
      scroll && scroll.refresh()
    },
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>