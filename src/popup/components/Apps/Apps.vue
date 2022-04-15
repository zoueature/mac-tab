<template>
  <div @touchstart="touchstart">
      <swiper :pagination="{
        dynamicBullets: true,
      }"
          :modules="modules"
          class="apps"
              @activeIndexChange="changePage"
      >
        <swiper-slide v-for="(pageApps, index) in userApps"
                      :key="index">
            <Draggable
                                   :list="pageApps"
                                   item-key="id"
                                   :options="option"
                                   tag="transition-group"
                                   :component-data="{
              tag: 'div',
              type: 'transition-group',
              name: 'apps'
            }"
                                   ghostClass="ghost"
                                   chosenClass="chosen"
                                   @start="start"
                                   @end="end"
                                   @move="move"
                                   group="apps"
                                   class="app"
                                   @add="add"
          >
            <template #item="{ element }"  >
              <AppContainer :app="element"/>
            </template>
        </Draggable>
        </swiper-slide>
      </swiper>
  </div>
</template>

<script>

import Draggable from 'vuedraggable'
import AppContainer from "@/popup/components/Apps/AppContainer";
import keys from "@/popup/store/keys";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
// import "./style.css";
import { Pagination } from "swiper";

const appsStorageKeyName = "applications"

export default {
  name: "AppCom",
  components: {
    Draggable,
    AppContainer,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  props: [
    "size",
    'rows',
    'columns'
  ],
  beforeCreate() {
    let apps = localStorage.getItem(appsStorageKeyName)
    if (apps !== "" && apps !== null) {
      this.apps = JSON.parse(apps)
    } else {
      this.apps = []
    }
  },
  data() {
    return {
      inFolder: false,
      dragOptions: {
        animation: 200,
        group: {name: "apps", put: true},
        disabled: false,
        ghostClass: "ghost"
      },
      disabled: false,
      appSize: 0,
      rowsNum: 0,
      columNum: 0,
      list1: [],
      option: {
        group: "app",
        sort: false,
        delay: 1000,
        animation: 1000,
        ghostClass: "ghostClass",
        tag: "transition"
      },
      activeIndex: 0,
    }
  },
  created() {
    this.appSize = this.size
    this.rowsNum = this.rows
    this.columNum = this.columns
    let localUserApps = localStorage.getItem(keys.userApp)
    let userApps = []
    if (localUserApps !== "" && localUserApps !== null) {
      userApps = JSON.parse(localUserApps)
      this.$store.commit('initUserApps', userApps)
    }
  },
  computed: {
    containerHeight() {
      return (this.appSize * this.rowsNum) + 'px'
    },
    containerWidth() {
      return (this.appSize * this.columNum) + 'px'
    },
    userApps() {
      let list =  this.$store.getters.userApps
      let that = this
      let result = []
      let page = []
      list.forEach((v, i) => {
        v.click = that.openApp(v.app)
          page.push(v)
        if (i === list.length-1 || (i % 30 === 0 && i !== 0)) {
          result.push(page)
          page = []
        }
      })
      return result
    }
  },
  methods: {
    touchstart(e) {
      event.preventDefault()
      console.log(123)
      console.log(e)
    },
    openApp(app) {
      let that = this
      return function () {
        that.$store.commit('openApp')
        that.$router.replace(app)
      }
    },
    start(ev) {
      console.log('start', ev)
      this.drag = true
    },
    end(ev) {
      console.log('end', ev)
      this.drag = false
      localStorage.setItem(appsStorageKeyName, JSON.stringify(this.apps))
    },
    move(ev) {
      let dragged = ev.draggedContext
      let related = ev?.relatedContext?.element?.type?? '';
      if (related === 'folder') {
        this.dragOptions.disabled = true
        this.apps.splice(dragged.index, 1)
        this.apps[ev.relatedContext.index].apps.push(dragged.element)
      }
      this.dragOptions.disabled = false
    },
    changePage(e) {
      this.activeIndex = e.realIndex
      console.log(e.realIndex)
    },
    add(e, index) {
      console.log(index)
      let app = e.item._underlying_vm_
      this.$store.commit('addApp', {
        id: app.id,
        type: app.type,
        name: app.name,
        icon: app.icon,
        link: app.link,
        app: app.app,
      })
      console.log(app)
    }
  },
}
</script>

<style  scoped>
.apps{
  /*width: v-bind(containerWidth);*/
  /*height: v-bind(containerHeight);*/
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
.ghostClass {
  transform: scale(2) !important;
}
.app{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: repeat(4, 100px);
  grid-auto-flow: dense;
  justify-items: center;
  justify-content: center;
  align-items: center;
}

.ghost {
  opacity: 0.5;
  transform: scale(1.1);
}

.chosen {
  /*cursor: move;*/
  /*transform: scale(0.3);*/
}

.apps-enter-active {
  transition: all 500ms ease;
}
.apps-enter-from {
  transform: scale(0);
}
</style>