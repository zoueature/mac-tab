<template>
  <div class="components" ref="components">
    <ComponentCom v-for="item in allComponents"
                  :key="item.id"
                  :component="item"
                  class="component"
                  :style="item.height"
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
          height: 120,
        },
        {
          id: 1,
          component: "todo",
        },
        {
          id: 1,
          component: "news",
          height: "grid-row: span 2; grid-column: span 2;",
        },
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
    width: 92%;
    height: 77%;
    margin: 0 auto;
    overflow: scroll;
    display: grid;
    grid-template-columns: repeat(2, 10vw);
    grid-template-rows:repeat(auto-fill, 10vw);
    grid-gap: 10px 10px;
    grid-auto-flow: dense;
    justify-content: center;
    justify-items: center;
    /* align-items: center; */
    /* align-content: center; */
  }
  div::-webkit-scrollbar {
    display: none;
  }
  .component {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 5%;
  }
  /* .component::before {
    content: "";
    padding-bottom: 100%;
    display: block;
    background: blue;
    grid-area: 1/1/2/2;
  } */
</style>