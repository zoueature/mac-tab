<template>
  <div id="search-app">
    <div class="search-input">
      <input class="input-item" placeholder="输入关键词">
      <span>search</span>
    </div>
    <div class="search-category">
      <div class="category-item">

      </div>
    </div>
    <iframe class="search-website" src="https://www.baidu.com">

    </iframe>
  </div>
</template>

<script>
export default {
  name: "SearchApp"
}
</script>

<style scoped>
  #search-app {
    width: 100%;
    height: 100%;
  }
  .search-input {
    width: 80%;
    height: 43px;
    margin:  0 auto;
    margin-top: 34px;
    display: flex;
    box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.22);
  }
  .input-item {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    padding-left: 16px;
    font-size: 13px;
  }
  .search-category {
    width: 90%;
    height: 52px;
    margin: 0 auto;
    margin-top: 16px;
    background: rebeccapurple;
  }
</style>