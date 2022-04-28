<template>
  <div class="components" ref="components">
    <ComponentCom v-for="item in allComponents"
                  :key="item.id"
                  :component="item"
                  class="component"
    />
  </div>
</template>

<script>

import ComponentCom from "@/popup/components/Components/Component";
// import BScroll from "better-scroll";

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
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.components, {
    //     mouseWheel: {
    //       speed: 1,
    //       easeTime: 100,
    //       dampingFactor: 0.02,
    //     },
    //     bounceTime: 500,
    //   })
    // })
  }
}
</script>

<style scoped>
  .components {
    width: 80%;
    height: 80%;
    margin: 3% auto 0 auto;
    overflow: scroll;
    border-radius: 10px;
  }
  div::-webkit-scrollbar {
    display: none;
  }
  .component {
    overflow: hidden;
    margin-top: 16px;
    border-radius: 10px;
  }
</style>