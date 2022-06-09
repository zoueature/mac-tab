<template>
  <div id="desktop-background" :class="desktopClass">
    <div :class="coverClass">
    </div>
    <div class="blank-container">
      <div class="notify-container" v-if="width > 900 && showComponent">
<!--        <NewClock class="new-clock"/>-->
        <NumberClock class="clock"></NumberClock>
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
      <img src="../../assets/icon/setting.png" alt="setting" style="width: 100%; height: 100%">
    </div>
  </div>
</template>

<script>
import Dock from "./Dock/Dock"
import Search from "@/popup/components/search/Search";
import Apps from "@/popup/components/Apps/Apps";
import NewClock from "@/popup/components/App/Clock/NewClock";
import Todo from "@/popup/components/App/Todo/TodoWidget";
import Friday from "@/popup/components/Widgets/Friday";
import Components from "@/popup/components/Components/Components";
import ComponentsCom from "@/popup/components/Components/Components";
import TodoApp from "@/popup/components/App/Todo/TodoApp"
import App from "./App/App"
import RightDrawer from "@/popup/components/common/RightDrawer";
import FolderContent from "@/popup/components/Apps/FolderContent";
import NumberClock from "@/popup/components/App/Clock/NumberClock";

/* eslint-disable */
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
    NewClock,
    Todo,
    Friday,
    Components,
    TodoApp,
    App,
    RightDrawer,
    // Loading,
    FolderContent,
    NumberClock,
  },
  methods: {
    dark() {
    },
    showMenu(e) {
      console.log(123, e)
    },
    openDrawer() {
      this.$router.replace('news')
      this.$store.commit('openDrawer')
    },
    openSetting() {
      this.$router.replace('setting')
      this.$store.commit('openDrawer')
    }
  },
  computed: {
    desktopClass() {
      let isDark = this.$store.getters.darkModel
      let cls = 'no-need-dark'
      if (isDark) {
        cls = "dark-mode " + cls
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
  },
  mounted() {
    window.onresize = () => {
      this.width = document.body.clientWidth
    }
  },
  created() {
    this.width = document.body.clientWidth
    this.$store.commit('initCommonConfig')
  },
  beforeCreate() {
      // this.$store.watch((state, getter) => {
      //   return getter.darkModel
      // }, (val) => {
      //   if (val) {
      //     darkmode.showWidget()
      //     console.log(darkmode.isActivated())
      //     console.log(darkmode)
      //   }
      // })
  },
  data() {
    return {
      width: 0,
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
  .cover {
    width: 100%;
    height: 100%;
    position: fixed;
    backdrop-filter: v-bind(blur);
    z-index: -100;
    background-image: v-bind(wallpaper);
    /*background-size: auto 100%;*/
    background-repeat: no-repeat;
    background-position: v-bind(size);
    background-size: v-bind(position);
    /*background: rgb(0,0,0,0.1);*/
  }
  .clock {
    margin-top: 16px;
    margin-bottom: 25px;
  }
  .blank-container {
    width: 100%;
    height: 85%;
    display: flex;
    overflow: hidden;
  }
  .notify-container {
    flex: 3;
    overflow: hidden;
    height: 100%;
  }
  .application-container {
    flex: 10;
    overflow: hidden;
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

  #search-container {
    width: 70%;
    margin: 10% auto 0 auto;
    display: flex;
  }
  .news {
    width: 34px;
    height: 34px;
    margin-left: 16px;
    margin-top: 10px;
  }
  .news:hover {
    cursor: pointer;
  }
  #apps-container {
    width: 99%;
    height: 60%;
    margin: 5% auto 0 auto;
  }

  #dock-container {
    width: 100%;
    height: 10%;
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
</style>
