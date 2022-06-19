<template>
  <Desktop msg="Welcome to Your Vue.js App" @click="hiddenModal"/>
</template>

<script>
import Desktop from './Desktop.vue'
import api from './api/common'
import utils from './common/utils'

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
  },
  created() {
    api.getAnnouncement((data) => {
      data.forEach(announcement => {
        utils.notify(announcement.title, announcement.content)
      });
    })
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
