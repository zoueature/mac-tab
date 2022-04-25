<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BS from "better-scroll";
import Pullup from '@better-scroll/pull-up'
// import MouseWheel from '@better-scroll/mouse-wheel'

BS.use(Pullup)
// BS.use(MouseWheel)


export default {
  name: "ScrollerCom",
  props:[
    "getDataHandler"
  ],

  mounted() {
    this.initBscroll()
  },
  data() {
    return {
      isPullUpLoad: false,
    }
  },
  methods: {
    initBscroll() {
      this.bscroll = new BS(this.$refs.wrapper, {
        pullUpLoad: true,
        mouseWheel: {
          speed: 0.1,
          easeTime: 300,
          // dampingFactor: 0.03,
          // discreteTime: 500,
          //  throttleTime: 10,
        },
      })
      this.bscroll.on('pullingUp', this.pullingUpHandler)
    },
    async pullingUpHandler() {
      this.isPullUpLoad = true

      await this.getDataHandler()

      this.bscroll.finishPullUp()
      this.bscroll.refresh()
      this.isPullUpLoad = false
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