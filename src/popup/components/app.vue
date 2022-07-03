<template>
  <Desktop msg="Welcome to Your Vue.js App" @click="hiddenModal"/>
</template>

<script>
import Desktop from './Desktop.vue'
import api from './api/common'
import utils from './common/utils'
import storage from '@/chrome/storage'
import keys from '@/popup/store/keys'

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
      storage.getSync(keys.viewedAnnouncement, (viewed) => {
        if (viewed == undefined) {
          viewed = {}
        }
        data.forEach(announcement => {
          if (viewed[announcement.id] !== true) {
            utils.notify(announcement.title, announcement.content)
            viewed[announcement.id] = true
          }
        })
        storage.setSync(keys.viewedAnnouncement, viewed)
      })
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
.i-icon {
  display: flex !important;
  align-items: center;
  align-content: center;
}
</style>
