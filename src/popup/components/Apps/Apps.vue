<template>
  <div class="apps">
      <Draggable :list="apps"
                 item-key="id"
                 :options="option"
                 tag="transition-group"
                 :component-data="{
                  tag: 'ul',
                  type: 'transition-group',
                  name: !drag ? 'flip-list' : null
                }"
                 ghostClass="ghost"
                 chosenClass="chosen"
                 group="apps"
                 @start="start"
                 @end="end"
                 @move="move"
                 :move="move"
                 v-bind="dragOptions"
                 class="app">
        <template #item="{ element }"  >
          <AppContainer :app="element"/>
        </template>
      </Draggable>
    </div>
</template>

<script>

import Draggable from 'vuedraggable'
import AppContainer from "@/popup/components/Apps/AppContainer";

export default {
  name: "AppCom",
  components: {
    Draggable,
    AppContainer,
  },
  props: [
    "size",
    'rows',
    'columns'
  ],
  data() {
    return {
      inFolder: false,
      dragOptions: {
        animation: 200,
        group: "app",
        disabled: false,
        ghostClass: "ghost"
      },
      drag: false,
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
      apps: [
        {id: 20, type: 'folder', size: 70, name:"娱乐", apps: [
            {id: 1, type: 'app', size: 70, name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
            {id: 2, type: 'app', size: 70, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
            {id: 3, type: 'app', size: 70, name:"爱奇艺", icon:"../../../assets/images/app/iqiyi.png", link: "https://www.iqiyi.com/"},
            {id: 4, type: 'app', size: 70, name:"腾讯视频", icon:"../../../assets/images/app/txvideo.png", link: "https://v.qq.com/"},
            {id: 2, type: 'app', size: 70, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
            {id: 3, type: 'app', size: 70, name:"爱奇艺", icon:"../../../assets/images/app/iqiyi.png", link: "https://www.iqiyi.com/"},
            {id: 4, type: 'app', size: 70, name:"腾讯视频", icon:"../../../assets/images/app/txvideo.png", link: "https://v.qq.com/"},
          ]
        },
        {id: 21, type: 'folder', size: 70, name:"购物", apps: [
            {id: 22, type: 'app', size: 70, name:"淘宝", icon:"../../../assets/images/app/taobao.png", link: "https://www.taobao.com/"},
            {id: 23, type: 'app', size: 70, name:"蘑菇街", icon:"../../../assets/images/app/mogujie.png", link: "https://www.mogujie.com/"},
            {id: 24, type: 'app', size: 70, name:"京东", icon:"../../../assets/images/app/jd.png", link: "https://www.jd.com/"},
          ]
        },
        {id: 1, type: 'app', size: 70, name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 2, type: 'app', size: 70, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
        {id: 3, type: 'app', size: 70, name:"爱奇艺", icon:"../../../assets/images/app/iqiyi.png", link: "https://www.iqiyi.com/"},
        {id: 4, type: 'app', size: 70, name:"腾讯视频", icon:"../../../assets/images/app/txvideo.png", link: "https://v.qq.com/"},
        {id: 5, type: 'app', size: 70, name:"优酷", icon:"../../../assets/images/app/youku.png", link: "https://www.youku.com/"},
        {id: 6, type: 'app', size: 70, name:"Github", icon:"../../../assets/images/app/github.png", link: "https://github.com/"},
        {id: 7, type: 'app', size: 70, name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 8, type: 'app', size: 70, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
        {id: 9, type: 'app', size: 70, name:"爱奇艺", icon:"../../../assets/images/app/iqiyi.png", link: "https://www.iqiyi.com/"},
        {id: 10, type: 'app', size: 70, name:"腾讯视频", icon:"../../../assets/images/app/txvideo.png", link: "https://v.qq.com/"},
        {id: 11, type: 'app', size: 70, name:"优酷", icon:"../../../assets/images/app/youku.png", link: "https://www.youku.com/"},
        {id: 12, type: 'app', size: 70, name:"Github", icon:"../../../assets/images/app/github.png", link: "https://github.com/"},
        {id: 13, type: 'app', size: 70, name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 14, type: 'app', size: 70, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
        {id: 15, type: 'app', size: 70, name:"爱奇艺", icon:"../../../assets/images/app/iqiyi.png", link: "https://www.iqiyi.com/"},
        {id: 16, type: 'app', size: 70, name:"腾讯视频", icon:"../../../assets/images/app/txvideo.png", link: "https://v.qq.com/"},
        {id: 17, type: 'app', size: 70, name:"优酷", icon:"../../../assets/images/app/youku.png", link: "https://www.youku.com/"},
        {id: 19, type: 'app', size: 70, name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
      ],
    }
  },
  created() {
    this.appSize = this.size
    this.rowsNum = this.rows
    this.columNum = this.columns
  },
  computed: {
    containerHeight() {
      return (this.appSize * this.rowsNum) + 'px'
    },
    containerWidth() {
      return (this.appSize * this.columNum) + 'px'
    }
  },
  methods: {
    start(ev) {
      console.log('start', ev)
      this.drag = true
    },
    end(ev) {
      console.log('end', ev)
      this.drag = false
    },
    move(ev) {
      let dragged = ev.draggedContext
      let related = ev?.relatedContext?.element?.type?? '';
      if (related === 'folder') {
        this.dragOptions.disabled = true
        this.apps.splice(dragged.index, 1)
        this.apps[ev.relatedContext.index].apps.push(dragged.element)
        console.log(123)
      }
      this.dragOptions.disabled = false
      console.log(dragged)
    }
  },
}
</script>

<style  scoped>
.apps{
  /*width: v-bind(containerWidth);*/
  /*height: v-bind(containerHeight);*/
  margin: 0 auto;
}
.ghostClass {
  transform: scale(2) !important;
}

.app{
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: repeat(auto-fill, 100px);
  grid-auto-flow: dense;
  justify-items: center;
  /*align-items: center;*/
}

.ghost {
  opacity: 0.5;
  transform: scale(1.1);
}

.chosen {
  cursor: move;
  /*transform: scale(0.3);*/
}

</style>