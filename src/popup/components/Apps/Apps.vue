<template>
  <div class="apps">
      <FolderContent ></FolderContent>
      <Draggable :list="[{id: 'prev'}]"
                 v-bind="dragOptions"
                 item-key="id"
                 group="apps"
                 :sort="true"
                 class="prev-button"
                 v-show="drag && activeIndex !== 0"
      >
        <template #item="{ element }">
          <div :id="element.id">
            <arrow-left heme="outline" size="27" fill="#fff" :strokeWidth="2"/>
          </div>
        </template>
      </Draggable>
      <Draggable :list="[{id: 'next'}]"
                 item-key="id"
                 v-bind="dragOptions"
                 group="apps"
                 :sort="true"
                 class="next-button"
                 v-show="drag"
      >
        <template #item="{ element }">
          <div :id="element.id">
            <plus v-if="activeIndex === appPageNum - 1" theme="outline" size="27" fill="#fff" :strokeWidth="2"/>
            <arrow-right v-else theme="outline" size="27" fill="#fff" :strokeWidth="2"/>
            <!-- <img :src="activeIndex === appPageNum - 1 ? '../../../assets/icon/plus.png': '../../../assets/icon/go.png'"> -->
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
          :arrow="drag? 'never': 'hover'"
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
import {Plus, ArrowRight, ArrowLeft} from '@icon-park/vue-next'

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
    FolderContent,
    ElCarousel,
    ElCarouselItem,
    Plus,
    ArrowRight,
    ArrowLeft,
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
  },
  watch: {
  },
  mounted() {
    let that = this
    setTimeout(function () {
      that.$refs.apps.setActiveItem(that.activeIndex)
    }, 250)
  },
  computed: {
    userApps() {
      return this.$store.getters.pageApps
    },
    appPageNum(){
      return this.$store.getters.pageApps.length
    },
    carouselType() {
      if (this.drag) {
        return 'card'
      }
      return ''
    },
    appGridSize() {
      // app 大小
      let size = this.$store.getters.appSize
      let gridSize = Math.ceil(size * 1.2) + 'px'
      let result = 'repeat(auto-fill, ' + gridSize + ')'
      return result
    },
    appContainerSize() {
       let size = this.$store.getters.appSize
      let gridSize = Math.ceil(size * 1.2) + 'px'
      return gridSize
    }
  },
  methods: {
    changePage(newPageIndex) {
      this.activeIndex = newPageIndex
    },
    scroll(e) {
      // e.preventDefault()
      let that = this
      let scrollVal = e.wheelDeltaX
      if (Math.abs(scrollVal) < 25) {
        return
      }
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
      // console.log(ev)
      let related = ev?.relatedContext?.element?? {};
      let dragged = ev?.draggedContext?.element?? {};
      if (related.id === 'prev') {
        // 上一页按钮
        // 翻页
        prevTrigger ++
        if (prevTrigger > 200) {
          prevTrigger = 0
          if (this.activeIndex === 0) {
            // 第一页, 前面没有则增加一页
            this.$store.commit('addNewPage', -1)
          } else {
            this.$refs.apps.prev()
          }
        }
        return false
      }
      prevTrigger = 0
      if (related.id === 'next') {
        // 下一页按钮
        // 翻页
        nextTrigger ++
        if (nextTrigger > 160) {
          nextTrigger  = 0
          if (this.activeIndex === this.appPageNum - 1) {
            // 第一页, 前面没有则增加一页
            this.$store.commit('addNewPage', 1)
          }
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
.app{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: v-bind(appGridSize);
  grid-template-rows: v-bind(appGridSize);
  grid-auto-rows: v-bind(appContainerSize);
  grid-auto-flow: dense;
  justify-items: center;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
}
:deep(.el-carousel__container) {
  height: 100%;
  widows: 100%;
}
/* :deep(.el-carousel__arrow) {
  width: 52px;
  height: 52px;
  background: red;
} */
/* :deep(.el-carousel__arrow--right) {
  width: 52px;
  height: 52px;
  position: position;
  background: red;
  z-index: 100;
  top: 0;
  z-index: 10000;
  right: 7.7%;
} */
/* .prev-button {
  width: 70px;
  height: 250px;
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  z-index: 1000;
  transition: 200ms;
} */
.prev-button img, .next-button img {
  width: 12px;
  height: 32px;
}
.next-button, .prev-button {
  width: 88px;
  height: 88px;
  border-radius: 100%;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  z-index: 1000;
  backdrop-filter: blur(7px);
  background-color: rgba(255, 255, 255, 0.463);
  opacity: 0.5;
}
.prev-button {
  left: 0;
}
::-webkit-scrollbar {
  display: none;
}
</style>