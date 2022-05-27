<template>
  <div class="container">
    <div style="flex: 1"></div>
    <Draggable :list="docks"
               item-key="id"
               :options="option"
               class="container"
               @start="start"
               @end="end"
               @add="add"
               group="apps"
               tag="transition-group"
               :component-data="{
                  tag: 'div',
                  type: 'transition-group',
                  name: !drag ? 'apps' : 'apps-drag'
                }"
    >
      <template #item="{ element }"  >
        <AppItem :size="dockSize"
                 :id="element.id"
                  :icon="element.icon"
                  :name="element.name"
                  :link="element.link"
                  :click="element.click"
                  :hover="true"
                  :type="element.type"
                  class="dock-item"
                 :app="element.app"
                  @mouseenter="enlarge(element.id)" @mouseleave="recover"
        />
      </template>
    </Draggable>
    <div style="flex: 1"></div>
    <div class="bg"></div>
  </div>
</template>

<script>

import AppItem from "@/popup/components/Apps/AppItem";
import Draggable from "vuedraggable";

export default {
  name: "dock-com",
  components: {
    AppItem,
    Draggable,
  },
  beforeCreate() {
    this.$store.commit('initDockApps')
  },
  data() {
    return {
      drag: false,
      option: {
        group: {name: "apps", put: true, pull: true},
        sort: true,
        delay: 1000,
        animation: 1000,
        ghostClass: "ghostClass",
        tag: "transition"
      },
      scaleIndex: -2,
      size: 66
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
      let size =  this.size
      if (this.$store.getters.dockApps.length > 16) {
        size = Math.ceil(size * 0.8)
      }
      return size
    },
    containerLength() {
      let moreApp = 1.5
      let appNum = this.$store.getters.dockApps.length
      if (appNum === 0) {
        moreApp = 4
      }  else if (appNum < 4) {
        moreApp = 0.8
      }
      return (this.$store.getters.dockApps.length + moreApp ) * this.size  + 'px'
    },
    dockItemSize() {
      return (this.size + 10) + 'px'
    },
  },
  methods: {
    openApp(app) {
      let that = this
      return function () {
        that.$store.commit('openApp')
        that.$router.replace(app)
      }
    },
    enlarge(index) {
      this.scaleIndex = index
      this.$forceUpdate()
    },
    recover() {
      this.scaleIndex = -2
      this.$forceUpdate()
    },
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
  }
}
</script>

<style scoped>
  @keyframes enlargeBig {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.3);
    }
  }
  @keyframes enlargeLittle {
    to {
      /*transform: scale(1.2);*/
    }
  }
  .enlarge {
    /*animation: enlargeBig 100ms;*/
    /*transform: scale(1.6);*/
  }
  .enlarge-little {
    /*animation: enlargeLittle 300ms;*/
    /*transform: scale(1.3);*/
  }
  .container {
    width: v-bind(containerLength);
    height: v-bind(dockItemSize);
    margin: 0 auto;
    display: flex;
    position: relative;
  }
  .dock-item {
    flex: 2;
  }
  .bg {
    width: v-bind(containerLength);
    height: v-bind(dockItemSize);
    margin: 0 auto;
    display: flex;
    position: absolute;
    top: -5%;
    background: rgba(215, 211, 211, 0.5);
    z-index: -1;
    filter: blur(10px);
    border: 1px solid #ccffcc;
  }

  .apps-enter-active {
    transition: all 500ms ease;
  }
  .apps-enter-from {
    transform: scale(0);
  }
  .apps-move {
    transition: transform 0.5s;
  }
  .apps-drag-move {
    transition: transform 0.1s;
  }
  .no-move {
    transition: transform 0s;
  }
</style>