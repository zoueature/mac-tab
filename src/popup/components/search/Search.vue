<template>
  <div class="search-item" @keydown.up="selectSuggestIndex--" @keydown.down="selectSuggestIndex++">
    <div class="engine-selector">
      <div class="eng-show" @click.stop="$store.commit('toggleSearchEngin', !expand)">
        <div class="eng-icon" :style="expand ? 'margin-top: -10px; transition: 200ms;': 'transition: 200ms;' ">
          <img :src="currentEng.icon" width="100%" height="100%" style="width: 100%; height: 100%" :alt="currentEng.name">
        </div>
        <right-one class="more-icon"  theme="filled" size="20" fill="#777" :strokeWidth="2" :style="expand ? 'transform: rotate(90deg);  transition: 200ms;': 'transition: 200ms'"/>
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
        <input placeholder="输入搜索内容"
               v-model="keyword"
               class="search-input">
      </form>
      <div v-if="suggestList.length > 0" class="suggest-container">
        <div v-for="(suggest, index) in suggestList" :key="suggest"
             :class="'suggest-item ' + (index === selectSuggestIndex ? 'active' : '')"
             @click="selectNSearch(suggest)"
        >
          {{suggest}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {RightOne} from '@icon-park/vue-next'

export default {
  name: "SearchCom",
  components: {
    RightOne,
  },
  computed: {
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
      size: 52,
      keyword: "",
      engine: null,
      searchEngine: [
        {
          id: 1,
          name: "Google",
          identify: "google",
          icon: "../../../assets/icon/google.png",
          link: "https://www.google.com/search?q="
        },
        {
          id: 2,
          name: "百度",
          identify: "baidu",
          icon: "../../../assets/icon/baidu.png",
          link: "https://www.baidu.com/s?wd="
        },
        {
          id: 3,
          name: "必应",
          identify: "bing",
          icon: "../../../assets/icon/bing.png",
          link: "https://www.bing.com/search?q="
        },
        // https://www.so.com/s?q=cxz
        {
          id: 4,
          name: "360搜索",
          identify: "360",
          icon: "https://s.ssl.qhimg.com/static/121a1737750aa53d.ico",
          link: "https://www.so.com/s?q="
        },
        {
          id: 5,
          name: "搜狗搜索",
          identify: "sogou",
          icon: "https://www.sogou.com/images/logo/new/favicon.ico?nv=1&v=3",
          link: "https://www.sogou.com/web?query="
        },
        {
          id: 6,
          name: "雅虎",
          identify:"yahoo",
          icon: "https://search.yahoo.com/favicon.ico",
          link: "https://search.yahoo.com/search?p="
        }
      ],
      suggestList: [],
      selectSuggestIndex: -1,
    }
  },
  watch: {
    keyword(val) {
      this.suggest(val)
    },
    suggest(val) {
      if (val.length === 0) {
        this.selectSuggestIndex = -1
      }
    }
  },
  methods: {
    selectNSearch(keyword) {
      this.search(keyword)
    },
    search(e) {
      e.preventDefault()
      let keyword = this.keyword
      if (keyword === "") {
        return
      }
      if (this.selectSuggestIndex >= 0 && this.selectSuggestIndex < this.suggestList.length) {
        keyword = this.suggestList[this.selectSuggestIndex]
      }
      window.location.href=this.currentEng.link + keyword
      this.keyword = ""
      this.suggestList = []
    },
    async suggest(keyword) {
      let url = "https://www.baidu.com/sugrec?prod=pc&from=pc_web&wd="
      let result = await this.$http.get(url + keyword)
      if (result.status === 200) {
        this.suggestList = []
        result.data.g.forEach(v => {
          this.suggestList.push(v.q)
        })
      }
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
    padding-left: 16px;
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
  .more-icon {
    /* margin-top: 43%; */
    /* margin-left: 16%; */
    /* width: 5px; */
    /* height: 10px; */
    /* transform: translateY(-50%); */
  }
  .eng-list {
    width: 160px;
    height: v-bind(listHeight);
    background: rgba(255, 255, 255, 0.97);
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
    transition: all 200ms ease;
  }
  .englist-enter-from,
  .englist-leave-to {
    height: 0;
    opacity: 0;
  }
  .eng-item {
    width: 100%;
    height: 40px;
    margin-top: 10px;
   /* display: flex;*/
    justify-content: flex-start;
    justify-items: start;
  }
  .eng-item div {
    float: left;
  }
  .eng-item:hover {
    transform: scale(1.06);
  }
  .eng-img {
    width: 26px;
    height: 26px;
    margin-left: 9px;
    margin-right: 16px;
  }
  .eng-name {
    display: flex;
    align-content: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #42b983;
    font-weight: bold;
    line-height: 26px;
  }
  .suggest-container {
    position: absolute;
    width: 100%;
    height: 300px;
    background: white;
    margin-top: 2px;
    z-index: 1000000;
    overflow-x: scroll;
    text-align: left;
    border-radius: 2px;
  }
  .suggest-item {
    padding-left: 2%;
    margin-top: 2px;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.8);
  }
</style>