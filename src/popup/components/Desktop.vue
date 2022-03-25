<template>
  <div id="desktop-background">
    <div id="clock-container">
      <Clock/>
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
    width: 250px;
    height: 100px;
    #position: fixed;
    right: 10px;
    top: 10px;
   #background: green;
  }
  #search-container {
    width: 43%;
    margin: 0 auto;
  }
  #dock-container {
    width: 100%;
    position: fixed;
    bottom: 43px;
  }
</style>
