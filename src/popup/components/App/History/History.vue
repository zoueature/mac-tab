<template>
  <div class="history-app">
    <div class="history-date">
      <div v-for="date in historyList" :key="date.date" :class="'date-item ' + (selectedDate === date.date ? 'active': '') "
           @click="selectDate(date.date)">
        {{date.date}}
      </div>
    </div>
    <div class="history-list">
      <a v-for="history in selectedHistory" :key="history.id"
         class="history-item"
         :href="history.url"
         target="_blank"
      >
        <div class="history-icon">
          <img :src="history.icon" @error="setDefault(history)"/>
        </div>
        <div class="history-name">
          {{history.title === "" ? history.url : history.title}}
        </div>
        <div class="history-time">
          {{history.time}}
        </div>
      </a>
    </div>
  </div>
</template>

<script>

import dateFormat from "dateformat";

const mostHistoryNum = 25
let dateIndex = {}
let most = []

/* eslint-disable */
export default {
  name: "HistoryCom",
  created() {
    const oneDayMillSec = 24 * 60 * 60 * 1000
    let now = new Date().getTime()
    let tomorrow = Date.parse(dateFormat(new Date(now + oneDayMillSec), "yyyy-mm-dd"))
    let before10Day = Date.parse(dateFormat(new Date(now - 30 * oneDayMillSec), "yyyy-mm-dd"))
    this.startTime = before10Day
    this.endTime = tomorrow
    this.loadHistory()
  },
  computed: {
    selectedHistory() {
      let index = dateIndex[this.selectedDate]
      return this.historyList[index]?.list ?? []
    }
  },
  methods:{
    selectDate(date) {
      this.selectedDate = date
    },
    setDefault(history) {
      history.icon = require('@/assets/images/logo.png')
    },
    loadHistory() {
      let that = this
      chrome.runtime.sendMessage({do: "getHistory", param: {start: this.startTime, end: this.endTime}}, function(response) {
        // response
        //   []{
        //     id: "2526",
        //     lastVisitTime: 1650629782668.347,
        //     title: "chrome.runtime.sendMessage 回调函数参数为undefined_景影随形的博客-CSDN博客",
        //     typedCount: 0,
        //     url: "https://blog.csdn.net/anjingshen/article/details/75579521",
        //     visitCount: 1,
        //   },
        let result = [
          {
            date: "最近常用站",
            list: [],
          }
        ]
        dateIndex = {
          "最近常用站": 0,
        }
        response.forEach((v) => {
          let needSortMost = false
          if (most.length < mostHistoryNum) {
            most.push(v)
            needSortMost = true
          } else if (most[most.length-1].visitCount < v.visitCount) {
            most[most.length-1] = v
            needSortMost = true
          }
          if (needSortMost) {
            most.sort((v1, v2) => {
              return v2.visitCount - v1.visitCount
            })
          }
          let dd = new Date(Math.ceil(v.lastVisitTime))
          let date = dateFormat(dd, 'isoDate')
          let time = dateFormat(dd, 'isoTime')
          v.time = time
          if (dateIndex[date] === undefined) {
            dateIndex[date] = result.length
          }
          v.icon = "chrome://favicon2/?size=16&scale_factor=1x&page_url="
          v.icon = "chrome://favicon2/?size=32&scale_factor=4x&page_url=" + encodeURIComponent(v.url)
          // let url = new URL(v.url)
          // v.icon = url.origin + "/favicon.ico"
          let index = dateIndex[date]
          if (result[index] === undefined) {
            result[index] = {
              date: date,
              list: [
                v
              ]
            }
          } else {
            result[index].list.push(v)
          }
        })
        result[0].list = most
        if (that.historyList.length === 0) {
          that.historyList = result
        } else  {
          result.forEach((v, i) => {
            if (i !== 0) {
              // 常用站点， 不附加在后面
              that.historyList.push(v)
            }
          })
          // 更新常用站点数据
          that.historyList[0].list = most
        }
      })
    }
  },
  data() {
    return {
      historyList: [],
      selectedDate: '最近常用站',
      startTime: 0,
      endTime: 0,
      // defaultImg: 'this.src="' + require('@/assets/images/logo.png') + '"',
    }
  }
}
</script>

<style scoped>
  .history-app {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .history-date {
    flex: 2;
    overflow: hidden;
    white-space: nowrap;
    /*border-right: 1px solid rgba(0, 0, 0, 0.07);*/
    margin-top: 5%;
    overflow-y: scroll;
  }
  .history-list {
    flex: 8;
    overflow: hidden;
    overflow-y: scroll;
    margin-top: 5%;
  }
  /* .history-list::-webkit-scrollbar { */
    /*width: 2px;*/
    /*display: none;*/
  /* } */
  .date-item {
    width: 90%;
    padding-left: 10%;
    margin: 10px auto 0 auto;
    text-align: left;
    font-size: 15px;
    color: #282828;
    overflow: hidden;
    height: 45px;
    display: flex;
    align-content: center;
    align-items: center;
  }
  .history-item {
    display: flex;
    justify-content: space-evenly;
    margin-top: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    padding-bottom: 10px;
  }
  .history-icon {
    overflow: hidden;
    border-radius: 2px;
    flex: 0.5;
    justify-content: flex-start;
    padding-left: 10px;
    display: flex;
    align-content: center;
    align-items: center;
  }
  .history-icon img {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    display: block;
  }
  .history-name {
    flex: 7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    display: flex;
    align-content: center;
    align-items: center;
  }
  .history-time {
    flex: 1;
    color: #6c6c6c;
    font-size: 13px;
    text-align: left;
  }
  a {
    text-decoration: none;
    color: #2c2c2c;
  }
  a:visited {
    color: #2c2c2c;
  }
</style>