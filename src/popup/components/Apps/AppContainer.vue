<template>
  <div :style="gridStyle">
    <AppItem
        v-if="app.type === 'app' "
        :size="77"
        :icon="app.icon"
        :name="app.name"
        :link="app.link"
        :click="app.click"
    />
    <Folder v-else-if="app.type === 'folder' "
            :folder="app"
            @click.stop="openFolder"
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
    }
  },
  data() {
    return {
      appInfo: '',
    }
  },
  methods: {
    openFolder(e) {
      this.$store.commit('openFolder', e.clientX, e.clientY)
    }
  }
}
</script>

<style scoped>

</style>