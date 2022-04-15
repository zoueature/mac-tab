<template>
  <div class="container">
    <div style="flex: 1"></div>
    <Draggable :list="docks"
               item-key="id"
               :options="option"
               class="container"
               @start="start"
               @end="end"
               @add="add"
               @clone="clone"
               group="apps"
    >
      <template #item="{ element }"  >
        <DockItem :size="dockSize"
                  :icon="element.icon"
                  :name="element.name"
                  :link="element.link"
                  :hover="true"
                  :class="dockItemClass(element.id)"
                  @mouseenter="enlarge(element.id)" @mouseleave="recover"
        />
      </template>
    </Draggable>
    <div style="flex: 1"></div>
    <div class="bg"></div>
  </div>
</template>

<script>

import DockItem from "@/popup/components/Apps/AppItem";
import Draggable from "vuedraggable";

export default {
  name: "dock-com",
  components: {
    DockItem,
    Draggable,
  },
  data() {
    return {
      option: {
        group: {name: "apps", put: true, pull: true},
        sort: true,
        delay: 1000,
        animation: 1000,
        ghostClass: "ghostClass",
        tag: "transition"
      },
      scaleIndex: -2,
      inMove: false,
      size: 66,
      docks: [
        {id: 1, type: 'app', scale: true, name:"网易云音乐", icon:"../../../assets/images/app/netease.png", link: "https://music.163.com/"},
        {id: 2, type: 'app', scale: true, name:"Tiktok", icon:"../../../assets/images/app/tiktok.png", link: "https://www.tiktok.com/"},
        {id: 3, type: 'app', scale: true, name:"爱奇艺", icon:"../../../assets/images/app/iqiyi.png", link: "https://www.iqiyi.com/"},
        {id: 4, type: 'app', scale: true, name:"腾讯视频", icon:"../../../assets/images/app/txvideo.png", link: "https://v.qq.com/"},
        {id: 5, type: 'app', scale: true, name:"优酷", icon:"../../../assets/images/app/youku.png", link: "https://www.youku.com/"},
        {id: 6, type: 'app', scale: true, name:"Github", icon:"../../../assets/images/app/github.png", link: "https://github.com/"},
        {id: 7, type: 'app', scale: true, name:"即刻", icon:"../../../assets/images/app/jike.png", link: "https://web.okjike.com/"},
        {id: 8, type: 'app', scale: true, name:"微博", icon:"../../../assets/images/app/weibo.png", link: "https://www.weibo.com/"},
        {id: 9, type: 'app', scale: true, name:"Facebook", icon:"../../../assets/images/app/facebook.png", link: "https://www.facebook.com/"},
        {id: 10, type: 'app', scale: true, name:"Youtube", icon:"../../../assets/images/app/youtube.png", link: "https://www.youtube.com/"},
        {id: 11, type: 'app', scale: true, name:"Twitter", icon:"../../../assets/images/app/twitter.png", link: "https://www.twitter.com/"},
        {id: 12, type: 'app', scale: true, name:"京东", icon:"../../../assets/images/app/jd.png", link: "https://www.jd.com/"},
      ]
    }
  },
  computed: {
    dockSize() {
      let size =  this.size
      if (this.docks.length > 16) {
        size = Math.ceil(size * 0.8)
      }
      return size
    },
    containerLength() {
      return (this.docks.length + 2 ) * this.size  + 'px'
    },
    dockItemSize() {
      return (this.size + 10) + 'px'
    },
    dockItemClass() {
      let that = this
      return function (index) {
        let cls = 'dock-item'
        if (!that.inMove) {
          if (that.scaleIndex === index) {
            cls += ' enlarge'
          }
          if (Math.abs(that.scaleIndex - index) === 1) {
            cls += ' enlarge-little'
          }
        }
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
    add(e) {
      console.log('add')
      console.log(e)

    },
    start(e) {
      this.inMove = true
      console.log('start')
      this.scaleIndex = -2
      console.log(e)
    },
    end(e) {
      console.log('end', e)
      this.inMove = false
      this.recover()
    },
    clone(e) {
      console.log('clone')
      console.log(e)
    }
  }
}
</script>

<style scoped>
  @keyframes enlargeBig {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.5);
    }
  }
  @keyframes enlargeLittle {
    to {
      transform: scale(1.2);
    }
  }
  .enlarge {
    animation: enlargeBig 200ms;
    /*transform: scale(1.6);*/
  }
  .enlarge-little {
    /*animation: enlargeLittle 300ms;*/
    /*transform: scale(1.3);*/
  }
  .container, .bg {
    width: v-bind(containerLength);
    height: v-bind(dockItemSize);
    margin: 0 auto;
    display: flex;
    position: relative;
  }
  .dock-item {
    flex: 2;
  }
  .bg {
    width: v-bind(containerLength);
    height: v-bind(dockItemSize);
    position: absolute;
    top: -20%;
    background: rgba(215, 211, 211, 0.5);
    z-index: -1;
    filter: blur(10px);
    border: 1px solid #ccffcc;
  }
</style>