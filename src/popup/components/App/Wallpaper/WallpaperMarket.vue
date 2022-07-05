<template>
  <div class="wallpaper-market-app">
    <div class="wallpaper-header">
      <div class="wallpaper-searcher">
        <Back v-if="fromWallpaper"></Back>
        <form @submit="search" class="search-form">
          <input placeholder="输入关键词"
              v-model="keyword"
              class="search-input"/>
        </form>
      </div>
      <div style="flex: 1;"></div>
      <div class="wallpaper-origin">
        <div v-for="(type) in cateList" :key="type.type" :class="originClass(type.type)" @click="selectOrigin(type)">
          <div class="website-icon">
            <img :src="type.icon" alt=""/>
          </div>
          <!-- <span class="website-title">{{type.type}}</span> -->
        </div>
      </div>
    </div>
    <div class="wallpaper-market">
      <div class="wallpaper-category">
        <div :class="'cate ' + (selectedCateId === category.id ? 'active' : '')"
             v-for="category in originTag"
             :key="category.id"
             @click="selectCate(category)"
        >
          {{category.title}}
        </div>
      </div>
      <ul v-infinite-scroll="loadingData" 
        :infinite-scroll-disabled="noMoreData || inLoadingData"
        infinite-scroll-immediate="false"
        class="wallpaper-list">
        <li class="wallpaper-item no-need-dark"
             v-for="(wallpaper, index) in wallpapers"
             :key="wallpaper"
             @mouseenter="hover(index)"
             @mouseleave="leave"
             :style="'background-image: url(' + wallpaper.thumb + ')'"
        >
          <span class="copyright">{{wallpaper.copyright}}</span>
          <loading-inline :scale="0.5" v-if="settingBGImgIndex === index"/>
          <div class="hover" v-else-if="index === hoverIndex && settingBGImgIndex < 0">
            <div class="set-button" @click="setWallpaper(wallpaper.url, index)">
              <img src="../../../../assets/icon/done_fill.png" style="width: 100%; height: 100%"/>
            </div>
          </div>
        </li>
        <div style="width:100%; position: relative;" v-if="inLoadingData">
          <loading-inline :scale="0.7"/>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import data from "./wallpaper_list"
import Back from "@/popup/components/common/Back";
import api from "@/popup/components/api/wallpaper"
// import Loading from "@/popup/components/common/Loading";
import LoadingInline from "@/popup/components/common/LoadingInline"


const defaultActiveCateID = data.categoryList[0]

export default {
  name: "WallpaperMarket",
  components:{
    Back,
    // Loading,
    LoadingInline,
  },
  created() {
    let that = this
    api.getWWallpaperTag((tags) => {
      that.cateList = tags
      if (tags.length > 0) {
        that.selectOrigin(tags[0])
      }
    })
  },
  mounted() {
    // this.selectCate(defaultActiveCateID)
  },
  computed: {
    originClass() {
      let that = this
      return function (origin) {
        let cls = "wallpaper-website"
        if (origin === that.origin) {
          cls += " active"
        }
        return cls
      }
    },
    originTag() {
      for (let i = 0 ; i < this.cateList.length; i ++) {
        let item = this.cateList[i]
        if (item.type === this.origin) {
          return  item.tags
        }
      }
      return []
    }
  },
  methods: {
    search(e) {
      e.preventDefault()
      this.page = 1
      this.offset = 0
      this.noMoreData = false
      this.requestToSearchWallpaper(this.origin, 0, this.keyword, this.page, this.limit)
    },
    hover(index) {
      this.hoverIndex = index
    },
    leave() {
      this.hoverIndex = -1
    },
    selectOrigin(origin) {
      this.origin = origin.type
      let defaultCate = origin.tags[0]
      this.selectCate(defaultCate)
    },
    selectCate(category) {
      this.selectedCateId = category.id
      this.page = 1
      this.wallpapers = []
      this.noMoreData = false
      this.requestToSearchWallpaper(this.origin, this.selectedCateId, this.keyword, this.page, this.limit)
    },
    requestToSearchWallpaper(origin, selectedCateId, keyword, page, limit) {
      let that = this
       api.getWallpaperByOriginCate(origin, selectedCateId, keyword, page, limit, (data) => {
        that.wallpapers = data
      })
    },
    setWallpaper(src, index) {
      let img = new Image()
      img.src = src
      let that = this
      that.settingBGImgIndex = index
      img.onload = function () {
        that.$store.commit('setWallpaper', src)
        that.settingBGImgIndex = -1
      }
    },
    loadingData() {
      let that = this
      that.page ++
      that.inLoadingData = true
      api.getWallpaperByOriginCate(this.origin, this.selectedCateId, this.keyword, this.page, this.limit, (data) => {
        data.forEach(w => {
          that.wallpapers.push(w)
        })
        if (data.length === 0) {
          that.noMoreData = true
        }
        that.inLoadingData = false
      })
    },
  },
  data() {
    return {
      noMoreData: false,
      settingBGImgIndex: -1,
      inLoadingData: false,
      origin: "",
      hoverIndex: -1,
      wallpapers: [],
      keyword: '',
      offset: 0,
      limit: 34,
      cateList: [],
      selectedCateId: defaultActiveCateID.id,
      fromWallpaper: this.$route.params.fromWallpaper,
    }
  }
}
</script>

<style scoped>
  .wallpaper-market-app {
    width: 100%;
    height: 100%;
  }
  .wallpaper-header {
    width: 100%;
    height: 10%;
    margin: 4% auto 2% auto;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .wallpaper-searcher {
    flex: 5;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-around;
  }
  .wallpaper-origin {
    flex: 5;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
  }
  .search-form {
    height: 37px;
    width: 85%;
  }
  .wallpaper-market {
    width: 100%;
    height: 80%;
    display: flex;
  }
  .wallpaper-category {
    flex: 4;
    width: 100%;
    height: 100%;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin-top: 7px;
  }
  .wallpaper-category::-webkit-scrollbar{
    display: none;
  }
  .cate {
    width: 38%;
    height: 34px;
    line-height: 34px;
    margin-left: 6%;
    margin-right: 6%;
    background: rgba(81, 81, 81, 0.74);
    border-radius: 2px;
    margin-bottom: 10px;
    font-size: 13px;
    color: white;
  }
  .wallpaper-list {
    display: flex;
    justify-items: left;
    flex-wrap: wrap;
    padding-bottom: 10px;
    align-content: flex-start;
    justify-content: space-between;
    list-style: none;
    overflow-y: scroll;
    flex: 11;
    padding-right: 1vw;
    width: 50%;
    height: 100%;
    position: relative;
  }
  .wallpaper-item {
    position: relative;
    width: 17vw;
    height: 10vw;
    margin-bottom: 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 7px;
  }
  .hover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(1px);
  }
  .set-button {
    width: 34px;
    height: 34px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .copyright {
    text-align: right;
    float: right;
    color: white;
    backdrop-filter: blur(1px);
    font-size: 12px;
  }
  .search-input {
    display: block;
    outline: none;
    border: none;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.22);
    height: 95%;
    width: 100%;
    color: #777;
    padding-left: 5%;
    border-radius: 7px;
  }
  .search-input::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
  .wallpaper-website {
    display: flex;
    justify-items: center;
    align-items: center;
    justify-content: space-around;
    border-radius: 7px;
    margin-left: 2%;
    color: white;
    background: rgba(0, 0, 0, 0.55);
    height: 37px;
    width: 52px;
  }
  .website-icon {
    /* overflow: hidden; */
    /* flex: 1; */
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
  }
  .website-icon img {
    width: 25px;
    height: 25px;
    border-radius: 16%;
    /* width: 70%;
    height: 70%; */
  }
</style>