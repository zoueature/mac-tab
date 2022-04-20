<template>
  <div class="setting-app">
    <div class="title">设置</div>
    <div class="app-size-slider">
      <p class="setting-title">APP大小</p>
      <el-slider v-model="appSize" class="slider" :min="50" :max="80" @input="appSizeChange"></el-slider>
    </div>
  </div>
</template>

<script>

export default {
  name: "SettingCom",
  components: {
  },
  created() {
    this.appSize = this.$store.getters.appSize
  },
  data() {
    return {
      value: 0,
      appSize: 0,
    }
  },
  computed: {
    // appSize() {
    //  return this.$store.getters.appSize
    // }
  },
  methods: {
    appSizeChange(val) {
      this.$store.commit('updateAppSize', val)
      console.log(this.$store.getters.appSize)
    }
  }
}
</script>

<style scoped>
  .setting-app {
    padding-left: 10%;
    width: 90%;
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
    font-weight: bold;
    font-size: 14px;
  }
  .slider {
    margin: 0 auto;
    width: 100%;
    height: 10px;
  }
  .app-size-slider {
    width: 90%;
    height: 10px;
    text-align: left;
  ;
  }
</style>