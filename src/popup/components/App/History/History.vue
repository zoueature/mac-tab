<template>
  <div class="history-app">
    <div class="history-date">
      <div v-for="date in historyList" :key="date.date" :class="'date-item ' + (selectedDate === date.date ? 'active': '') "
           @click="selectDate(date.date)">
        {{date.date}}
      </div>
    </div>
    <div class="history-list">
      <a v-for="history in selectedHistory.list" :key="history.id"
         class="history-item"
         :href="history.url"
         target="_blank"
      >
        <div class="history-icon">
          <img :src="history.icon" @error="setDefault(history)"/>
        </div>
        <div class="history-name">
          {{history.title}}
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

const mostHistoryNum = 10
let dateIndex = {}

/* eslint-disable */
export default {
  name: "HistoryCom",
  created() {
    let that = this
    chrome.runtime.sendMessage({do: "getHistory"}, function(response) {
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
          date: "常用站点",
          list: [],
        }
      ]
      dateIndex = {
        "常用站点": 0,
      }
      let most = []
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
        v.icon = "chrome://favicon/size/32@5x/" + v.url
        v.icon = "chrome://favicon2/?size=32&scale_factor=4x&page_url=" + encodeURIComponent(v.url)
        let url = new URL(v.url)
        v.icon = url.origin + "/favicon.ico"
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
      that.historyList = result
    })
  },
  computed: {
    selectedHistory() {
      let index = dateIndex[this.selectedDate]
      return this.historyList[index]
    }
  },
  methods:{
    selectDate(date) {
      this.selectedDate = date
    },
    setDefault(history) {
      history.icon = require('@/assets/images/logo.png')
    }
  },
  data() {
    return {
      historyList: [],
      selectedDate: '常用站点',
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
    line-height: 34px;
    border-right: 1px solid rgba(0, 0, 0, 0.07);
  }
  .history-list {
    flex: 8;
    overflow: hidden;
    overflow-y: scroll;
  }
  .history-list::-webkit-scrollbar {
    /*width: 2px;*/
    /*display: none;*/
  }
  .date-item {
    width: 79%;
    margin: 10px auto 0 auto;
    text-align: left;
    font-size: 17px;
    overflow: hidden;
    height: 34px;
    line-height: 34px;
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
    justify-content: center;
    padding-left: 10px;
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