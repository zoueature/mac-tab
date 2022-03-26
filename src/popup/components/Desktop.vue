<template>
  <div id="desktop-background">
    <div class="blank-container">
      <div class="notify-container">
        <div id="clock-container">
          <Clock size="160"/>
        </div>
      </div>
      <div class="application-container">
        <div id="search-container">
          <Search/>
        </div>
        <div id="apps-container">
          <Apps size="80" rows="4" columns="12"/>
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
import Clock from "@/popup/components/Clock/Clock";
import Apps from "@/popup/components/Apps/Apps";

export default {
  name: 'desk-top',
  props: {
    msg: String
  },
  components: {
    Dock,
    Search,
    Clock,
    Apps,
  },
  mounted() {
    document.removeEventListener("touchmove", () => {}, { passive: false });
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

  #clock-container {
    margin: 0 auto;
    position: relative;
  }

  #search-container {
    width: 61%;
    margin: 110px auto 0 auto;
  }

  #apps-container {
    margin: 100px auto 0 auto;
  }

  #dock-container {
    width: 100%;
    position: fixed;
    bottom: 52px;
  }
</style>
