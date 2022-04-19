<template>
  <div class="apps">
      <swiper :pagination="{
        dynamicBullets: true,
      }"
          :modules="modules"
          @activeIndexChange="changePage"
          :allowSlideNext="true"
          @swiper="onSwiper"
          @touchMove="touchMove"
          :allowTouchMove="false"
          @touchStart="touchStart"
          @touchEnd="touchEnd"
          @wheel="scroll"
          class="apps"

      >
        <swiper-slide v-for="(pageApps, index) in userApps"
                      :no-swiping="true"
                      :key="index"

        >
            <Draggable
                                   :list="pageApps"
                                   item-key="id"
                                   tag="transition-group"
                                   :component-data="{
              tag: 'div',
              type: 'transition-group',
              name: !drag ? 'apps' : 'apps-drag'
            }"
                                   ghostClass="ghostClass"
                                   chosenClass="chosenClass"
                                   @start="drag = true"
                                   @end="drag = false"
                                   :move="move"
                                   group="apps"
                                   class="app"
                                   @add="add"
                                   :sort="true"
          >
            <template #item="{ element }">
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
      moveOffset: {
        x: 0,
        y: 0
      },
      inFolder: false,
      drag: false,
      disabled: false,
      appSize: 0,
      rowsNum: 0,
      columNum: 0,
      list1: [],
      activeIndex: 0,
      wheelCount: 0,
      wheelStartTime: 0,
      wheelIndex: 0,
      wheelScroll: false,
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
        if (i === list.length-1 || (i % 25 === 0 && i !== 0)) {
          result.push(page)
          page = []
        }
      })
      return result
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
    },
    touchStart(s, e) {
      this.moveOffset.x = e.layerX
      this.moveOffset.y = e.layerY
      console.log('touch start', this.moveOffset)
      console.log(s, e)
    },
    touchEnd(s, e) {
      console.log('touch end')
      let diff = e.layerX - this.moveOffset.x
      if (diff < -70) {
        this.swiper.slideNext()
      } else if (diff > 70) {
        this.swiper.slidePrev()
      }
      console.log(s, e)
    },
    scroll( e) {
      e.preventDefault()
      e.stopPropagation()
      // let now = new Date().getTime()
      // if (this.wheelCount > 30 && (now - this.wheelStartTime > 500)) {
      //   if (e.wheelDeltaX < -1) {
      //     this.swiper.slideNext()
      //   } else if (e.wheelDeltaX > 1) {
      //     this.swiper.slidePrev()
      //   }
      //   this.wheelStartTime = now
      //   this.wheelCount = 0
      // }
      // todo 滚轮翻页优化
      this.wheelScroll = true
      this.wheelIndex ++
      if (this.wheelIndex > 100000000) {
        this.wheelIndex = 0
      }
      let wheelIndex = this.wheelIndex
      console.log(wheelIndex)
      setTimeout(
          () => {
            if (this.wheelIndex === wheelIndex) {
              if (this.wheelScroll) {
                e.wheelDeltaX > 0 ? this.swiper.slidePrev() : this.swiper.slideNext()
              }
              this.wheelScroll = false
            }
          }, 70
      )
    },
    openApp(app) {
      let that = this
      return function () {
        that.$store.commit('openApp')
        that.$router.replace(app)
      }
    },
    start(ev) {
      ev.toString()
      this.drag = true
      this.swiper.disable()
      console.log(this.swiper)
    },
    end(ev) {
      ev.toString()
      localStorage.setItem(appsStorageKeyName, JSON.stringify(this.apps))
      this.swiper.enable()
      this.drag = false
    },
    move(ev) {
      // let dragged = ev.draggedContext
      let related = ev?.relatedContext?.element?.type?? '';
      if (related === 'folder') {
        // this.apps.splice(dragged.index, 1)
        // this.apps[ev.relatedContext.index].apps.push(dragged.element)
        return false
      }
    },
    changePage(e) {
      this.activeIndex = e.realIndex
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
  position: relative;
}
.ghostClass {
  opacity: 0.5;
}
.chosenClass {
  /*cursor: move;*/
  /*transform: scale(0.3);*/
}
.app{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: repeat(2, 120px);
  grid-auto-flow: dense;
  justify-items: center;
  justify-content: center;
  align-items: center;
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