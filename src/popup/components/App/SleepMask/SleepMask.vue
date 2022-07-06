<template>
  <div class="sleep-mask">
    <div class="sleep-clock">
       <number-clock fontSize="7vw"/>
    </div>
  </div>
</template>

<script>

import NumberClock from "@/popup/components/App/Clock/NumberClock"

export default {
  name: "SleepMask",
  components: {
    NumberClock,
  },
}
</script>

<style scoped>
  .sleep-mask {
    position: fixed;
    z-index: 100000;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(16px);
    position: relative;
  }
  .sleep-clock {
    height: 20vw;
    width: 20vw;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
  }
</style>