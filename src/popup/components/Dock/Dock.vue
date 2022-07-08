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
        <AppContainer :class="dockItemClass(index)"
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
    dockSize() {
      let size = this.$store.getters.appSize
      if (97 < size) {
        size = 97
      }
      return Math.ceil(this.docks().length * size * 1.2) + 'px'
    },
    dockItemClass() {
      let that = this
      return index => {
        let cls = 'dock-item'
        if (index === that.scaleIndex && !this.drag) {
          cls += ' scale'
        }
        return cls
      }
    },
    scaleStyle() {
      let that =  this
      return index => {
        if (this.scaleIndex < 0 || this.drag) {
          return 
        }
        let diff = index - that.scaleIndex
        // let abs = Math.abs(diff)
        // let weight = 0
        // if (abs < 2) {
        //   weight = 0.2 - 0.1 * abs
        // }
        let transformPosition = ""
        let transform = ""
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
            transformPosition = "transform-origin: 50% 100%"
            transform = "transform: scale(1.3); margin-top: -1.25vw;"
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
        return transform + transformPosition
      }
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
    transition: all 160ms ease-out;
  }
  .scale {
    /* transform: scale(1.25); */
    /* transform-origin: 50% 50%; */
    padding-top: -10vw;
    padding-left: 1vw;
    padding-right: 1vw;
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