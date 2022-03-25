<template>
  <div class="clock">
<!--    <div class="time">-->
<!--      <div class="hour">-->
<!--        {{nowTime.hour}}-->
<!--      </div>-->
<!--      <div class="dot" :style="'color: ' + nowTime.dot">-->
<!--        :-->
<!--      </div>-->
<!--      <div class="min">-->
<!--        {{nowTime.min}}-->
<!--      </div>-->
<!--    </div>-->
    <div class="process">
      <div class="node">

      </div>
    </div>
  </div>
</template>

<script>

const dotColor = [
    'red',
    'green',
    'white',
    'black',
    'blue',
    'purple',
    'blue',
]
export default {
  name: "ClockCom",
  props: [
    'size'
  ],
  data() {
    return {
      timer: null,
      clockSize: '160px',
      nowTime: {
        year: '',
        month: '',
        day: '',
        hour: '',
        dot: '',
        min: '',
        sec: '',
      },
    }
  },
  computed: {
    date() {
      return this.nowTime.year + '-' + this.nowTime.month + '-' + this.nowTime.day + ' '
    },
    time() {
      return this.nowTime.hour + this.nowTime.dot + this.nowTime.min
    }
  },
  methods: {
    refreshTime() {
      let now = new Date()
      console.log(123)
      this.nowTime = {
        year: now.getFullYear(),
        month: (now.getMonth()+1) >=10 ? (now.getMonth()+1) : '0' + (now.getMonth()+1) ,
        day: (now.getDate()) >=10 ? (now.getDate()) : '0' + (now.getDate()),
        hour: (now.getHours()) >=10 ? (now.getHours()) : '0' + (now.getHours()),
        dot: dotColor[now.getSeconds() % dotColor.length],
        min: (now.getMinutes()) >=10 ? (now.getMinutes()) : '0' + (now.getMinutes()),
        sec: (now.getSeconds()) >=10 ? (now.getSeconds()) : '0' + (now.getSeconds()),
      }
      this.$forceUpdate()
    },
  },
  created() {
    this.refreshTime()
    this.timer = setInterval(
      this.refreshTime,
        1000,
    )
  }
}
</script>

<style scoped>
.clock, .process {
  width: v-bind(clockSize);
  height: v-bind(clockSize);
  border-radius: v-bind(clockSize);
  overflow: hidden;
  background: blue;
  border: 1px solid green;
}
.process {
  z-index: -1;
  position: absolute;
  top: 0;
}

.node {
  width: 10px;
  height: 10px;
  background: black;
  z-index: 10;
}

.time {
  font-size: 43px;
  color: white;
  font-weight: bold;
}
.dot {
  font-size: 45px;
  line-height: 30px;
}
.hour {

}
.min {

}
</style>