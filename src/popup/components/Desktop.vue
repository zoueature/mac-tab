<template>
  <div id="desktop-background">
    <div id="dock-container">
      <Dock/>
    </div>
  </div>
</template>

<script>

import Dock from "./Dock"

export default {
  name: 'desk-top',
  props: {
    msg: String
  },
  components: {
    Dock,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #desktop-background {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.47);
  }
  #dock-container {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
</style>
