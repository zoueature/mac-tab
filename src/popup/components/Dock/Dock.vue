<template>
  <div class="container">
    <div class="bg"></div>
    <div style="flex: 1"></div>
    <Draggable :list="docks"
              item-key="id"
              v-bind="dragOptions"
              class="container"
              @start="start"
              @end="end"
              @add="add"
              group="apps"
    >
      <template #item="{ element, index }"  >
        <AppContainer class="dock-item"
                  :style="scaleStyle(index)"
                  :app="element"
                  :hoverScale="false"
                  :showTitle="false"
                  @mouseenter="enlarge(index)" @mouseleave="recover"
        />
      </template>
    </Draggable>
    <div style="flex: 1"></div>
  </div>
</template>

<script>

// import AppItem from "@/popup/components/Apps/AppItem";
import AppContainer from "@/popup/components/Apps/AppContainer";
import Draggable from "vuedraggable";

export default {
  name: "dock-com",
  components: {
    Draggable,
    AppContainer,
  },
  beforeCreate() {
    this.$store.commit('initDockApps')
  },
  data() {
    return {
      drag: false,
      dragOptions: {
        animation: 200,
      },
      scaleIndex: -2,
    }
  },
  computed: {
    docks() {
      let apps = this.$store.getters.dockApps
      let that = this
      apps.forEach((app) => {
        app.click = that.openApp(app.app)
      })
      return apps
    },
    scaleStyle() {
      let that =  this
      return index => {
        if (this.scaleIndex < 0 || this.drag) {
          return 
        }
        let diff = index - that.scaleIndex
        let transformPosition = ""
        let transform = ""
        let padding = ""
        switch (diff) {
          case -3:
            transformPosition = "transform-origin: 80% 40%;"
            transform = "transform: scale(1.05); margin-top: -0.25vw;"
            break
          case -2:
            transformPosition = "transform-origin: 60% 60%;"
            transform = "transform: scale(1.1); margin-top: -0.5vw;"
            break
          case -1:
            transformPosition = "transform-origin: 70% 90%;"
            transform = "transform: scale(1.15); margin-top: -0.75vw;"
            break
          case 0:
            transformPosition = "transform-origin: 50% 100%;"
            transform = "transform: scale(1.3); margin-top: -1.25vw;"
            padding = "padding-left: 1vw; padding-right: 1vw;"
            break
          case 1:
            transformPosition = "transform-origin: 30% 90%;"
            transform = "transform: scale(1.15); margin-top: -0.75vw;"
            break
          case 2:
            transformPosition = "transform-origin: 40% 60%;"
            transform = "transform: scale(1.1); margin-top: -0.5vw;"
            break
          case 3:
            transformPosition = "transform-origin: 20% 40%;"
            transform = "transform: scale(1.05); margin-top: -0.25vw;"
            break
        }
        return transform + transformPosition + padding
      }
    },
    dockTransition() {
      let transition = ''
      if (!this.drag) {
        transition = 'all 160ms ease-out'
      }
      return transition
    }
  },
  methods: {
    add() {
      this.$store.commit('fsyncDockApps')
    },
    start() {
      this.recover()
      this.drag = true
      this.$store.commit('fsyncDockApps')
    },
    end() {
      this.recover()
      this.drag = false
      this.$store.commit('fsyncDockApps')
    },
    openApp(app) {
      let that = this
      return function () {
        that.$store.commit('openApp')
        that.$router.replace(app)
      }
    },
    enlarge(index) {
      this.scaleIndex = index
    },
    recover() {
      this.scaleIndex = -1
    },
  }
}
</script>

<style scoped>
  .container {
    /* width: 60%; */
    margin: 0 auto;
    /* height: 70%;; */
    display: flex;
    align-items: center;
    align-content: center;
    position: relative;
    /* background-color: rgba(204, 204, 204, 0.02); */
    /* backdrop-filter: blur(7px); */
    /* border-radius: 16px; */
    transition: all 160ms linear;
  }
  .dock-item {
    padding-left: 0.25vw;
    padding-right: 0.25vw;
    flex: 1;
    transition: v-bind(dockTransition);
  }
  .bg {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: absolute;
    top: -5%;
    background: rgba(215, 211, 211, 0.5);
    z-index: -1;
    filter: blur(10px);
    border: 1px solid #ccffcc;
  }
</style>