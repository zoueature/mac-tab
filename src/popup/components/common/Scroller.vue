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
          scroll.refresh()
        }
      })

      // scroll.on('pullingUp', this.pullingUpHandler)
    })
  },
  methods: {
    pullingUpHandler() {
      this.$emit('pullingUp')
      scroll.finishPullUp()
      scroll.refresh()
      this.isPullUpLoad = false
    }
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