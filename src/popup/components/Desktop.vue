<template>
  <div id="desktop-background">
    <div class="blank-container">
      <div class="notify-container">
        <NewClock class="new-clock"/>
        <div class="component" ref="components">
          <div class="test">
            <Friday/>
            <Todo class="todo"/>
            <Friday/>
            <Todo class="todo"/>
            <Friday/>
          </div>
        </div>
      </div>
      <div class="application-container">
        <div id="search-container">
          <div class="news">
            <img src="../../assets/icon/fire.png">
          </div>
          <Search/>
        </div>
        <div id="apps-container">
          <Apps size="80" rows="4" columns="13"/>
        </div>
      </div>
    </div>
    <div id="dock-container">
      <Dock/>
    </div>
  </div>
</template>

<script>

import Dock from "./Dock/Dock"
import Search from "@/popup/components/search/Search";
import Apps from "@/popup/components/Apps/Apps";
import NewClock from "@/popup/components/Clock/NewClock";
import Todo from "@/popup/components/todo/Todo";
import Friday from "@/popup/components/Clock/Friday";
import BScroll from "better-scroll";

/* eslint-disable */
export default {
  name: 'desk-top',
  props: {
    msg: String
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.components, {
        mouseWheel: {
          speed: 1,
          easeTime: 100,
          dampingFactor: 0.005,
        },
        bounceTime: 500,
      })
    })
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
    Friday,
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
    width: 43px;
    height: 43px;
    margin-right: 16px;
    margin-top: 5px;
  }

  #apps-container {
    margin: 50px auto 0 auto;
  }
  .component {
    width: 80%;
    height: 70%;
    margin: 0 auto;
    background: red;
    overflow: hidden;
  }

  #dock-container {
    width: 100%;
    height: 15%;
    /*position: fixed;*/
    /*bottom: 34px;*/
  }
</style>
