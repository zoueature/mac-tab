<template>
    <div  class="component" :style="'height: ' + component.height + 'px'">
      <Friday v-if="component.component === 'friday'"/>
      <Todo v-else-if="component.component === 'todo'"/>
    </div>
</template>

<script>

import Friday from "@/popup/components/Widgets/Friday";
import Todo from "@/popup/components/App/Todo/TodoWidget";

export default {
  name: "ComponentCom",
  components: {
    Friday,
    Todo,
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