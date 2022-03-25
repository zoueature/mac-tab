<template>
  <div class="container" :style="'width:' + (docks.length + 1 ) * size +'px; height: ' + size + 'px;'">
    <div style="flex: 1"></div>
    <DockItem class="dock-item" v-for="dock in docks" :key="dock.id" :size="size"
              :color="dock.color"
              :icon="dock.icon"
              :name="dock.name"
              :link="dock.link"
    />
    <div style="flex: 1"></div>
    <div class="bg" :style="'width:' + (docks.length + 1 ) * size +'px; height: ' + size + 'px;'"></div>
  </div>
</template>

<script>

import DockItem from "@/popup/components/Dock/DockItem";

export default {
  name: "dock-com",
  components: {
    DockItem
  },
  data() {
    return {
      size: 70,
      docks: [
        {id: 1, color: "white", name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 2, color: "yellow", name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 3, color: "blue", name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 4, color: "purple", name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 1, color: "white", name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 2, color: "yellow", name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 3, color: "blue", name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"},
        {id: 4, color: "purple", name:"新浪微博", icon:"../../../assets/images/app/sina.png", link: "https://weibo.com/"}
      ]
    }
  }
}
</script>

<style scoped>
  .container, .bg {
    margin: 0 auto;
    display: flex;
  }
  .container:before {
    content: " ";
    filter: blur(100);
  }
  .dock-item {
    flex: 2;
  }
  .bg {
    position: absolute;
    background: rgb(174, 171, 171);
    z-index: -1;
    filter: blur(10px);
    border: 1px solid #ccffcc;
    perspective: 150px;
  }
</style>