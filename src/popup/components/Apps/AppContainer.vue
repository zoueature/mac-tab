<template>
  <div :style="gridStyle">
    <AppItem
        v-if="app.type === 'app' "
        :id="app.id"
        :size="appSize"
        :icon="app.icon"
        :name="app.name"
        :link="app.link"
        :click="app.click"
        :app="app.app"
        :background="app.background"
        :type="'app'"
    />
    <Folder v-else-if="app.type === 'folder' "
            :folder="app"
            @click.stop="openFolder(app)"
    ></Folder>
  </div>
</template>

<script>

import DockItem from "@/popup/components/Apps/AppItem";
import Folder from "@/popup/components/Apps/Folder";

export default {
  name: "AppContainer",
  props: [
      'app',
  ],
  components: {
    AppItem: DockItem,
    Folder,
  },
  created() {
    this.appInfo = this.app
  },
  computed: {
    gridStyle() {
      if (this.appInfo.type === 'component') {
        return "grid-row: span 2; grid-column: span 2;"
      }
      return ''
    },
    appSize() {
      return this.$store.getters.appSize
    }
  },
  data() {
    return {
      appInfo: '',
    }
  },
  methods: {
    openFolder(app) {
      this.$store.commit('openFolder', app)
    }
  }
}
</script>

<style scoped>

</style>