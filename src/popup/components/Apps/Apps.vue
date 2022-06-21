<template>
  <div class="apps">
      <FolderContent ></FolderContent>
      <Draggable :list="[{id: 'prev'}]"
                 v-bind="dragOptions"
                 item-key="id"
                 group="apps"
                 :sort="true"
                 class="prev-button"
      >
        <template #item="{ element }">
          <div :id="element.id">
            <img src="../../../assets/icon/back.png">
          </div>
        </template>
      </Draggable>
      <Draggable :list="[{id: 'next'}]"
                 item-key="id"
                 v-bind="dragOptions"
                 group="apps"
                 :sort="true"
                 class="next-button"
      >
        <template #item="{ element }">
          <div :id="element.id">
            <img src="../../../assets/icon/go.png">
          </div>
        </template>
      </Draggable>
      <el-carousel
          :autoplay="false"
          @change="changePage"
          @wheel="scroll"
          class="apps"
          ref="apps"
          indicator-position="none"
          arrow="always"
          :loop="false"
      >
        <el-carousel-item v-for="(pageApps, index) in userApps" :key="index">
            <Draggable :list="pageApps"
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
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>

import "swiper/css";
import "swiper/css/pagination";

import {Pagination} from "swiper";
import Draggable from 'vuedraggable'
import AppContainer from "@/popup/components/Apps/AppContainer";
// import { Swiper, SwiperSlide } from "swiper/vue";
import FolderContent from "@/popup/components/Apps/FolderContent";
import runtime from "@/chrome/runtime"
import event from "@/chrome/event"
import utils from "@/popup/components/common/utils"
import {ElCarousel, ElCarouselItem} from 'element-plus'

let hoverApp = {}
let createFolderTrigger = 0
let prevTrigger = 0
let nextTrigger = 0

let startDragPosition = {
  x: 0,
  y: 0,
}
/* eslint-disable */
export default {
  name: "AppCom",
  components: {
    Draggable,
    AppContainer,
    // Swiper,
    // SwiperSlide,
    FolderContent,
    ElCarousel,
    ElCarouselItem,
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
      wheelScroll: false,
      dragOptions: {
        animation: 200,
      }
    }
  },
  created() {
    let that = this
    runtime.listenMessage((request, sender, sendResponse) => {
      console.log(request, sender, sendResponse)
      if (request.event === event.EVENT_ADD_APP_IN_WEBSITE) {
        that.$store.dispatch('addAppToLocal', request.data)
        utils.notify("AppStore", '"' + request.data.name + '"' + "    安装成功")
        that.$http.post('/admin/app/create', request.data)
      }
    })
    this.$store.watch((state, getter) => {
      return getter.fmtApps
    }, (val) => {
      console.log(val)
    })
  },
  watch: {
    userApps(val) {
      console.log(val)
    }
  },
  mounted() {
    let that = this
    setTimeout(function () {
      console.log(1111111)
      that.$refs.apps.setActiveItem(0)
    }, 250)
    console.log(this.$refs.valueOf().apps)
  },
  computed: {
    userApps() {
      return this.$store.getters.pageApps
    },
    carouselType() {
      if (this.drag) {
        return 'card'
      }
      return ''
    }
  },
  methods: {
    scroll( e) {
      e.preventDefault()
      e.stopPropagation()
      console.log(e)
      let that = this
      let scrollVal = e.wheelDelta || e.detail
      if (!that.timeOut)  {
        that.timeOut = setTimeout(() => {
          // if (that.timeOut) {
            scrollVal > 0 ? that.$refs.apps.prev() : that.$refs.apps.next()
          setTimeout(() => {
            that.timeOut = false
          }, 1000)
          // }
          // that.timeOut = false
        }, 200)
      }
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
    },
    end() {
      this.drag = false
      this.$store.commit('fsyncApp')
    },
    move(ev) {
      console.log(ev)
      let related = ev?.relatedContext?.element?? {};
      let dragged = ev?.draggedContext?.element?? {};
      if (related.id === 'prev') {
        // 上一页按钮
        // 翻页
        prevTrigger ++
        if (prevTrigger > 200) {
          prevTrigger = 0
          this.$refs.apps.prev()
        }
        return false
      }
      prevTrigger = 0
      if (related.id === 'next') {
        // 下一页按钮
        // 翻页
        nextTrigger ++
        if (nextTrigger > 200) {
          nextTrigger  = 0
          this.$refs.apps.next()
        }
        return false
      }
      nextTrigger  = 0
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
        // 覆盖住某个app
        createFolderTrigger ++
        if (createFolderTrigger > 200) {
          // 覆盖app的时间达到阈值时， 创建文件夹并打开
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
  grid-template-rows: repeat(auto-fit, 100px);
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
/*.el-carousel__arrow {*/
/*  width: 52px !important;*/
/*  height: 52px !important;*/
/*  background: red;*/
/*  */
/*}*/
:deep(.el-carousel__container) {
  height: 100%;
}
.prev-button {
  width: 70px;
  height: 250px;
  position: absolute;
  left: -70px;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  backdrop: filter(7px);
}
.prev-button img, .next-button img {
  width: 25px;
  height: 70px;
}
.next-button {
  width: 70px;
  height: 250px;
  position: absolute;
  right: -70px;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  backdrop: filter(70px);
}

</style>