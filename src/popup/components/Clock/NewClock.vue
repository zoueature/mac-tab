<template>
  <div class="clock">
    <div class="test"
         v-for="(_, index) in secNodes"
         :key="index"
         :style="'transform: rotate(' + index * 6 + 'deg)'">
      <div></div>
    </div>
    <div v-for="(_, index) in ptrs"
         :key="index"
    >
      <div class="pointer"
           v-if="Math.abs(index * 6 + 270 - sec) <= 10"
           :style="'transform: rotate(' + (index * 6 + 270) + 'deg)'">
        <div></div>
      </div>
    </div>
    <div class="time">
      <div class="hour">
        {{nowTime.hour}}{{nowTime.dot}}{{nowTime.min}}
      </div>
      <div class="date">
        {{nowTime.month}}-{{nowTime.day}}
        <span>周{{weekName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
const weekMap = [
  '日',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
]
export default {
  name: "NewClock",
  created() {
    this.refreshTime()
    setInterval(this.refreshTime, 1000)
  },
  computed: {
    weekName() {
      return weekMap[this.nowTime.week]
    }
  },
  data() {
    return {
      secNodes: Array(60),
      ptrs: Array(60),
      sec: 0,
      nowTime: {
        year: '',
        month: '',
        day: '',
        hour: '',
        dot: '',
        min: '',
        sec: '',
        week: '',
      },
      startRotate: '',
      endRotate: '',
    }
  },
  methods: {
    refreshTime() {
      let now = new Date()
      this.nowTime = {
        year: now.getFullYear(),
        month: (now.getMonth()+1) >=10 ? (now.getMonth()+1) : '0' + (now.getMonth()+1) ,
        day: (now.getDate()) >=10 ? (now.getDate()) : '0' + (now.getDate()),
        hour: (now.getHours()) >=10 ? (now.getHours()) : '0' + (now.getHours()),
        dot: now.getSeconds() % 2 === 0 ? ' ' : ':',
        min: (now.getMinutes()) >=10 ? (now.getMinutes()) : '0' + (now.getMinutes()),
        sec: (now.getSeconds()) >=10 ? (now.getSeconds()) : '0' + (now.getSeconds()),
        week: now.getDay(),
      }
      this.sec = this.nowTime.sec * 6 % 360 + 270
      // this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
  .clock {
    margin-left: 10%;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    #background: rgba(231, 218, 218, 0.88);
    box-shadow: 3px 4px 16px rgba(31, 31, 31, 0.35);
    backdrop-filter: blur(10px);
  }
  .test {
    transform-origin: left;
    position: absolute;
    width: 50%;
    height: 3px;
    margin: auto;
    left: 50%;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .test div {
    width: 2%;
    height: 100%;
    position: absolute;
    right: 5%;
    border-radius: 100%;
    background: #00c3ff;
  }
  .pointer {
    width: 50%;
    height: 7px;
    position: absolute;
    margin: auto;
    left: 50%;
    right: 0;
    top: 0;
    bottom: 0;
    transform-origin: left;
  }
  .pointer div {
    width: 20%;
    height: 100%;
    /*border-radius: 100%;*/
    border-radius: 0 50% 50% 0;
    position: absolute;
    right: 0;
    animation: ss 3s linear;
  }
  @keyframes ss {
    from {
      opacity: 1;
      background: #008cff;
    }
    to {
      opacity: 0;
      background: #464d46;
    }
  }
  .time {
    width: 80%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    box-shadow: 2px 2px 10px rgba(31, 31, 31, 0.34);
  }
  .hour {
    width: 100%;
    font-size: 34px;
    font-weight: bolder;
    color: white;
    vertical-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .date {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 150%);
    font-size: 12px;
    font-weight: bold;
    color: white;
  }
</style>