<template>
  <div class="container">
    <div style="flex: 1"></div>
    <DockItem v-for="(dock, index) in docks" :key="dock.id"
              :size="size"
              :color="dock.color"
              :icon="dock.icon"
              :name="dock.name"
              :link="dock.link"
              :hover="true"
              :class="dockItemClass(index)"
              @mouseenter="enlarge(index)" @mouseleave="recover"
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
      scaleIndex: -2,
      size: 79,
      docks: [
        {id: 1, type: 'app', scale: true, name:"网易云音乐", icon:"../../../assets/images/app/netease.png", link: "https://music.163.com/"},
        {id: 2, type: 'app', scale: true, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
        {id: 3, type: 'app', scale: true, name:"爱奇艺", icon:"../../../assets/images/app/iqiyi.png", link: "https://www.iqiyi.com/"},
        {id: 4, type: 'app', scale: true, name:"腾讯视频", icon:"../../../assets/images/app/txvideo.png", link: "https://v.qq.com/"},
        {id: 5, type: 'app', scale: true, name:"优酷", icon:"../../../assets/images/app/youku.png", link: "https://www.youku.com/"},
        {id: 6, type: 'app', scale: true, name:"Github", icon:"../../../assets/images/app/github.png", link: "https://github.com/"},

        {id: 1, type: 'app', scale: true, name:"QQ音乐", icon:"../../../assets/images/app/qqmusic.png", link: "https://music.qq.com/"},
        {id: 2, type: 'app', scale: true, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
        {id: 3, type: 'app', scale: true, name:"爱奇艺", icon:"../../../assets/images/app/iqiyi.png", link: "https://www.iqiyi.com/"},
        {id: 4, type: 'app', scale: true, name:"腾讯视频", icon:"../../../assets/images/app/txvideo.png", link: "https://v.qq.com/"},
        {id: 5, type: 'app', scale: true, name:"优酷", icon:"../../../assets/images/app/youku.png", link: "https://www.youku.com/"},
        {id: 6, type: 'app', scale: true, name:"Github", icon:"../../../assets/images/app/github.png", link: "https://github.com/"},
      ]
    }
  },
  computed: {
    containerLength() {
      return (this.docks.length + 1 ) * this.size  + 'px'
    },
    dockItemSize() {
      return (this.size + 10) + 'px'
    },
    dockItemClass() {
      let that = this
      return function (index) {
        let cls = 'dock-item'
        if (that.scaleIndex === index) {
          cls += ' enlarge'
        }
        if (Math.abs(that.scaleIndex - index) === 1) {
          cls += ' enlarge-little'
        }
        console.log(that.scaleIndex, cls)
        return cls
      }
    }
  },
  methods: {
    enlarge(index) {
      this.scaleIndex = index
      this.$forceUpdate()
    },
    recover() {
      this.scaleIndex = -2
      this.$forceUpdate()
    },
  }
}
</script>

<style scoped>
  .enlarge {
    transform: scale(1.6);
  }
  .enlarge-little {
    transform: scale(1.3);
  }
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
    top: 20%;
    background: rgba(215, 211, 211, 0.5);
    z-index: -1;
    filter: blur(10px);
    border: 1px solid #ccffcc;
  }
</style>