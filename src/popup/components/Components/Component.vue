<template>
    <div>
      <Friday v-if="component.component === 'friday'" class="component-item"/>
      <Todo v-else-if="component.component === 'todo'" class="component-item"/>
      <NewsWidget v-else-if="component.component === 'news'" class="component-item"/>
      <CalendarWidget v-else-if="component.component === 'calendar'" class="component-item"/>
    </div>
</template>

<script>

import Friday from "@/popup/components/Widgets/Friday";
import Todo from "@/popup/components/App/Todo/TodoWidget";
import NewsWidget from "@/popup/components/App/News/NewsWidget";
import CalendarWidget from "@/popup/components/Widgets/Calendar"

export default {
  name: "ComponentCom",
  components: {
    Friday,
    Todo,
    NewsWidget,
    CalendarWidget,
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