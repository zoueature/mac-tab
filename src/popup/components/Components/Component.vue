<template>
  <div>
    <div  class="component" :style="'height: ' + component.height + 'px'">
      <div v-if="component.component === 'friday'">
        <Friday/>
      </div>
      <div v-else-if="component.component === 'todo'">
        <Todo/>
      </div>
    </div>
  </div>
</template>

<script>

import Friday from "@/popup/components/Widgets/Friday";
import Todo from "@/popup/components/Widgets/Todo";

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
    width: 100%;
    margin: 0 auto;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }
</style>