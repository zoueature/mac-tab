<template>
  <div class="clock">
    <div class="time-shower">
      {{time}}
      <span class="second-shower">{{second}}</span>
    </div>
    <div class="date-shower">
      {{date}}
    </div>
  </div>
</template>

<script>

import dateFormat from "dateformat";

export default {
  name: "NumberClock",
  mounted() {
    setInterval(() => {
      this.refreshTime()
    }, 100)
  },
  created() {
    this.refreshTime()
  },
  methods: {
    refreshTime() {
      let now = new Date()
      this.time = dateFormat(now, 'HH:MM')
      this.date = dateFormat(now, 'mm-dd')
      this.second = dateFormat(now, 'ss')
      this.weekday = dateFormat(now, 'dddd')
    }
  },
  data() {
    return {
      second: 0,
      time: '',
      date: '',
      weekday: ''
    }
  }
}
</script>

<style scoped>
  .clock {
    width: 80%;
    margin: 0 auto;
    height: 90px;
    position: relative;
  }
  .time-shower {
    width: 60%;
    height: 70%;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 16px;
    /*bottom: 0;*/
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 52px;
    font-weight: bolder;
    color: #222222;
  }
  .date-shower {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .second-shower {
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    top: 0;
    right: -10px;
  }
  .date-shower {
    font-size: 16px;
    color: #222222;
    font-weight: bold;
  }
</style>