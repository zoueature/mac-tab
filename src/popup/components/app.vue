<template>
  <Desktop msg="Welcome to Your Vue.js App" @click="hiddenModal"/>
</template>

<script>
import Desktop from './Desktop.vue'

export default {
  name: 'App',
  components: {
    Desktop
  },
  mounted() {
  },
  methods: {
    hiddenModal() {
      this.$store.commit('toggleSearchEngin', false)
      this.$store.commit('closeFolder')
      this.$store.commit('closeEditApp')
    }
  }
}
</script>

<style>

/* todo 可配置化*/
html {
  transition: color 300ms, background-color 300ms;
}

html {
  filter: invert(1) hue-rotate(180deg);
}

img, .wallpaper-item{
  filter: invert(1) hue-rotate(180deg);
}

body {
  user-select: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
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
