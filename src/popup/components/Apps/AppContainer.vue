<template>
  <div :style="gridStyle">
    <AppItem
        v-if="app.type === 'app' "
        :size="app.size"
        :icon="app.icon"
        :name="app.name"
        :link="app.link"
    />
    <Folder v-else-if="app.type === 'folder' "
            :folder="app"
    />
    <Todo v-else/>
  </div>
</template>

<script>

import DockItem from "@/popup/components/Apps/AppItem";
import Todo from "@/popup/components/todo/Todo";
import Folder from "@/popup/components/Apps/Folder";

export default {
  name: "AppContainer",
  props: [
      'app',
  ],
  components: {
    AppItem: DockItem,
    Todo,
    Folder,
  },
  created() {
    this.appInfo = this.app
  },
  computed: {
    gridStyle() {
      if (this.appInfo.type === '') {
        return "grid-row: span 2; grid-column: span 2;"
      }
      return ''
    }
  },
  data() {
    return {
      appInfo: '',
    }
  }
}
</script>

<style scoped>

</style>