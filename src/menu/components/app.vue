<template>
  <Menu msg="Welcome to Your Vue.js App" @click="hiddenModal"/>
</template>

<script>
import Menu from './Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
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
