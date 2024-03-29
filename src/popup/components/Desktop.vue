<template>
  <div id="desktop-background" :class="desktopClass">
    <div class="no-need-dark bg">
      <transition name="mask">
        <sleep-mask v-if="inSleep"/>
      </transition>
    </div>
    <div class="cover">
    </div>
    <div class="blank-container">
      <div class="notify-container" v-if="width > 900 && showComponent && !simpleMode">
        <NumberClock style="height: 8vw;"></NumberClock>
        <ComponentsCom/>
      </div>
      <div class="application-container" @click.right.prevent="showMenu">
        <div id="search-container" :class="simpleMode ? 'simple-mode': null">
          <Search :size="!simpleMode ? searchHeight: searchHeight * 1.2"></Search>
          <div class="news" @click="openDrawer" v-if="!simpleMode">
            <img src="../../assets/icon/hot.png" alt="news">
          </div>
        </div>
        <div id="apps-container" v-if="!simpleMode">
          <Apps/>
        </div>
      </div>
    </div>
    <div id="dock-container" v-if="!simpleMode">
      <Dock/>
    </div>
    <App></App>
    <RightDrawer></RightDrawer>
    <div class="setting" @click="openSetting">
      <img src="../../assets/icon/logo.png" alt="setting" style="width: 100%; height: 100%">
    </div>
  </div>
</template>

<script>
import Dock from "./Dock/Dock"
import Search from "@/popup/components/search/Search"
import Apps from "@/popup/components/Apps/Apps"
import ComponentsCom from "@/popup/components/Components/Components"
import App from "./App/App"
import RightDrawer from "@/popup/components/common/RightDrawer"
import NumberClock from "@/popup/components/App/Clock/NumberClock"
import SleepMask from "@/popup/components/App/SleepMask/SleepMask"

let timeOut = null
export default {
  name: 'desk-top',
  props: {
    msg: String
  },
  components: {
    ComponentsCom,
    Dock,
    Search,
    Apps,
    App,
    RightDrawer,
    NumberClock,
    SleepMask,
  },
  methods: {
    dark() {
    },
    showMenu(e) {
      console.log(e)
    },
    openDrawer() {
      this.$router.replace('news')
      this.$store.commit('openDrawer')
    },
    openSetting() {
      this.$router.replace('setting')
      this.$store.commit('openDrawer')
    },
    sleepTimer() {
      let that = this
      clearTimeout(timeOut)
      that.inSleep = false
      let thresholdTime = that.$store.getters.goToSleepMinutes // 单位分钟
      timeOut = setTimeout(() => {
        that.inSleep = true
      }, thresholdTime*60*1000)
    }
  },
  computed: {
    simpleMode() {
      return this.$store.getters.simpleMode
    },
    desktopClass() {
      let isDark = this.$store.getters.darkModel
      let cls = ''
      if (isDark) {
        cls = "dark-mode "
      }
      return cls
    },
    showComponent() {
      return this.$store.getters.showComponents
    },
    wallpaper() {
      return 'url(' + this.$store.getters.wallpaper.url + ')'
    },
    position() {
      return this.$store.getters.wallpaper.position.position
    },
    size() {
      return this.$store.getters.wallpaper.position.size
    },
    blur() {
      return 'blur(' + this.$store.getters.wallpaper.blur + 'px' + ')'
    },
    appContainerWidth() {
      let widthPercent = 90
      if (this.width < 900 || !this.showComponent) {
        widthPercent = 90
      }
      return widthPercent + '%'
    },
    desktopWidth() {
      let width = 92
      if (this.width < 500) {
        width = 100
      }
      return width + '%'
    },
    bgZIndex() {
      if (this.inSleep) {
        return 7777777777777777
      }
      return -200
    }
  },
  mounted() {
    window.onresize = () => {
      this.width = document.body.clientWidth
    }
    
  },
  created() {
    let that = this
    this.width = document.body.clientWidth
    document.addEventListener('mousemove', () => {
      if (that.inSleep) {
        return
      }
      that.sleepTimer()
    })
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.code == 'KeyL') {
        // 锁屏 ctrl + L
        that.inSleep = true
        return
      } else if (e.ctrlKey && e.altKey && e.code == 'KeyS') {
        // 极简模式 ctrl + alt + L
        that.$store.commit('setSimpleMode', !that.$store.getters.simpleMode)
        return
      }
      that.sleepTimer()
    })
    document.addEventListener('click', function () {
      that.inSleep = false
    })
  },
  data() {
    return {
      width: 0,
      inSleep: false,
      searchHeight: 61,
    }
  }
}
</script>

<style scoped>
  #desktop-background {
    background: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: v-bind(bgZIndex);
    background-image: v-bind(wallpaper);
    /*background-size: auto 100%;*/
    background-repeat: no-repeat;
    background-position: v-bind(size);
    background-size: v-bind(position);
  }
  .cover {
    width: 100%;
    height: 100%;
    position: fixed;
    backdrop-filter: v-bind(blur);
    z-index: -100;
  }
  .blank-container {
    width: 100%;
    height: 87%;
    display: flex;
    overflow: hidden;
  }
  .notify-container {
    /* flex: 3; */
    width: 25%;
    overflow: hidden;
    height: 100%;
  }
  .application-container {
    /* flex: 10; */
    width: v-bind(desktopWidth);
    overflow: hidden;
    margin: 0 auto;
  }
  .dock-container {
    width: 100%;
    height: 10%;
    overflow: hidden;
  }
  .todo {
    width: 200px;
    height: 200px;
    flex: 1;
  }
  .apps-enter-from {
    transform: translateX(-100px);
  }
  #search-container {
    width: 61%;
    height: 25%;
    margin: 0 auto 0 auto;
    display: flex;
    align-content: center;
    align-items: center;
    position: relative;
    transition: 200ms;
  }
  .news {
    width: 25px;
    height: 25px; 
    /* margin-left: 25px; */
    position: absolute;
    right: -34px;
  }
  .news:hover {
    cursor: pointer;
  }
  #apps-container {
    width: v-bind(appContainerWidth);
    height: 70%;
    margin: 0 auto 0 auto;
  }

  #dock-container {
    width: 100%;
    height: 13%;
    min-height: 100px;
    align-items: center;
    align-content: center;
    display: flex;
  }
  .setting {
    width: 25px;
    height: 25px;
    position: fixed;
    right: 25px;
    top: 16px;
    cursor: pointer;
  }
  .setting:hover {
    animation: rotate 10s linear ;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(3600deg);
    }
  }
  .mask-enter-active,
  .mask-leave-active {
    transition: all 250ms linear;
  }
  .mask-enter-from {
    transform: translateY(-1000px);
  }
  .mask-leave-to {
    transform: translateX(1000px);
    opacity: 0;
  }
  .simple-mode {
    margin: 10% auto 0 auto !important;
  }
</style>
