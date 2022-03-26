<template>
  <div class="search-item">
    <div class="engine-selector">
      <div class="eng-show">
        <img :src="engine.icon" width="100%" height="100%" style="width: 100%; height: 100%" :alt="engine.name">
      </div>
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
        }
      ]
    }
  },
  methods: {
    search(keyword) {
      if (keyword === "") {
        return
      }
      window.location.href="https://www.google.com/search?q=" + keyword
      console.log(keyword)
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
    width: v-bind(halfSize);
    height: v-bind(halfSize);
    margin: v-bind(centerTop) auto 0 auto;
  }
</style>