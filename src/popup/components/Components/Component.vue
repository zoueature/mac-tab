<template>
    <div  class="component" :style="'height: ' + component.height + 'px'">
      <Friday v-if="component.component === 'friday'"/>
      <Todo v-else-if="component.component === 'todo'"/>
      <NewsWidget v-else-if="component.component === 'news'"></NewsWidget>
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
  .component {
    /*width: 100%;*/
    margin: 0 auto;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }
</style>