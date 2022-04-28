<template>
  <div class="wallpaper-market-app">
    <div class="wallpaper-header">
      <Back></Back>
      <input placeholder="输入关键词"
             v-model="keyword"
             @submit="search(50)"
             @keyup.enter="search(50)"
             class="search-input"
      >
      <div class="collection"></div>
    </div>
    <div class="wallpaper-market">
      <div class="wallpaper-category">
        <div :class="'cate ' + (selectedCateId === category.id ? 'active' : '')"
             v-for="category in cateList"
             :key="category.id"
             @click="selectCate(category)"
        >
          {{category.name}}
        </div>
      </div>
      <Scroller class="wrapper"
                :data="wallpapers"
                :get-data-handler="loadingData"
      >
        <div class="wallpaper-list">
          <Loading :show="showLoading"></Loading>
          <div class="wallpaper-item"
               v-for="(wallpaper, index) in wallpapers"
               :key="wallpaper"
               @mouseenter="hover(index)"
               @mouseleave="leave"
               :style="'background-image: url(' + wallpaper.thumb + ')'"
          >
            <span class="copyright">{{wallpaper.copyright}}</span>
            <div class="hover" v-if="index === hoverIndex">
              <div class="set-button" @click="setWallpaper(wallpaper.url)">
                <img src="../../../../assets/icon/done_fill.png" style="width: 100%; height: 100%"/>
              </div>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
  </div>
</template>

<script>
import Scroller from "@/popup/components/common/Scroller";
import data from "./wallpaper_list"
import Back from "@/popup/components/common/Back";
import Loading from "@/popup/components/common/Loading";

export default {
  name: "WallpaperMarket",
  components:{
    Scroller,
    Back,
    Loading,
  },
  created() {
    console.log(123)
  },
  methods: {
    async search() {
      this.$store.commit('openLoading')
      this.offset = 0
      let newList = await this.getData(50)
      this.wallpapers = newList
      this.$store.commit('closeLoading')
    },
    hover(index) {
      this.hoverIndex = index
    },
    leave() {
      this.hoverIndex = -1
    },
    selectCate(category) {
      this.selectedCateId = category.id
      let list = this.getWallpaperListByCategory(category.tag)
      this.wallpapers = list
    },
    getWallpaperListByCategory(tag) {
      return data.wallpaperList[tag]
    },
    setWallpaper(src) {
      let img = new Image()
      img.src = src
      let that = this
      this.$store.commit('openLoading')
      img.onload = function () {
        that.$store.commit('closeLoading')
        that.$store.commit('setWallpaper', src)
      }
    },
    async loadingData() {
      this.showLoading = true
      let newList = await this.getData(this.limit)
      this.wallpapers.push(...newList)
      this.showLoading = false
    },
    async getData(size) {
      let list = []
      let result = await this.$http.get("https://image.baidu.com/search/acjson", {
        params: {
          tn: "resulttagjson",
          logid: "10239998936165607799",
          ie: "utf-8",
          fr: "",
          word:  this.keyword + "壁纸",
          ipn: "r",
          fm: "index",
          pos: "history",
          queryWord: this.keyword,
          cl: "2",
          lm: "-1",
          oe: "utf-8",
          adpicid: "",
          st: "-1",
          z: "9",
          ic: "0",
          hd: 1,
          latest: "",
          copyright: "",
          s: "",
          se: "",
          tab: "",
          width: screen.width,
          height: screen.height,
          face: "0",
          istype: "2",
          qc: "",
          nc: "1",
          expermode: "",
          nojc: "",
          isAsync: true,
          pn: this.offset,
          rn: size,
          gsm: "5a",
        }
      })
      if (result.status === 200) {
        result.data.data.forEach((v) => {
          let url = v.middleURL
          if (v.replaceUrl !== undefined && v.replaceUrl.length > 0) {
            url = v.replaceUrl[v.replaceUrl.length-1].ObjURL
          }
          if (typeof v.thumbURL=== "string" && v.thumbURL !== "" && typeof url === "string" && url !== "") {
            let u = new URL(url)
            let rexp = /(_[0-9]+_[0-9]+)/
            u.pathname = u.pathname.replace(rexp, "")
            list.push({
              thumb: v.thumbURL,
              url: u.toString(),
              copyright: "By 百度"
            })
          }
        })
        this.offset += size
      }
      return list
    }
  },
  data() {
    return {
      hoverIndex: -1,
      wallpapers: [
      ],
      inLoading: false,
      keyword: '',
      offset: 0,
      limit: 34,
      cateList: data.categoryList,
      selectedCateId: data.categoryList[0].id,
      showLoading: false
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
    width: 97%;
    height: 10%;
    margin: 4% auto 2% auto;
    text-align: left;
    display: flex;
    align-items: center;
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
  .wrapper {
    flex: 9;
    width: 50%;
    height: 100%;
    overflow: hidden;
  }
  .wallpaper-list {
    width: 100%;
    /*height: 100%;*/
    display: flex;
    /*justify-content: space-between;*/
    justify-items: left;
    flex-wrap: wrap;
    padding-bottom: 10px;
    /*overflow: hidden;*/
  }
  .wallpaper-item {
    position: relative;
    width: 46%;
    height: 152px;
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 10px;
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
    height: 37px;
    width: 37%;
    padding-left: 16px;
    margin-left: 16px;
    /*margin-top: 16px;*/
    border-radius: 7px;
  }
</style>