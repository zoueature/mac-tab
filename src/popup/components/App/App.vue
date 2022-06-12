<template>
  <transition name="app">
    <div id="app" v-if="showApp">
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
          <Loading></Loading>
          <router-view name="app"></router-view>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import Loading from "@/popup/components/common/Loading";

export default {
  name: "App",
  components: {
    Loading,
  },
  methods: {
    showIcon() {
      this.showIconTrigger = true
    },
    hiddenIcon() {
      this.showIconTrigger = false
    },
    closeApp() {
      this.$store.commit('closeApp')
      this.$store.commit('closeLoading')
    }
  },
  mounted() {
    let that = this
    this.$nextTick(() => {
      document.addEventListener('keyup', function (e) {
        if (e.code === 'Escape') {
          that.$store.commit('closeApp')
          that.$store.commit('closeLoading')
        }
      })
    })
  },
  computed: {
    backgroundColor() {
      let color = 'rgba(0, 0, 0, 0.70)'
      if (this.$store.getters.darkModel) {
          color = 'rgba(255, 255, 255, 0.70)'
      }
      return color
    },
    showApp() {
      return this.$store.getters.showApp
    },
    width() {
      let paramWith = 52
      if (+this.$route.params.width > 0) {
        paramWith = this.$route.params.width
      }
      return paramWith + "%"
    },
    height() {
      let paramWith = 70
      if (+this.$route.params.height > 0) {
        paramWith = this.$route.params.height
      }
      return paramWith + "%"
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
    z-index: 1000000000;
    background: v-bind(backgroundColor);
    overflow: hidden;
    min-width: 880px;
  }
  .app-container {
    width: v-bind(width);
    height: v-bind(height);
    position: absolute;
    left: 50%;
    top: 50%;
    overflow: hidden;
    /*padding-top: 7px;*/
    /*padding-bottom: 7px;*/
    transform: translate(-50%, -50%);
    border-radius: 7px;
    box-shadow: 1px 2px 16px rgba(0, 0, 0, 0.48);
    background: rgb(232, 232, 232);
  }
  .app-title {
    /*width: 100%;*/
    /*height: 25px;*/
    left: 10px;
    top: 10px;
    display: flex;
    position: absolute;
    z-index: 10000000000;
  }
  .app-content {
    width: 100%;
    height: 100%;
    position: relative;
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
    transition: all 250ms ease;
  }
  .app-enter-from,
  .app-leave-to {
    /*transform: scale(0);*/
    opacity: 0;
  }
</style>