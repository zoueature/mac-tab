<template>
  <div class="components" ref="components">
    <div class="test">
      <ComponentCom v-for="item in allComponents"
                    :key="item.id"
                    :component="item"
                    class="component"
      />
    </div>
  </div>
</template>

<script>

import ComponentCom from "@/popup/components/Components/Component";
import BScroll from "better-scroll";

export default {
  name: "ComponentsCom",
  components: {
    ComponentCom,
  },
  data() {
    return {
      allComponents: [
        {
          id: 1,
          component: "friday",
          height: 100,
        },
        {
          id: 1,
          component: "todo",
          height: 160,
        },
        {
          id: 1,
          component: "friday",
          height: 100,
        },
        {
          id: 1,
          component: "friday",
          height: 100,
        },
        {
          id: 1,
          component: "friday",
          height: 100,
        },
        {
          id: 1,
          component: "friday",
          height: 100,
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.components, {
        mouseWheel: {
          speed: 1,
          easeTime: 100,
          dampingFactor: 0.02,
        },
        bounceTime: 500,
      })
    })
  }
}
</script>

<style scoped>
  .components {
    width: 80%;
    height: 65%;
    margin: 3% auto 0 auto;
    overflow: hidden;
    border-radius: 10px;
  }
  .component {
    overflow: hidden;
  }
</style>