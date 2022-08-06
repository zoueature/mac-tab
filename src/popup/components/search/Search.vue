<template>
  <div class="search-item" @keydown.up="upSuggest" @keydown.down="downSuggest">
    <div class="engine-selector">
      <div class="eng-show" @click.stop="$store.commit('toggleSearchEngin', !expand)">
        <div class="eng-icon" :style="expand ? 'margin-top: -10px; transition: 200ms;': 'transition: 200ms;' ">
          <img :src="currentEng.icon" width="100%" height="100%" style="width: 100%; height: 100%" :alt="currentEng.name">
        </div>
        <right-one  theme="filled" size="20" fill="#777" :strokeWidth="2" :style="expand ? 'transform: rotate(90deg);  transition: 200ms;': 'transition: 200ms'"/>
      </div>
      <transition name="englist">
        <div class="eng-list" v-if="expand">
          <div v-for="eng in searchEngine" :key="eng.identify">
            <div class="eng-item" v-if="eng.identify !== $store.getters.searchEngine" @click="selectEng(eng.identify)">
              <div class="eng-img">
                <img :src="eng.icon" :alt="eng.name">
              </div>
              <div class="eng-name">
                {{eng.name}}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="input-item">
      <form action="" @submit="search" class="input-item">
        <input :placeholder="$i18n('searchPlaceholder')"
               v-model="keyword"
               class="search-input">
      </form>
      <div v-if="suggestList.length > 0 && showSuggest" class="suggest-container">
        <div v-for="(suggest, index) in suggestList.slice(0, 16)" :key="index"
             :class="'suggest-item ' + (index === selectSuggestIndex ? 'active' : '')"
             :style="index === selectSuggestIndex ? 'transform: scaleY(1.06)' : ''"
             @click.stop="selectNSearch(suggest)"
             @mouseenter="selectSuggest(index)"
        >
          <search class="suggest-title" theme="outline" size="16" fill="#777" :strokeWidth="2" v-if="suggest.type === 'search'"/>
          <img class="suggest-title" :style="'width: 15px; height: 15px; border-radius:20%; background:' + suggest.background" :src="suggest.icon" v-else-if="suggest.type === 'app'"/>
          <span :style="index === selectSuggestIndex ? 'margin-left: 7px; font-weight: bold; color: #fff; font-size:15px;' : ''">{{suggest.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {RightOne, Search} from '@icon-park/vue-next'
import engineList from "./engine_list"
import baidu from '@/popup/components/api/baidu'

export default {
  name: "SearchCom",
  components: {
    RightOne,
    Search,
  },
  props: {
    size: {
      type: Number,
      default: 70
    }
  },
  computed: {
    primaryColor() {
      return this.$store.getters.primaryColor
    },
    showSuggest() {
      return this.$store.getters.showSuggest
    },
    heightSize() {
      return this.size + "px"
    },
    iconShowSize() {
      return Math.ceil(this.size*1.5) + "px"
    },
    centerTop() {
      return Math.ceil(this.size / 4) + "px"
    },
    halfSize() {
      return Math.ceil(this.size / 2) + "px"
    },
    expand() {
      return this.$store.getters.showEngineList
    },
    listHeight() {
      return Math.ceil(40 * (this.searchEngine-1)) + 'px'
    },
    currentEng() {
      let engine = this.searchEngine[0]
      let configEngineIdentify = this.$store.getters.searchEngine
      for (let i = 0; i < this.searchEngine.length; i ++) {
        if (configEngineIdentify === this.searchEngine[i].identify) {
          engine = this.searchEngine[i]
          break
        }
      }
      // this.engine = engine
      return engine
    }
  },
  data() {
    return {
      keyword: "",
      engine: null,
      searchEngine: engineList,
      suggestList: [],
      selectSuggestIndex: -1,
    }
  },
  watch: {
    keyword(val) {
      if (val === '') {
        this.suggestList = []
      }
      this.suggest(val)
    },
    suggesList() {
      this.selectSuggestIndex = -1
    },
    selectSuggestIndex(val) {
      console.log(val)
      // TODO 解决死循环的问题
      // this.keyword = this.suggestList[val]
    }
  },
  methods: {
    selectNSearch(suggest) {
      console.log(suggest)
  
      switch (suggest.type) {
        case 'search':
          this.goToSearch(suggest.title)
          break
        case 'app':
          this.openApp(suggest)
          break
      }
    },
    openApp(app) {
      if (app.link !== undefined) {
        window.open(app.link, '_blank')
      } else if (app.app !== undefined) {
        this.$router.replace({
          name: app.app,
          // params: routeParams,
        })
        this.$store.commit('openApp')
        this.suggestList = []
      }
    },
    selectSuggest(suggestIndex) {
      this.selectSuggestIndex = suggestIndex
    },
    upSuggest() {
      if (this.selectSuggestIndex > 0) {
        this.selectSuggestIndex --
      }
    },
    downSuggest() {
      if (this.selectSuggestIndex < this.suggestList.length -1) {
        this.selectSuggestIndex ++
      }
    },
    search(e) {
      e.preventDefault()
      let sugg = this.suggestList[this.selectSuggestIndex]
      if (sugg !== undefined && sugg.type === 'app') {
        this.selectNSearch(this.suggestList[this.selectSuggestIndex])
        return
      } 
      let keyword = this.keyword
      if (keyword === "") {
        return
      }
      if (this.selectSuggestIndex >= 0 && this.selectSuggestIndex < this.suggestList.length) {
        keyword = this.suggestList[this.selectSuggestIndex].title
      }
      this.goToSearch(keyword)
    },
    goToSearch(keyword) {
      window.location.href=this.currentEng.link + keyword
      this.keyword = ""
      this.suggestList = []
    },
    async suggest(keyword) {
      let that = this
      // 获取搜索引擎搜索建议
      that.suggestList = []
      if (keyword === "") {
        return
      }
      baidu.getSearchSuggest(keyword, function(result) {
        result.forEach(s => {
          that.suggestList.push({
            type: "search",
            title: s,
          })
        })
        // that.selectSuggestIndex = 0
      })
      // 获取已经安装的app应用
      let pages = this.$store.getters.pageApps
      pages.forEach(apps => {
        apps.forEach(app => {
          if (app.type !== 'app') {
            return
          }
          let index = app.name.toLowerCase().indexOf(keyword.toLowerCase())
          if (index >= 0) {
            that.suggestList.push({
              type: 'app',
              title: app.name,
              link: app.link,
              app: app.app,
              icon: app.icon,
              background: app.background,
            })
          }
        })
      })
      this.$store.commit('toggleSearchSuggest', true)
    },
    selectEng(eng) {
      this.$store.commit("setSearchEngine", eng)
    }
  },
  created() {
    this.engine = this.searchEngine[0]
    let that = this
    this.$nextTick(() => {
      document.addEventListener('keyup', function (e) {
        if (e.code === 'Escape') {
          that.suggestList = []
        }
      })
    })
  }
}
</script>

<style scoped>
  .search-item {
    transition: 200ms;
    width: 100%;
    height: v-bind(heightSize);
    border-radius: 10px;
    display: flex;
    box-shadow: 5px 5px 15px rgba(9, 9, 9, 0.24);
  }
  .input-item {
    position: relative;
    height: 100%;
    flex: 10;
  }
  .search-input {
    padding: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    outline: none;
    border: 0;
    font-size: 14px;
    /* padding-left: 7px; */
    border-radius: 0 10px 10px 0;
  }
  .engine-selector {
    height: 100%;
    background: white;
    /*flex: 1;*/
    border-radius: 10px 0 0 10px;
  }
  .eng-show {
    width: v-bind(iconShowSize);
    height: v-bind(heightSize);
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .eng-icon {
    /* margin-top: 50%; */
    /* margin-left: 15%; */
    /* transform: translateY(-50%); */
    width: v-bind(halfSize);
    height: v-bind(halfSize);
  }
  .eng-list {
    width: 160px;
    height: v-bind(listHeight);
    background: rgba(255, 255, 255, 0.52);
    backdrop-filter: blur(25px);
    border-radius: 7px;
    position: absolute;
    box-shadow: 1px 7px 7px rgba(0, 0, 0, 0.34);
    padding-bottom: 25px;
    z-index: 1000000;
    cursor: pointer;
    margin-top: 2px;
    /*z-index: 1000;*/
  }
  .englist-enter-active,
  .englist-leave-active {
    transition: all 200ms linear;
  }
  .englist-enter-from {
    /* height: 0; */
    transform: translateY(-50px);
    opacity: 0;
  }
  .englist-leave-to {
    opacity: 0;
  }
  .eng-item {
    width: 100%;
    height: 3vw;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    justify-items: start;
    align-items: center;
    align-content: center;
  }
  .eng-item div {
    float: left;
  }
  .eng-item:hover {
    transform: scale(1.06);
  }
  .eng-img {
    width: 2vw;
    height: 2vw;
    margin-left: 9px;
    margin-right: 16px;
    border-radius: 100%;
    overflow: hidden;
  }
  .img {
    width: 100%;
    height: 100%;
    
  }
  .eng-name {
    display: flex;
    align-content: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: v-bind(primaryColor);
    font-weight: bold;
    font-size: 16px;
    overflow: hidden
  }
  .suggest-container {
    position: absolute;
    width: 100%;  
    /* height: auto; */
    background: rgba(255, 255, 255, 0.88);
    margin-top: 2px;
    z-index: 1000000000000;
    text-align: left;
    border-radius: 7px; 
    padding-bottom: 16px;
  }
  .suggest-item {
    margin-top: 2px;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.88);
  }
   .suggest-container div:nth-child(0n+1) {
    border-radius: 7px 7px 0 0;
  }
  .suggest-title {
    margin-left: 1%;
    margin-right: 1.2%;
  }
</style>