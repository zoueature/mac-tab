<template>
  <div class="clock no-need-dark">
    <div class="time-shower ">
      {{time}}
      <span class="second-shower">{{second}}</span>
      <div class="date-shower">
      {{date}}
      </div>
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
    /* width: 80%; */
    margin: 0 auto;
    height: 97px;
    position: relative;
    padding-bottom: 16px;
  }
  .time-shower {
    margin: auto;
    width: auto;
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 61px;
    font-weight: bolder;
    color: white;
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
    right: -18px;
  }
  .date-shower {
    font-size: 16px;
    color: white;
    font-weight: bold;
    position: absolute;
    bottom: -16px;
  }
</style>