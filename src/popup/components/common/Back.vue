<template>
  <div class="back" @click.stop="$router.back()">
    <img src="../../../assets/icon/back.png" alt="" style="width: 100%; height: 100%">
  </div>
</template>

<script>

const defaultWidth = 10;
const defaultHeight = 23;

export default {
  name: "BackCom",
  props: [
    "width",
    "height",
  ],
  computed: {
    widthPx() {
      let width = defaultWidth
      if (typeof this.width === "number" && this.width > 0) {
          width = this.width
      }
      return width + 'px'
    },
    heightPx() {
      let height = defaultHeight
      if (typeof this.height === "number" && this.height > 0) {
          height = this.height
      }
      return height + 'px'
    }
  }
}
</script>

<style scoped>
.back {
  width: v-bind(widthPx);
  height: v-bind(heightPx);
}
</style>