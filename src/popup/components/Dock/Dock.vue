<template>
  <div class="container">
    <div style="flex: 1"></div>
    <DockItem class="dock-item" v-for="dock in docks" :key="dock.id" :size="size"
              :color="dock.color"
              :icon="dock.icon"
              :name="dock.name"
              :link="dock.link"
    />
    <div style="flex: 1"></div>
    <div class="bg"></div>
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
  },
  computed: {
    containerLength() {
      return (this.docks.length + 1 ) * this.size  + 'px'
    },
    dockItemSize() {
      return (this.size + 10) + 'px'
    }
  }
}
</script>

<style scoped>
  .container, .bg {
    width: v-bind(containerLength);
    height: v-bind(dockItemSize);
    margin: 0 auto;
    display: flex;
  }
  .dock-item {
    flex: 2;
  }
  .bg {
    width: v-bind(containerLength);
    height: v-bind(dockItemSize);
    position: absolute;
    background: rgba(174, 171, 171, 0.5);
    z-index: -1;
    filter: blur(10px);
    border: 1px solid #ccffcc;
    perspective: 150px;
  }
</style>