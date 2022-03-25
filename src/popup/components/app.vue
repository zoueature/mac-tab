<template>
  <Desktop msg="Welcome to Your Vue.js App"/>
</template>

<script>
import Desktop from './Desktop.vue'

export default {
  name: 'App',
  components: {
    Desktop
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
