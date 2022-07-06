<template>
  <div id="desktop-background" :class="desktopClass">
    <transition name="mask">
      <sleep-mask v-if="inSleep"/>
    </transition>
    <div class="no-need-dark cover">
    </div>
    <div class="blank-container">
      <div class="notify-container" v-if="width > 900 && showComponent">
<!--        <NewClock class="new-clock"/>-->
        <NumberClock style="height:125px;"></NumberClock>
        <ComponentsCom/>
      </div>
      <div class="application-container" @click.right.prevent="showMenu">
        <div id="search-container">
          <Search/>
          <div class="news" @click="openDrawer">
            <img src="../../assets/icon/hot.png" alt="news">
          </div>
        </div>
        <div id="apps-container">
          <Apps size="80" rows="4" columns="13"/>
        </div>
      </div>
    </div>
    <div id="dock-container">
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
        console.log(new Date().toString())
        that.inSleep = true
      }, thresholdTime*60*1000)
    }
  },
  computed: {
    desktopClass() {
      let isDark = this.$store.getters.darkModel
      let cls = ''
      if (isDark) {
        cls = "dark-mode "
      }
      return cls
    },
    coverClass() {
      let isDark = this.$store.getters.darkModel
      let cls = 'cover'
      if (isDark) {
        cls += ' no-need-dark'
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
        widthPercent = 97
      }
      return widthPercent + '%'
    },
    desktopWidth() {
      let width = 75
      if (this.width < 500) {
        width = 100
      }
      return width + '%'
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
    this.$store.commit('initCommonConfig')
    document.addEventListener('mousemove', () => {
      that.sleepTimer()
    })
    document.addEventListener('keyup', function () {
      that.sleepTimer()
    })
  },
  data() {
    return {
      width: 0,
      inSleep: false,
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
    background-image: v-bind(wallpaper);
    /*background-size: auto 100%;*/
    background-repeat: no-repeat;
    background-position: v-bind(size);
    background-size: v-bind(position);
    /*background: rgb(0,0,0,0.1);*/
  }
  .cover {
    width: 100%;
    height: 100%;
    position: fixed;
    backdrop-filter: v-bind(blur);
    z-index: -100;
    /*background-image: v-bind(wallpaper);*/
    /*background-size: auto 100%;*/
   /* background-repeat: no-repeat;
    background-position: v-bind(size);
    background-size: v-bind(position);*/
    /*background: rgb(0,0,0,0.1);*/
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
    width: 70%;
    height: 25%;
    margin: 0 auto 0 auto;
    display: flex;
    align-content: center;
    align-items: center;
    position: relative;
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
    transition: all 750ms linear;
  }
  .mask-enter-from,
  .mask-leave-to {
    transform: translateY(-1000px);
  }
</style>
