<template>
  <transition name="app" >
    <div id="app" @click="closeApp" v-if="showApp">
      <div class="app-container" @click.stop="">
        <div class="app-title" @mouseenter="showIcon" @mouseleave="hiddenIcon">
          <div class="close" @click="closeApp">
            <img v-if="showIconTrigger" src="../../../assets/icon/close.png" alt="">
          </div>
          <div class="max" @click="max" v-if="showMaxIcon">
            <img v-if="showIconTrigger" src="../../../assets/icon/enlarge.png" alt="">
          </div>
        </div>
        <div class="app-content">
          <router-view name="app"></router-view>
        </div>
      </div>
    </div>
  </transition>
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
  computed: {
    showApp() {
      return this.$store.getters.showApp
    },
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
    padding-top: 7px;
    padding-bottom: 7px;
    transform: translate(-50%, -50%);
    border-radius: 7px;
    box-shadow: 1px 2px 16px rgba(0, 0, 0, 0.48);
    background: white;
  }
  .app-title {
    width: 100%;
    height: 25px;
    margin-left: 7px;
    display: flex;
  }
  .app-content {
    width: 100%;
    height: 95%;
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
  .app-enter-active,
  .app-leave-active {
    transition: all 400ms ease;
  }
  .app-enter-from,
  .app-leave-to {
    transform: scale(0);
    opacity: 0;
  }
</style>