<template>
  <div class="appstore-app">
    <div class="app-category">
      <div class="search">
        <input placeholder="搜索">
      </div>
      <div :class=" 'category-item ' + (selectedCategory === category.id ? 'active': '')"
           v-for="category in categoryList"
           :key="category.id"
           @click="selectCategory(category.id)"
      >
        <div class="category">
          <div class="category-icon">
            <img :src="category.icon">
          </div>
          <div class="category-name">
            {{category.name}}
          </div>
        </div>
      </div>
    </div>
    <div class="app-list">
      <div class="app-item" v-for="app in selectedApp(this.selectedCategory)" :key="app.id">
        <div class="app-icon">
          <img :src="app.icon" alt="" style="width: 100%; height: 100%">
        </div>
        <div class="app-name">
          <span>{{app.name}}</span>
          <br/>
          <span class="app-desc">{{app.desc.substring(0, 14)}}</span>
        </div>
        <div class="app-installer" @click="install(app)" v-if="!app.installed">
          <img src="../../../../assets/icon/download.png" alt="" style="width: 100%; height: 100%">
        </div>
        <div class="app-installer" @click="remove(app)" v-else>
          <img src="../../../../assets/icon/delete.png" alt="" style="width: 100%; height: 100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import apps from './apps'
console.log(apps)

export default {
  name: "AppStore",
  methods: {
    selectCategory(categoryID) {
      this.selectedCategory = categoryID
    },
    install(app) {
      this.$store.commit('addApp', {
        id: app.id,
        type: 'app',
        size: 70,
        name: app.name,
        icon: app.icon,
        app:  app.app,
        link: app.link,
      },)
      this.installedApp[app.id] = true
    },
    remove(app) {
      this.$store.commit('removeApp', app)
      this.installedApp[app.id] = false
    }
  },
  computed: {
    selectedApp() {
      let that = this
      return function (categoryId) {
        let list = that.apps[categoryId].list
        let installed = that.installedApp
        list.forEach((v, index) => {
          list[index].installed = false
          let isInstalled = installed[v.id]
          if (isInstalled === true) {
            list[index].installed = true
          }
        })
        return list
      }
    }
  },
  data() {
    return {
      selectedCategory: 5,
      categoryList: apps.category,
      apps: apps.apps,
      installedApp: this.$store.getters.installedAppID,
    }
  }
}
</script>

<style scoped>
  .appstore-app {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }
  .app-category {
    flex: 3;
    /*box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.27);*/
    background: rgba(227, 225, 225, 0.49);
  }
  .search {
    width: 100%;
    height: 25px;
    margin: 10px auto 10px auto;
  }
  .search input {
    width: 80%;
    padding-left: 5%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.35);
  }
  .category-item {
    width: 100%;
    height: 37px;
    margin-top: 7px;
  }
  .active {
    /*background: rgba(37, 132, 209, 0.57);*/
    background: white;
  }
  .category {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
  }
  .category-icon {
    margin-top: 5px;
    width: 27px;
    height: 27px;
  }
  .category-icon img {
    width: 100%;
    height: 100%;
  }
  .category-name {
    margin-left: 16px;
    line-height: 37px;
    font-weight: bold;
    font-size: 15px;
    color: rgba(0,0,0,0.77);
  }
  .app-list {
    flex: 9;
    display: flex;
    flex-wrap: wrap;
    justify-items: left;
    flex-direction: row;
    align-items: flex-start;
    align-content: flex-start;
    overflow-y: scroll;
  }
  .app-item {
    position: relative;
    width: 46%;
    margin-left: 2%;
    margin-right: 2%;
    height: 52px;
    margin-top: 16px;
    overflow: hidden;
  }
  .app-icon {
    width: 40px;
    height: 40px;
    float: left;
    border-radius: 7px;
    overflow: hidden;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.15);
  }
  .app-name {
    font-size: 14px;
    font-weight: bolder;
    margin-left: 16px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    float: left;
  }
  .app-desc {
    margin-top: 2px;
    font-size: 10px;
    color: rgba(12, 16, 33, 0.71);
    font-weight: normal;
  }
  .app-installer {
    position: absolute;
    right: 0;
    width: 20px;
    height: 20px;
    margin-left: 16px;
    margin-top: 10px;
  }

</style>