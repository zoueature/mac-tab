<template>
  <div id="app" @click="closeApp">
    <div class="app-container" @click.stop="">
      <div class="app-title" @mouseenter="showIcon" @mouseleave="hiddenIcon">
        <div class="close" @click="closeApp">
          <img v-if="showIconTrigger" src="../../../assets/icon/close.png" alt="">
        </div>
        <div class="max" @click="max" v-if="showMaxIcon">
          <img v-if="showIconTrigger" src="../../../assets/icon/enlarge.png" alt="">
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    showIcon() {
      this.showIconTrigger = true
    },
    hiddenIcon() {
      this.showIconTrigger = false
    },
    closeApp() {
      this.$store.commit('closeApp')
    }
  },
  data() {
    return {
      showIconTrigger: false,
      showMaxIcon: false,
    }
  }
}
</script>

<style scoped>
  #app {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .app-container {
    width: 50%;
    height: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 10px 10px 10px 10px;
    transform: translate(-50%, -50%);
    border-radius: 7px;
    box-shadow: 1px 2px 16px rgba(0, 0, 0, 0.48);
    background: white;
  }
  .app-title {
    width: 100%;
    height: 25px;
    display: flex;
  }
  .close, .max {
    width: 14px;
    height: 14px;
    background: #ab0000;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  }
  .max {
    background: #42b983;
  }
  .app-title img {
    position: absolute;
    width: 43%;
    height: 43%;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>