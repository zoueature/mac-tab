<template>
  <div class="news-drawer-container">
<!--    <div class="header-container">-->
<!--      <div class="news-header">-->
<!--        <div class="news-tab"><span>百度热搜</span></div>-->
<!--        <div class="news-tab">知乎热榜</div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="news">
      <div class="news-item"
           v-for="(news, index) in newsList"
           :key="index"
           @click="gotoDetail(news.detail)"
      >
        <div class="news-img">
          <div class="news-seq" :style="'background:' + 'rgba('+(255 - 2 * index) + ', '+(3 * index)+', '+ (1 * index) +')'">{{index + 1}}</div>
          <img :src="news.img" alt="">
        </div>
        <div class="news-content">
          <div class="news-title">
            {{news.title}}
          </div>
          <div class="news-desc">
            {{desc(news.desc)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/popup/components/api/news";

export default {
  name: "NewsDrawer",
  computed: {
    desc() {
      return function (desc) {
        if (desc.length > 30) {
          return desc.substring(0, 37)
        }
        return desc.substring(0, 30)
      }
    }
  },
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
    api.getNews("zhihu", (data) => {
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
  methods: {
    gotoDetail(detailURL) {
      window.open(detailURL, '_blank');
    }
  },
  data() {
    return {
      newsList: []
    }
  }
}
</script>

<style scoped>
  .news-drawer-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    box-shadow: -0.5px 0 16px white;
    background: rgb(243, 242, 242);
    position: relative;
  }
  div::-webkit-scrollbar {
    display: none;
  }
  .news-item:first-child {
    margin-top: 16px;
  }
  .news-item {
    width: 95%;
    height: 88px;
    margin: 0 auto;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 16px;
  }
  .news-img {
    width: 110px;
    height: 65px;
    float: left;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
  }
  .news-seq {
    width: 30px;
    height: 16px;
    background: rgba(255, 0, 0, 0.93);
    position: absolute;
    font-size: 12px;
    top: 0;
    color: white;
    border-radius: 0 0 7px 0;
  }
  .news-content {
    width: 230px;
    margin-left: 10px;
    float: left;
    text-align: left;
  }
  .news-img img {
    width: 100%;
    height: 100%;
  }
  .news-title {
    width: 100%;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(12, 16, 33, 0.84);
    overflow: hidden;
    font-weight: bolder;
    margin-bottom: 10px;
  }
  .news-desc {
    width: 100%;
    height: 50px;
    font-size: 12px;
    color: rgba(12, 16, 33, 0.54);
    overflow: hidden;
    text-overflow: ellipsis;
    max-lines: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    display: -webkit-box;
  }
  .header-container {
    width: 100%;
    height: 100px;
    background: rebeccapurple;
    overflow-x: scroll;
  }
  .news-header {
    width:100%;
    text-align: left;
    height: 100px;
    /*background: rebeccapurple;*/
    position: fixed;
    z-index: 10;
    font-size: 25px;
    color: white;
  }
  .news {
    margin-top: 25px;
  }
  .news-tab {
    color: blue;
  }
</style>