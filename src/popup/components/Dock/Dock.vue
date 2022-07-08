<template>
  <div class="container">
    <!-- <div class="bg"></div> -->
    <div style="flex: 1"></div>
    <Draggable :list="docks"
              item-key="id"
              v-bind="dragOptions"
              class="container"
              @start="start"
              @end="end"
              @add="add"
              group="apps"
              tag="transition-group"
              :component-data="{tag: 'div',type: 'transition-group',name: !drag ? 'apps' : 'apps-drag'}"
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
        if (index === that.scaleIndex) {
          cls += ' scale'
        }
        return cls
      }
    },
    scaleStyle() {
      let that =  this
      return index => {
        let diff = index - that.scaleIndex
        let abs = Math.abs(diff)
        let weight = 0
        if (diff < 2) {
          weight = 0.2 - 0.1 * abs
        }
        let transformPosition = ""
        if (diff > 0) {
          transformPosition = "transform-origin: 100% 50%;"
        } else if (diff < 0) {
          transformPosition = "transform-origin: 0% 50%;"
        }
        return 'transform: scale(' + (1 + weight) + ');' + transformPosition
      }
    }
  },
  methods: {
    add() {
      this.$store.commit('fsyncDockApps')
    },
    start() {
      this.inMove = true
      this.recover()
      this.drag = true
      this.$store.commit('fsyncDockApps')
    },
    end() {
      this.recover()
      this.inMove = false
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
      this.scaleIndex = -2
    },
  }
}
</script>

<style scoped>
  .container {
    /* width: 60%; */
    margin: 0 auto;
    height: 100%;;
    display: flex;
    align-items: center;
    align-content: center;
    position: relative;
    background-color: rgba(204, 204, 204, 0.02);
    backdrop-filter: blur(7px);
    border-radius: 16px;
    transition: all 160ms linear;
  }
  .dock-item {
    padding-left: 0.5vw;
    padding-right: 0.5vw;
    flex: 1;
    transition: all 120ms linear;
  }
  .scale {
    transform: scale(1.25);
    /* transform-origin: 50% 50%; */
    /* padding-top: -1vw; */
    padding-left: 1vw;
    /* padding-right: 1vw; */
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