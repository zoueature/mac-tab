<template>
  <div class="apps">
      <Draggable :list="list2" 
                 item-key="id"
                 :options="option"
                 @end="end1" 
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
      disabled: false,
      appSize: 0,
      rowsNum: 0,
      columNum: 0,
      list1: [],
      option: {
        group: "app",
        sort: true,
        delay: 1000,
        animation: 1000,
        ghostClass: "ghostClass",
        tag: "transition"
      },
      list2: [
        {id: 18, type: 'operate', name:"", icon:"../../../assets/icon/plus.png", link: "https://weibo.com/"},
        {id: 20, type: 'folder', size: 70, name:"娱乐", apps: [
            {id: 1, type: 'app', size: 70, name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
            {id: 2, type: 'app', size: 70, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
            {id: 3, type: 'app', size: 70, name:"爱奇艺", icon:"../../../assets/images/app/iqiyi.png", link: "https://www.iqiyi.com/"},
            {id: 4, type: 'app', size: 70, name:"腾讯视频", icon:"../../../assets/images/app/txvideo.png", link: "https://v.qq.com/"},
          ]},
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
        {id: 20, type: '', size: 70, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
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
    end1(ev) {
      console.log("拖动结束1",ev)
    },
    end2(ev) {
      console.log("拖动结束2",ev)
    },
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

</style>