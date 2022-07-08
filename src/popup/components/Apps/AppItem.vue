<template>
  <div id="dock-item" @click="handler" :class="dockItemClass" @click.right.stop="startEditApp">
    <div :class="iconContainerClass" :style="iconBorder ? 'border: 1px solid rgba(255, 255, 255, 0.45);': '' ">
      <div v-if="type === 'app'" style="width: 100%; height: 100%;">
        <img :src="icon" :alt="name" :style="'width: 100%; height: 100%; object-fit: cover; background-color:' + background" @error="loadIconSucc=false" v-if="loadIconSucc && icon !== '' && icon !== undefined"/>
        <div v-else class="icon-word-container" :style="'background: ' + (background !== undefined? background: 'blue') ">
          {{name.substring(0, 3).toUpperCase()}}
        </div>
      </div>
      <slot v-else></slot>
    </div>
    <div class="title-container no-need-dark" v-if="showTitle !== false">
      {{name}}
    </div>
    <div class="delete-icon" v-if="inEditApp && systemApp[id] !== true" @click.stop="removeApp">
      <img src="../../../assets/icon/close.png" style="width: 50%; height: 50%">
    </div>
  </div>
</template>

<script>

import app_config from "@/popup/components/App/app_config";
const systemApp = {
  31: true, 
  24: true,
  22: true,
}



export default {
  name: "DockItem",
  props: [
    "id",
    "icon",
    "name",
    "link",
    "iconBorder",
    "click",
    "background",
    "type",
    "app",
    "maxSize",
    "hoverScale",
    "showTitle",
  ],
  created() {
    if (typeof this.click === "function") {
      this.clickHandler = this.click
    }
    this.appLink = this.link
    this.appId = this.id
  },
  computed: {
    dockItemClass() {
      let cls = ''
      if (this.clickApp) {
        cls += 'click '
      }
      return cls
    },
    iconContainerClass() {
      let cls = "icon-container "
      if (this.inEditApp) {
        cls += 'shake'
      }
      return cls
    },
    scaleApp() {
      let s = ''
      if (!this.inEditApp && this.hoverScale !== false) {
        s += 'scale(1.16)'
      }
      return s
    },
    itemSize() {
      let size = this.appSize()
      return size + 'px'
    },
    iconSize() {
      let weight = 0.7
      if (this.showTitle === false) {
        weight = 0.9
      }
      return Math.ceil(this.appSize() * weight) + "px"
    },
    inEditApp() {
      return this.$store.getters.inEditApp
    },
    iconWordSize() {
      let size = this.appSize()
      return Math.ceil(size / 4) - 1 + "px"
    },
    shakeDurations() {
      let n = Math.ceil(Math.random() * 100) + 200
      return n + 'ms'
    }
  },
  methods: {
    startEditApp(ev) {
      ev.preventDefault()
      this.$store.commit('startEditApp')
      // this.inOpt = true
    },
    appSize() {
      let size = this.$store.getters.appSize
      if (typeof this.maxSize === 'number' && this.maxSize > 0 && this.maxSize < size) {
        size = this.maxSize
      }
      if (this.showTitle === false) {
        size = Math.ceil(size * 0.8)
      }
      return size
    }, 
    removeApp() {
      this.$store.commit('removeApp', {id: this.appId})
      this.inOpt = false
    },
    handler() {
      if (this.inOpt) {
        return
      }
      this.clickApp = true
      let that = this
      setTimeout(
          () => that.clickApp = false,
          70
      )
      if (this.appLink !== null && this.appLink !== undefined && this.appLink !== "") {
        let openAppInNewTab = this.$store.getters.newTabOpenApp
        if (openAppInNewTab) {
          window.open(this.appLink, '_blank')
        } else {
          window.location.href = this.appLink
        }
        return;
      } else if (typeof this.app === "string" && this.app !== "") {
        let routeParams = app_config.appSize[this.app]
        if (routeParams === undefined) {
          routeParams = {}
        }
        this.$router.replace({
          name: this.app,
          params: routeParams,
        })
        this.$store.commit('openApp')
      }
      // this.clickHandler()
      this.$store.commit('closeFolder')
    },
  },
  data() {
    return {
      clickHandler: function (){},
      clickApp: false,
      appLink: "",
      // inOpt: this.$store.getters.inEditApp,
      appId: 0,
      loadIconSucc: true,
      systemApp: systemApp,
    }
  }
}
</script>

<style scoped>
  #dock-item {
    width: v-bind(itemSize);
    height: v-bind(itemSize);
    user-select: none;
    position: relative;
  }
  .icon-container:hover{
    transform: v-bind(scaleApp);
    transition: 200ms ease;
  }
  .click {
    transform: translate(2px, 2px);
  }
  @keyframes shake-app {
    from {
      transform: rotate(-10deg);
    }
    to {
      transform: rotate(10deg);
    }
  }
  .border {
    border: 1px solid rgba(255, 255, 255, 0.45);
  }
  .white {
    color: rgba(255, 255, 255, 0.45);
  }
  .icon-container {
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    margin: 0 auto;
    overflow: hidden;
    border-radius: 25%;
    background: #d5d5d5;
    transition: all 250ms linear;
  }
  .shake {
    animation: shake-app 250ms infinite linear;
    animation-duration: v-bind(shakeDurations);
    animation-direction: alternate;
  }
  .icon-word-container {
    color: black;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: v-bind(iconWordSize);
    line-height: v-bind(iconSize);
    transition: all 250ms linear;
  }
  .title-container {
    margin-top: 3px;
    font-size: 12px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .delete-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-25%, -25%);
    background: rgb(255, 95, 92);
    border-radius: 100%;
    overflow: hidden;
    transition: 200ms;
  }
  .delete-icon img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>