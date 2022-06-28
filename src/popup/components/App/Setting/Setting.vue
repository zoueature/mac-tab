<template>
  <div class="setting-app">
    <div class="title">设置</div>
    <div class="app-config">
      <div class="setting-title">
        <application-one theme="outline" size="25" fill="#777" :strokeWidth="2"/>
        <span>图标大小</span>
      </div>
      <div class="setting-value">
        <el-slider v-model="appSize" class="slider" :min="60" :max="160" @input="appSizeChange" size="small" input-size="small"></el-slider>
      </div>
    </div>
    <div class="app-config">
      <div class="setting-title">
        <round-distortion theme="outline" size="23" fill="#777" :strokeWidth="2"/>
        <span>开启小组件</span>
      </div>
      <div class="setting-value">
        <el-switch v-model="showComponent" @change="toggleComponent"/>
      </div>
    </div>
    <div class="app-config">
      <div class="setting-title">
        <dark-mode theme="outline" size="25" fill="#777" :strokeWidth="2"/>
        <span>黑暗模式</span>
      </div>
       <div class="setting-value">
         <el-switch v-model="darkModel" @change="toggleDarkModel"/>
       </div>
     
    </div>
  </div>
</template>

<script>

import {ElSlider, ElSwitch} from "element-plus"
import {ApplicationOne, RoundDistortion, DarkMode} from "@icon-park/vue-next"

export default {
  name: "SettingCom",
  components: {
    ElSlider,
    ElSwitch,
    ApplicationOne,
    RoundDistortion,
    DarkMode,
  },
  created() {
    this.appSize = this.$store.getters.appSize
    this.appColumnNum = this.$store.getters.appSize
    // this.$loading.show()
    console.log(this.$t('appName'))
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
    padding-left: 3%;
    width: 97%;
    height: 100%;
    backdrop-filter: blur(100px);
    background: #efefef;
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
  .app-config {
    display: flex;
    margin-top: 16px;
    width: 90%;
    height: 25px;
    text-align: left;
    align-items: center;
    width: 100%;
    justify-content: left;
    justify-items: left;
  }
  .setting-title {
    color: rgba(0, 0, 0, 0.56);
    font-weight: normal;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    flex: 4;
    justify-self: flex-start;
  }
  .setting-title span {
    margin-left: 7px;
  }
  .setting-value {
    flex: 8;
  }
  .slider {
    width: 97%;
    height: 10px;
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