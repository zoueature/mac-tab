<template>
    <div>
      <Friday v-if="component.component === 'friday'" class="component-item"/>
      <Todo v-else-if="component.component === 'todo'" class="component-item"/>
      <NewsWidget v-else-if="component.component === 'news'" class="component-item"/>
    </div>
</template>

<script>

import Friday from "@/popup/components/Widgets/Friday";
import Todo from "@/popup/components/App/Todo/TodoWidget";
import NewsWidget from "@/popup/components/App/News/NewsWidget";

export default {
  name: "ComponentCom",
  components: {
    Friday,
    Todo,
    NewsWidget,
  },
  props: [
      "component"
  ]
}
</script>

<style scoped>
.component-item {
  width: 100%;
  height: 100%;
}
</style>