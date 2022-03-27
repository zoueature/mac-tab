<template>
  <div :style="gridStyle">
    <AppItem
        v-if="app.type === 'app' "
        :size="app.size"
        :ratio="app.ratio"
        :color="app.color"
        :icon="app.icon"
        :name="app.name"
        :link="app.link"
        :disable="!app.scale"
        :type="app.type"
    />
    <Todo v-else/>
  </div>
</template>

<script>

import DockItem from "@/popup/components/Dock/DockItem";
import Todo from "@/popup/components/todo/Todo";

export default {
  name: "AppContainer",
  props: [
      'app',
  ],
  components: {
    AppItem: DockItem,
    Todo,
  },
  created() {
    this.appInfo = this.app
  },
  computed: {
    gridStyle() {
      if (this.appInfo.type === 'app') {
        return ''
      }
      return "grid-row: span 2; grid-column: span 2; background: white;"
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