<template>
  <div class="apps">
      <FolderContent ></FolderContent>
      <swiper :pagination="{
        dynamicBullets: true,
      }"
          :modules="modules"
          @activeIndexChange="changePage"
          :allowSlideNext="true"
          @swiper="onSwiper"
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
                                   v-bind="dragOptions"
                                   ghostClass="ghostClass"
                                   chosenClass="chosenClass"
                                   @start="start"
                                   @end="end"
                                   :move="move"
                                   group="apps"
                                   class="app"
                                   @add="add"
                                   :sort="true"
                                   id="apps"
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

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import Draggable from 'vuedraggable'
import AppContainer from "@/popup/components/Apps/AppContainer";
import { Swiper, SwiperSlide } from "swiper/vue";
import FolderContent from "@/popup/components/Apps/FolderContent";
import runtime from "@/chrome/runtime"
import event from "@/chrome/event"
import utils from "@/popup/components/common/utils"

let hoverApp = {}
let createFolderTrigger = 0

let startDragPosition = {
  x: 0,
  y: 0,
}

let moveOffset = {
  x: 0,
  y: 0,
}

export default {
  name: "AppCom",
  components: {
    Draggable,
    AppContainer,
    Swiper,
    SwiperSlide,
    FolderContent,
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
    // this.$store.commit('initUserApps')
    this.$store.dispatch('initApp')
  },
  data() {
    return {
      drag: false,
      activeIndex: 0,
      wheelCount: 0,
      wheelStartTime: 0,
      wheelIndex: 0,
      wheelScroll: false,
      dragOptions: {
        animation: 200,
      }
    }
  },
  created() {
    // this.appSize = this.size
    // this.rowsNum = this.rows
    // this.columNum = this.columns
    let that = this
    runtime.listenMessage((request, sender, sendResponse) => {
      console.log(request, sender, sendResponse)
      if (request.event === event.EVENT_ADD_APP_IN_WEBSITE) {
        that.$store.dispatch('addAppToLocal', request.data)
        utils.notify("AppStore", '"' + request.data.name + '"' + "    安装成功")
      }
    })
  },
  mounted() {
    // this.$store.dispatch('initApp')
  },
  computed: {
    userApps() {
      let list =  this.$store.getters.pageApps
      return list
    }
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
    },
    touchStart(s, e) {
      moveOffset.x = e.layerX
      moveOffset.y = e.layerY
    },
    touchEnd(s, e) {
      let diff = e.layerX - moveOffset.x
      if (diff < -70) {
        this.swiper.slideNext()
      } else if (diff > 70) {
        this.swiper.slidePrev()
      }
    },
    scroll( e) {
      e.preventDefault()
      e.stopPropagation()
      // todo 滚轮翻页优化
      this.wheelScroll = true
      this.wheelIndex ++
      if (this.wheelIndex > 100000000) {
        this.wheelIndex = 0
      }
      let wheelIndex = this.wheelIndex
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
      startDragPosition = {
        x: ev.originalEvent.pageX,
        y: ev.originalEvent.pageY,
      }
      hoverApp = {}
      this.drag = true
      this.swiper.disable()
    },
    end() {
      this.swiper.enable()
      this.drag = false
      this.$store.commit('fsyncApp')
    },
    /* eslint-disable */

    move(ev) {
      let related = ev?.relatedContext?.element?? {};
      let dragged = ev?.draggedContext?.element?? {};
      if (dragged.type === 'folder') {
        // 移动的是文件夹时， 允许自由换位
        return true
      }
      // hoverApp 计算器， 用于计算停留的时常
      if (hoverApp[related.id] === undefined) {
        hoverApp = {}
        hoverApp[related.id] = 1
      } else {
        hoverApp[related.id] ++
      }
      let relatedAppRect = ev.relatedRect
      let draggedAppRect = ev.draggedRect
      let dragAppPosition = {
        left: ev.originalEvent.clientX,
        top: ev.originalEvent.clientY,
      }
      // 移动时， 鼠标的位置距离在app内的位置
      let diffX = startDragPosition.x - draggedAppRect.left
      let diffY = startDragPosition.y - draggedAppRect.top
      // app之间的间隔距离
      let appDiffX = Math.abs(relatedAppRect.left - draggedAppRect.left)
      let appDiffY = Math.abs(relatedAppRect.top - draggedAppRect.top)
      // 拖动的距离
      let dragX = Math.abs(dragAppPosition.left - startDragPosition.x)
      let dragY = Math.abs(dragAppPosition.top - startDragPosition.y)

      if (Math.abs(relatedAppRect.left + diffX - dragAppPosition.left) < 10 && Math.abs(relatedAppRect.top + diffY - dragAppPosition.top) < 10) {
        createFolderTrigger ++
        if (createFolderTrigger > 200) {
          // 覆盖app时， 创建文件夹并打开
          if (related.type === 'app') {
            let app = {
              id: related.id,
              type: 'app',
              name: related.name,
              icon: related.icon,
              link: related.link,
              app: related.app,
            }
            related.id = new Date().getTime()
            related.type = 'folder'
            related.name = '文件夹'
            related.apps = [app]
          }
          this.$store.commit('openFolder', related)
          return true
        }
      } else {
        createFolderTrigger = 0
        if (dragX - appDiffX > 20 || dragY - appDiffY > 20) {
          // 拖动的距离大于app的间隔距离时， 允许换位
          return  true
        }
      }
      return false
    },
    changePage(e) {
      this.activeIndex = e.realIndex
    },
    add() {
      this.$store.commit('fsyncApp')
    }
  },
}
</script>

<style  scoped>
.apps{
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
}
.ghostClass {
  opacity: 0.5;
  /*transform: scale(0.1);*/
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
  grid-template-rows: repeat(auto-fit, 120px);
  grid-auto-flow: dense;
  justify-items: center;
  justify-content: center;
  align-items: center;
}

/*.apps-enter-active {*/
/*  transition: all 500ms ease;*/
/*}*/
/*.apps-enter-from {*/
/*  transform: scale(0);*/
/*}*/
/*.apps-move {*/
/*  !*transition: transform 160ms;*!*/
/*}*/
/*.no-move {*/
/*  transition: transform 100ms;*/
/*}*/

</style>