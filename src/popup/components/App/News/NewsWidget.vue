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
export default {
  name: "NewsWidget",
  beforeCreate() {
    this.$http.get("https://top.baidu.com/board?tab=realtime").then(result => {
      if (result.status === 200) {
        let rexp = /<!--s-data:(.*?)-->/
        let content = rexp.exec(result.data)[1]
        rexp = /\/"/
        content.replace(rexp, '"')
        let data = JSON.parse(content)
        let hots = data.data.cards[0].content
        hots.forEach(v=>{
          this.newsList.push({
            img: v.img,
            title: v.word,
            desc: v.desc,
            detail: v.rawUrl,
          })
        })
      }
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
    background: #00a6ff;
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
    color: rgba(255, 255, 255, 0.88);
  }
  .news-item {
    text-align: left;
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-top: 7px;
    color: rgba(0, 0, 0, 0.7);
  }
</style>