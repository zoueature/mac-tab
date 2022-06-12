<template>
  <div class="setting-app">
    <div class="title">设置</div>
    <div class="app-config-slider">
      <span class="setting-title">图标大小</span>
      <el-slider v-model="appSize" class="slider" :min="50" :max="80" @input="appSizeChange" size="small" input-size="small"></el-slider>
    </div>
    <div class="app-config-slider">
      <p class="setting-title">图标排数</p>
      <el-slider v-model="appColumnNum" class="slider" :min="7" :max="12" @input="appColumnNumChange"></el-slider>
    </div>
    <div class="app-config-switch">
      <p class="setting-title">开启小组件</p>
      <el-switch v-model="showComponent" @change="toggleComponent"/>
    </div>
    <div class="app-config-switch">
      <p class="setting-title">黑暗模式</p>
      <el-switch v-model="darkModel" @change="toggleDarkModel"/>
    </div>
  </div>
</template>

<script>

import {ElSlider, ElSwitch} from "element-plus"

export default {
  name: "SettingCom",
  components: {
    ElSlider,
    ElSwitch,
  },
  created() {
    this.appSize = this.$store.getters.appSize
    this.appColumnNum = this.$store.getters.appSize
  },
  data() {
    return {
      value: 0,
      appSize: 0,
      appColumnNum: 0,
    }
  },
  computed: {
    showComponent() {
      return this.$store.getters.showComponents
    },
    darkModel() {
      return this.$store.getters.darkModel
    }
  },
  methods: {
    appSizeChange(val) {
      this.$store.commit('updateAppSize', val)
    },
    appColumnNumChange(val) {
      this.$store.commit('updateAppColumnNum', val)
    },
    toggleComponent(val) {
      this.$store.commit('setShowComponent', val)
    },
    toggleDarkModel(val) {
      this.$store.commit('setDarkModel', val)
      // this.$store.commit('closeDrawer')
      // window.location.reload()
    }
  }
}
</script>

<style scoped>
  .setting-app {
    padding-left: 5%;
    width: 95%;
    height: 100%;
    backdrop-filter: blur(100px);
    background: #ececec;
    box-shadow: -1px -1px 10px white;
  }
  .title {
    padding-top: 10px;
    width: 100%;
    height: 70px;
    text-align: left;
    font-weight: bolder;
    font-size: 25px;
    margin: 0 auto;
  }
  .setting-title {
    color: rgba(0, 0, 0, 0.56);
    font-weight: normal;
    font-size: 12px;
  }
  .slider {
    margin: 0 auto;
    width: 70%;
    height: 10px;
  }
  .app-config-slider {
    display: flex;
    margin-top: 16px;
    width: 90%;
    height: 25px;
    text-align: left;
    align-items: center;
  }
  .app-config-switch {
    display: flex;
    margin-top: 16px;
    width: 50%;
    height: 25px;
    text-align: left;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }
</style>