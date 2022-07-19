<template>
  <div class="setting-app">
    <div class="title">
      <setting theme="outline" size="27" fill="#0288D1" :strokeWidth="4"/>
      <span>{{$i18n('setting')}}</span>
    </div>
    <div class="app-config">
      <div class="setting-title">
        <application-one theme="outline" size="22" fill="#fff" :strokeWidth="4"/>
        <span>{{$i18n('appSize')}}</span>
      </div>
      <div class="setting-value">
        <el-slider v-model="appSize" class="slider" :min="60" :max="160" @input="appSizeChange" size="small" input-size="small"></el-slider>
      </div>
    </div>
    <!-- <div class="app-config">
      <div class="setting-title">
        <page-template theme="outline"  size="18" fill="#fff" :strokeWidth="4"/>
        <span>小组件</span>
      </div>
      <div class="setting-value">
        <el-switch v-model="showComponent" @change="toggleComponent"/>
      </div>
    </div> -->
    <!-- <div class="app-config">
      <div class="setting-title">
        <moon theme="outline"  size="18" fill="#fff" :strokeWidth="4"/>
        <span>黑暗模式</span>
      </div>
       <div class="setting-value">
         <el-switch v-model="darkModel" @change="toggleDarkModel"/>
       </div>
    </div> -->
    <div class="app-config">
      <div class="setting-title">
        <browser theme="outline" size="18" fill="#fff" :strokeWidth="4"/>
        <span>{{$i18n('openLinkMode')}}</span>
      </div>
       <div class="setting-value">
         <el-switch v-model="newTabOpenApp" @change="toggleNewTabOpenApp"/>
       </div>
    </div>
    <div class="app-config">
      <div class="setting-title">
        <sleep theme="outline" size="18" fill="#fff" :strokeWidth="4"/>
        <span>{{$i18n('sleepTime')}}</span>
      </div>
      <div class="setting-value">
        <el-slider v-model="sleepTime" class="slider" :min="1" :max="60" @input="goToSleepMinutesChange" size="small" input-size="small"></el-slider>
      </div>
    </div>
    <div class="app-config">
      <div class="setting-title">
        <easy theme="outline" size="20" fill="#fff" :strokeWidth="4"/>
        <span>{{$i18n('simpleMode')}}</span>
      </div>
       <div class="setting-value">
         <el-switch v-model="simpleMode" @change="toggleSimpleMode"/>
       </div>
    </div>
    <div class="app-config">
      <div class="setting-title">
        <translate theme="outline" size="20" fill="#fff" :strokeWidth="4"/>
        <span>{{$i18n('switchLanguage')}}</span>
      </div>
       <div class="setting-value">
           <el-select v-model="language" filterable placeholder="Select" @change="selectLanguage">
            <el-option
              v-for="item in $supportLanguage()"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
       </div>
    </div>
    <div class="app-config">
      <div class="setting-title">
        <platte theme="outline" size="20" fill="#fff" :strokeWidth="4"/>
        <span>{{$i18n('primaryColor')}}</span>
      </div>
       <div class="setting-value">
         <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="selectColor"/>
       </div>
    </div>
    <a class="app-config" href="mailto:kqxianren@gmail.com">
      <div class="setting-title">
        <at-sign theme="outline" size="18" fill="#fff" :strokeWidth="4"/>
        <span>{{$i18n('feedback')}}</span>
      </div>
    </a>
  </div>
</template>

<script>

import {ElSlider, ElSwitch, ElSelect,ElColorPicker} from "element-plus"
import {ApplicationOne, AtSign, Browser, Sleep, Setting, Easy, Translate, Platte} from "@icon-park/vue-next"


export default {
  name: "SettingCom",
  components: {
    ElSlider,
    ElSwitch,
    ApplicationOne,
    // PageTemplate,
    // Moon,
    AtSign,
    Browser,
    Sleep,
    Setting,
    Easy,
    Translate,
    ElSelect,
    Platte,
    ElColorPicker,
  },
  created() {
    this.appSize = this.$store.getters.appSize
  },
  data() {
    return {
      value: 0,
      appSize: 0,
      goToSleepMinutes: 0,
      language: this.$store.getters.language,
      color: this.$store.getters.primaryColor,
      predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577',
      ]
    }
  },
  computed: {
    showComponent() {
      return this.$store.getters.showComponents
    },
    darkModel() {
      return this.$store.getters.darkModel
    },
    newTabOpenApp() {
      return this.$store.getters.newTabOpenApp
    },
    simpleMode() {
      return this.$store.getters.simpleMode
    },
    sleepTime() {
      return this.$store.getters.goToSleepMinutes
    }
  },
  methods: {
    appSizeChange(val) {
      this.$store.commit('updateAppSize', val)
    },
    toggleComponent(val) {
      this.$store.commit('setShowComponent', val)
    },
    toggleDarkModel(val) {
      this.$store.commit('setDarkModel', val)
      // this.$store.commit('closeDrawer')
      // window.location.reload()
    },
    toggleSimpleMode(val) {
      this.$store.commit('setSimpleMode', val)
    },
    toggleNewTabOpenApp(val) {
      this.$store.commit('setOpenAppModel', val)
    },
    goToSleepMinutesChange(val) {
      this.$store.commit('setGoToSleepMinutesTime', val)
    },
    selectLanguage(val) {
      this.$switchLanguage(val)
      this.$store.commit('setLanguage', val)
    },
    selectColor(val) {
      this.$switchLanguage(val)
      this.$store.commit('setPrimaryColor', val)
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
    box-shadow: -1px -1px 10px white;
  }
  .title {
    /* padding-top: 10px; */
    width: 100%;
    height: 70px;
    text-align: left;
    font-weight: bolder;
    font-size: 25px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    align-content: center;

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
    text-decoration: none;
  }
  .setting-title {
    color: rgba(0, 0, 0, 0.56);
    font-weight: normal;
    font-size: 12.5px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    flex: 5;
    justify-self: flex-start;
  }
  .setting-app span, .setting-title span {
    margin-left: 7px;
  }
  .setting-value {
    flex: 7;
    padding-right:1vw;
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
  :deep(.setting-title .i-icon) {
    width: 25px;
    height: 25px;
    border-radius: 16%;
    background: #0288D1;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
  }
</style>