<template>
  <div class="friday-container">
    <div v-if="leftDay !== 0" class="friday-container">
      <div class="friday-title">
        今天是周五吗
      </div>
      <div class="friday-countdown">
        不是, 还有{{leftDay}}天
      </div>
    </div>
    <div v-else class="celebrate">
      <div>
        <img src="../../../assets/icon/celebrate.png" style="width: 100%; height: 100%">
      </div>
      <div class="celebrate-title">
        周五啦
      </div>
      <div>
        <img src="../../../assets/icon/celebrate_r.png" style="width: 100%; height: 100%">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FridayCom",
  data() {
    return {
      week: 0,
    }
  },
  created() {
    this.week = (new Date()).getDay()
    setInterval(this.refreshTime, 1000)
  },
  computed: {
    leftDay() {
      const friday = 5
      if (this.week <= friday) {
        return friday - this.week
      } else {
        return 7 - (this.week - friday)
      }
    }
  },
  methods: {
    refreshTime() {
      let now = new Date()
      this.week = now.getDay()
    }
  }
}
</script>

<style scoped>
  .friday-container {
    backdrop-filter: blur(7px);
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(27, 139, 128, 0.3);
  }
  .friday-title {
    height: 18%;
    font-size: 12px;
    margin-top: 2%;
    color: white;
  }
  .friday-countdown {
    height: 80%;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: rgba(255, 255, 255, 0.87);
  }
  .celebrate {
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: space-between;
  }
  .celebrate-title {
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bolder;
    color: rgba(255, 255, 255, 0.87);
  }
</style>