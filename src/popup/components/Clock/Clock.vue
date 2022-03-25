<template>
  <div class="clock">
    <div class="time">
      <div class="hour">
        {{nowTime.hour}}{{nowTime.dot}}{{nowTime.min}}
      </div>
      <div class="date">
        {{nowTime.month}}-{{nowTime.day}}
        <span>周{{weekName}}</span>
      </div>
    </div>
    <div class="process">
      <div class="node">

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
  name: "ClockCom",
  props: [
    'size'
  ],
  data() {
    return {
      timer: null,
      clockSize: 0,
      nodeSize: 16,
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
  computed: {
    date() {
      return this.nowTime.year + '-' + this.nowTime.month + '-' + this.nowTime.day + ' '
    },
    time() {
      return this.nowTime.hour + this.nowTime.dot + this.nowTime.min
    },
    clockSizePx() {
      return (+this.clockSize + this.nodeSize) + 'px'
    },
    nodeSizePx() {
      return this.nodeSize + 'px'
    },
    nodeCenterSize() {
      return Math.ceil((this.clockSize - this.nodeSize) / 2) + 'px'
    },
    showTimeSize() {
      return (this.clockSize - this.nodeSize) + 'px'
    },
    weekName() {
      return weekMap[this.nowTime.week]
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
        dot: now.getSeconds() % 2 === 0 ? ' ' : ':',
        min: (now.getMinutes()) >=10 ? (now.getMinutes()) : '0' + (now.getMinutes()),
        sec: (now.getSeconds()) >=10 ? (now.getSeconds()) : '0' + (now.getSeconds()),
        week: now.getDay(),
      }
      this.$forceUpdate()
    },
  },
  created() {
    this.clockSize = this.size
    this.refreshTime()
    this.startRotate = Math.ceil(this.nowTime.sec / 60 * 360) + 'deg'
    this.endRotate = Math.ceil((this.nowTime.sec / 60 + 1) * 360) + 'deg'
    this.timer = setInterval(
      this.refreshTime,
        1000,
    )
  }
}
</script>

<style scoped>
.clock {
  position: relative;
}
.time {
  width: v-bind(showTimeSize) ;
  height: v-bind(showTimeSize);
  left: v-bind(nodeSizePx);
  top: v-bind(nodeSizePx);
  border-radius: v-bind(showTimeSize);
  overflow: hidden;
  background: rgba(231, 218, 218, 0.66);
  box-shadow: 3px 4px 16px rgba(31, 31, 31, 0.35);
  position: absolute;
  z-index: 10;
}
.hour {
  font-size: 37px;
  font-weight: bold;
  color: white;
  vertical-align: center;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.date {
  transform: translate(0, 210%);
  font-size: 16px;
}

.process {
  width: v-bind(clockSizePx);
  height: v-bind(clockSizePx);
  z-index: -1;
  overflow: hidden;
  animation: recycle 60s linear infinite;
}
.node {
  width: v-bind(nodeSizePx);
  height: v-bind(nodeSizePx);
  background: black;
  position: absolute;
  z-index: 10;
  left: v-bind(nodeCenterSize);
  top: 0;
  border-radius: v-bind(nodeSizePx);
}
@keyframes recycle {
  from {
    transform: rotate(v-bind(startRotate));
  }
  to {
    transform: rotate(v-bind(endRotate));
  }
}
</style>