<template>
  <div class="news-widget">
    <div class="widget-title" @click="openNews">
      热点事件
    </div>
    <div v-for="(news, index) in newsList.slice(0, 25)" :key="index" @click.stop="gotoNews(news.detail)">
      <div class="news-item">{{(index+1 < 10 ? '0' + (index+1) : index+1) + ":   " + news.title}}</div>
    </div>
  </div>
</template>

<script>

import api from "@/popup/components/api/news"

export default {
  name: "NewsWidget",
  beforeCreate() {
    let that = this
    api.getNews("baidu", (data) => {
      data.forEach(v=>{
        that.newsList.push({
          img: v.img,
          title: v.title,
          desc: v.desc,
          detail: v.detailURL,
        })
      })
    })
  },
  data() {
    return {
      newsList: []
    }
  },
  methods: {
    openNews() {
      this.$router.replace('news')
      this.$store.commit('openDrawer')
    },
    gotoNews(detailURL) {
      window.open(detailURL, '_blank');
    }
  }
}
</script>

<style scoped>
  .news-widget {
    width: 100%;
    height: 100%;
    background: #02aee3;
    overflow-y: scroll;
  }
  .widget-title {
    width: 90%;
    margin: 0 auto;
    font-size: 16px;
    text-align: left;
    padding-top: 7px;
    padding-left: 7px;
    font-weight: bold;
    /*color: rgba(255, 255, 255, 0.88);*/
    color: white;
  }
  .news-item {
    text-align: left;
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    font-size: 13px;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-top: 5px;
    padding-bottom: 5px;
    color: rgba(0, 0, 0, 0.52);
    display: flex;
    align-items: center;
    align-content: center;
  }
  .news-item:hover {
    background: rgba(255, 255, 255, 0.52);
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>