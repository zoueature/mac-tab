<template>
  <div class="search-item">
    <div class="engine-selector">
      <div class="eng-show" @click.stop="$store.commit('toggleSearchEngin', !expand)">
        <div class="eng-icon">
          <img :src="engine.icon" width="100%" height="100%" style="width: 100%; height: 100%" :alt="engine.name">
        </div>
        <div class="more-icon" :style="expand ? 'transform: rotate(90deg)': ''">
          <img src="../../../assets/icon/down.png" style="width: 100%; height: 100%">
        </div>
      </div>
      <transition name="englist">
        <div class="eng-list" v-if="expand">
          <div v-for="eng in searchEngine" :key="eng.id">
            <div class="eng-item" v-if="eng.id !== engine.id" @click="selectEng(eng)">
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
      <input placeholder="输入搜索内容" v-model="keyword" class="search-input" @keyup.enter="search(keyword)">
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchCom",
  computed: {
    heightSize() {
      return this.size + "px"
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
          icon: "../../../assets/icon/google.png",
          link: "https://www.google.com/search?q="
        },
        {
          id: 2,
          name: "百度",
          icon: "../../../assets/icon/baidu.png",
          link: "https://www.baidu.com/s?wd="
        },
        {
          id: 3,
          name: "必应",
          icon: "../../../assets/icon/bing.png",
          link: "https://www.bing.com/search?q="
        }
      ]
    }
  },
  methods: {
    search(keyword) {
      if (keyword === "") {
        return
      }
      window.location.href=this.engine.link + keyword
    },
    selectEng(eng) {
      this.engine = eng
    }
  },
  created() {
    this.engine = this.searchEngine[0]
  }
}
</script>

<style scoped>
  .search-item {
    width: 100%;
    height: v-bind(heightSize);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    box-shadow: 5px 5px 15px rgba(9, 9, 9, 0.24);
  }
  .input-item {
    flex: 10;
  }
  .search-input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 16px;
    padding-left: 7px;
  }
  .engine-selector {
    height: 100%;
    background: white;
    flex: 1;
  }
  .eng-show {
    width: v-bind(heightSize);
    height: v-bind(heightSize);
    display: flex;
    justify-content: space-around;
  }
  .eng-icon {
    margin-top: 50%;
    margin-left: 10%;
    transform: translateY(-50%);
    width: v-bind(halfSize);
    height: v-bind(halfSize);
  }
  .more-icon {
    margin-top: 50%;
    width: 5px;
    height: 15px;
    transform: translateY(-50%);
  }
  .eng-list {
    width: 160px;
    height: v-bind(listHeight);
    background: white;
    border-radius: 7px;
    position: absolute;
    box-shadow: 1px 7px 7px rgba(0, 0, 0, 0.34);
    padding-bottom: 25px;
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
  }
  .eng-item div {
    float: left;
  }
  .eng-img {
    width: 26px;
    height: 26px;
    margin-left: 9px;
    margin-right: 10px;
  }
  .eng-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #42b983;
    font-weight: bold;
    line-height: 26px;
  }
</style>