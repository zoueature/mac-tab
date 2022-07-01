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
        <div :class="originClass('baidu')" @click="selectOrigin('baidu')">
          <img src="https://www.baidu.com/favicon.ico" alt="" class="website-icon">
        </div>
        <div :class="originClass('pexels')" @click="selectOrigin('pexels')">
          <img src="https://www.pexels.com/favicon.ico" alt="" class="website-icon">
        </div>
        <div :class="originClass('unsplash')" @click="selectOrigin('unsplash')">
          <img src="https://www.unsplash.com/favicon.ico" alt="" class="website-icon">
        </div>
      </div>
    </div>
    <div class="wallpaper-market">
      <div class="wallpaper-category">
        <div :class="'cate ' + (selectedCateId === category.id ? 'active' : '')"
             v-for="category in cateList"
             :key="category.id"
             @click="selectCate(category)"
        >
          {{category.title}}
        </div>
      </div>
      <ul v-infinite-scroll="loadingData" class="wallpaper-list">
        <li class="wallpaper-item no-need-dark"
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import data from "./wallpaper_list"
import Back from "@/popup/components/common/Back";
import api from "@/popup/components/api/wallpaper"
// import Loading from "@/popup/components/common/Loading";


const defaultActiveCateID = data.categoryList[0]

export default {
  name: "WallpaperMarket",
  components:{
    Back,
  },
  created() {
    let that = this
    api.getWWallpaperTag((tags) => {
      that.cateList = tags
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
    }
  },
  methods: {
    async search(e) {
      e.preventDefault()
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
    selectOrigin(origin) {
      this.origin = origin
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
      let newList = []
      if (this.origin === "baidu") {
        newList = await this.getData(this.limit)
      } else {
        newList = await this.getWallpaper(this.origin)
      }
      this.wallpapers.push(...newList)
      this.showLoading = false
    },
    async getWallpaper(origin) {
      let result = await this.$http.get("/wallpaper/type/" + origin, {
        params: {
          keyword: this.keyword,
          page:  1,
          size: this.limit
        }
      })
      return result.data.data
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
      origin: "baidu",
      hoverIndex: -1,
      wallpapers: [
      ],
      inLoading: false,
      keyword: '',
      offset: 0,
      limit: 34,
      cateList: [],
      selectedCateId: defaultActiveCateID.id,
      showLoading: false,
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
    list-style: none;
    overflow-y: scroll;
    flex: 11;
    width: 50%;
    height: 100%;
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
    width: 70px;
  }
  .website-icon {
    overflow: hidden;
    width: 25px;
    height: 25px;
  }
</style>