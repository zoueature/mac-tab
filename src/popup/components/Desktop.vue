<template>
  <div id="desktop-background">
    <div class="blank-container">
      <div class="notify-container">
        <NewClock class="new-clock"/>
        <ComponentsCom/>
      </div>
      <div class="application-container" @click.right.prevent="showMenu">
        <div id="search-container">
          <div class="news">
            <img src="../../assets/icon/fire.png" alt="news">
          </div>
          <Search/>
        </div>
        <div id="apps-container">
          <Apps size="80" rows="4" columns="13"/>
        </div>
        <CustomModal></CustomModal>
      </div>
    </div>
    <div id="dock-container">
      <Dock/>
    </div>
    <div id="app">
      <TodoApp></TodoApp>
    </div>
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
  },
  methods: {
    showMenu(e) {
      console.log(123, e)
    }
  },
  mounted() {
  },
  created() {
    // chrome.runtime.onMessage.addListener(
    //     function(request, sender, sendResponse) {
    //       console.log(request)
    //     }
    // );
    // setTimeout(
    //     () => {
    //       // eslint-disable-next-line
    //       chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    //         console.log(response);
    //       });
    //     },
    //     7000
    // )
  },
  data() {
    return {
      dialogState: false,
      showMenu: false,
      showModal: false,
    }
  }
}
</script>

<style scoped>
  #desktop-background {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url("../../assets/images/wrapper/default.jpg");
    background-size: 100% 100%;
  }
  .new-clock {
    width: 160px;
    height: 160px;
    margin: 7% auto 0 auto;
  }
  .blank-container {
    width: 100%;
    height: 90%;
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
    width: 43px;
    height: 43px;
    margin-right: 16px;
    margin-top: 5px;
  }

  #apps-container {
    margin: 50px auto 0 auto;
  }

  #dock-container {
    width: 100%;
    height: 10%;
  }
  #app {
    position: absolute;
  }
</style>
