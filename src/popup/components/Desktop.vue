<template>
  <div id="desktop-background">
    <div id="clock-container">
      <Clock size="160"/>
    </div>
    <div id="search-container">
      <Search/>
    </div>
    <div id="dock-container">
      <Dock/>
    </div>
  </div>
</template>

<script>

import Dock from "./Dock/Dock"
import Search from "@/popup/components/search/Search";
import Clock from "@/popup/components/Clock/Clock";

export default {
  name: 'desk-top',
  props: {
    msg: String
  },
  components: {
    Dock,
    Search,
    Clock,
  },
  mounted() {
    document.removeEventListener("touchmove", () => {}, { passive: false });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #desktop-background {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url("../../assets/images/wrapper/default.jpg");
    background-size: 100% 100%;
  }
  #clock-container {
    position: fixed;
    left: 50px;
    top: 50px;
  }
  #search-container {
    width: 43%;
    margin: 110px auto 0 auto;
  }
  #dock-container {
    width: 100%;
    position: fixed;
    bottom: 52px;
  }
</style>
