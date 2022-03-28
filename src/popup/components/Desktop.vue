<template>
  <div id="desktop-background">
    <div class="blank-container">
      <div class="notify-container">
        <NewClock class="new-clock"/>
        <div class="component">
          <Todo class="todo"/>
          <Todo class="todo"/>
        </div>
      </div>
      <div class="application-container">
        <div id="search-container">
          <div class="news">
            <img src="../../assets/icon/fire.png">
          </div>
          <Search/>
        </div>
        <Modal>

        </Modal>
        <div id="apps-container">
          <Apps size="80" rows="4" columns="13"/>
        </div>
      </div>
    </div>
    <div class="dock-container">
      <div id="dock-container">
        <Dock/>
      </div>
    </div>
  </div>
</template>

<script>

import Dock from "./Dock/Dock"
import Search from "@/popup/components/search/Search";
import Apps from "@/popup/components/Apps/Apps";
import NewClock from "@/popup/components/Clock/NewClock";
import Todo from "@/popup/components/todo/Todo";
import Modal from "@/popup/components/common/Modal";
/* eslint-disable */
export default {
  name: 'desk-top',
  props: {
    msg: String
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
  components: {
    Dock,
    Search,
    Apps,
    NewClock,
    Todo,
    Modal,
  },
  data() {
    return {
      dialogState: false,
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
  .component {
    display: flex;
    width: 100%;
    justify-content: space-between;
    justify-items: center;
  }

  #dock-container {
    width: 100%;
    position: fixed;
    bottom: 34px;
  }
</style>
