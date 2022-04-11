<template>
  <div id="desktop-background">
    <div class="blank-container">
      <div class="notify-container">
        <NewClock class="new-clock"/>
        <ComponentsCom/>
      </div>
      <div class="application-container" @click.right.prevent="showMenu">
        <div id="search-container">
          <Search/>
          <div class="news">
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
    <button @click="showDrawer = !showDrawer">dadadad</button>
    <transition name="app">
      <App id="app" v-if="showApp"></App>
    </transition>
    <transition name="rightDrawer" >
      <div class="drawer" v-if="showDrawer"></div>
    </transition>
  </div>
</template>

<script>

import Dock from "./Dock/Dock"
import Search from "@/popup/components/search/Search";
import Apps from "@/popup/components/Apps/Apps";
import NewClock from "@/popup/components/Clock/NewClock";
import Todo from "@/popup/components/App/Todo/TodoWidget";
import Friday from "@/popup/components/Widgets/Friday";
import Components from "@/popup/components/Components/Components";
import ComponentsCom from "@/popup/components/Components/Components";
import CustomModal from "@/popup/components/common/WindowModal";
import TodoApp from "@/popup/components/App/Todo/TodoApp"
import App from "./App/App"

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
    CustomModal,
    TodoApp,
    App,
  },
  methods: {
    showMenu(e) {
      console.log(123, e)
    },
    openDrawer() {
      this.showDrawer = true
    },
    closeDrawer() {
      this.showDrawer = false
    },
  },
  computed: {
    showApp() {
      return this.$store.getters.showApp
    },
    wallpaper() {
      return 'url(' + this.$store.getters.wallpaper + ')'
    }
  },
  mounted() {

  },
  created() {
  },
  data() {
    return {
      dialogState: false,
      showMenu: false,
      showModal: false,
      showDrawer: false,
    }
  }
}
</script>

<style scoped>
  #desktop-background {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: v-bind(wallpaper);
    background-size: 100% 100%;
  }
  .new-clock {
    width: 160px;
    height: 160px;
    margin: 7% auto 0 auto;
  }
  .blank-container {
    width: 100%;
    height: 88%;
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

  #apps-container {
    margin: 50px auto 0 auto;
  }

  #dock-container {
    width: 100%;
    height: 10%;
  }
  .app-enter-active,
  .app-leave-active {
    transition: all 500ms ease;
  }
  .app-enter-from,
  .app-leave-to {
    transform: scale(0);
    opacity: 0;
  }
  .rightDrawer-enter-active,
  .rightDrawer-leave-active {
    transition: all 500ms ease;
  }
  .rightDrawer-enter-from,
  .rightDrawer-leave-to {
    transform: translateX(430px);
    opacity: 0;
  }
  .drawer {
    width: 430px;
    height: 100%;
    background: blue;
    position: fixed;
    top: 0;
    right: 0;
  }
</style>
