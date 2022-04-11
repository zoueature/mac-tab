<template>
  <div class="appstore-app">
    <div class="app-category">
      <div class="search">搜索</div>
      <div class="category-item" v-for="category in categoryList" :key="category.id">
        {{category.name}}
      </div>
    </div>
    <div class="app-list">

    </div>
  </div>
</template>

<script>
export default {
  name: "AppStore",
  data() {
    return {
      categoryList: {
        id: 1,
        icon: '../../../../assets/hot.png',
        name: '热门',
      }
    }
  }
}
</script>

<style scoped>
  .appstore-app {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .app-category {
    flex: 2;
    background: #42b983;
  }
  .app-list {
    flex: 8;
    background: #ccffcc;
  }
  .search {
    width: 100%;
    height: 34px;
    background: rebeccapurple;
    margin: 0 auto;
  }
  .category-item {
    width: 100%;
    height: 34px;
  }
</style>