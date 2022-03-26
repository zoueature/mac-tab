<template>
  <div class="clock">
    <ul>
      <li v-for="(_, index) in secNodes" :key="index" :style="'transform: rotate(' + index * 6 + 'deg)'"></li>
    </ul>
  </div>
</template>

<script>
const secNode = Array(60)
export default {
  name: "NewClock",
  created() {
    console.log(secNode)
  },
  data() {
    return {
      secNodes: secNode,
    }
  }
}
</script>

<style scoped>
  .clock {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: grey;
    #transform-origin: center 100px;
  }
</style>