<template>
  <div class="friday-container">
    <div v-if="leftDay !== 0 && leftDay < 5" class="friday-container">
      <div class="friday-title">
        今天是周五吗
      </div>
      <div class="friday-countdown">
        不是<br/>还有{{leftDay}}天
      </div>
    </div>
    <div v-else class="celebrate">
        <img src="../../../assets/images/sport.png" style="height: 100%">
      <div class="celebrate-title">
        {{leftDay === 0 ? '周五啦' : '周末快乐'}}
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
    background: #4FC3F7;
  }
  .friday-title {
    height: 18%;
    padding-top: 2%;
    font-size: 0.7vw;
    color: white;
    font-weight: bolder;
  }
  .friday-countdown {
    height: 80%;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6vw;
    font-weight: bolder;
    color: rgba(255, 255, 255, 0.87);
  }
  .celebrate {
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    position: relative;
  }
  .celebrate-title {
    font-size: 1.6vw;
    font-weight: bolder;
    color: rgba(255, 255, 255, 0.87);
    position: absolute;
  }
  .celebrate-icon {
    width: 16%;
    height: 52%;
  }
</style>