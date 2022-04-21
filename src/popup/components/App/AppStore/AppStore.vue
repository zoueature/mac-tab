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
            <img :src="category.icon" alt="">
          </div>
          <div class="category-name">
            {{category.name}}
          </div>
        </div>
      </div>
    </div>
    <div class="app-list" v-if="diyCategoryId !== selectedCategory">
      <div class="app-item" v-for="app in selectedApp" :key="app.id">
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
    <div v-else class="app-list">
      <div class="app-input">
        <div>地址</div>
        <input placeholder="http://" v-model="diyApp.link">
      </div>
      <div class="app-input">
        <div>名称</div>
        <input placeholder="输入名称" v-model="diyApp.name">
      </div>
      <div class="select-app-icon">
        <div class="app-icon-shower">
          {{diyApp.name.slice(0,2)}}
        </div>
        <div class="app-icon-shower">
          {{'在线图标'}}
        </div>
      </div>
      <div class="select-icon-color">
        <div class="color-shower" v-for="(color, index) in colors"
             :key="index"
             :style="'background: ' + color.color"
        ></div>
      </div>
      <div class="submit-app">添加</div>
    </div>
  </div>
</template>

<script>

import apps from './apps'
import color from "@/popup/components/App/AppStore/color";

const diyCategoryId = 7

export default {
  name: "AppStore",
  methods: {
    selectCategory(categoryID) {
      this.selectedCategory = categoryID
    },
    install(app) {
      this.$store.commit('addApp', app)
      this.installedApp[app.id] = true
    },
    remove(app) {
      this.$store.commit('removeApp', app)
      this.installedApp[app.id] = false
    }
  },
  computed: {
    selectedApp() {
      let result = []
      this.apps[this.selectedCategory].list.forEach((v) => {
        v.installed = this.installedApp[v.id]
        result.push(v)
      })
      return result
    }
  },
  data() {
    return {
      selectedCategory: diyCategoryId,
      categoryList: apps.category,
      apps: apps.apps,
      installedApp: this.$store.getters.installedAppID,
      diyCategoryId: diyCategoryId,
      diyApp: {
        link: '',
        name: ''
      },
      colors: color,
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
    width: 60%;
    font-size: 14px;
    font-weight: bolder;
    margin-left: 16px;
    float: left;
    text-align: left;
  }
  .app-name span {
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
  .app-input {
    width: 90%;
    text-align: left;
    margin: 0 auto;
    font-size: 14px;
    margin-bottom: 25px;

  }
  .app-input input {
    margin-top: 10px;
    border: none;
    outline: none;
    height: 25px;
    width: 70%;
    background: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.16);
    font-size: 15px;
  }
  .select-app-icon {
    width: 90%;
    margin: 0 auto;
    margin-top: 25px;
  }
  .app-icon-shower {
    width: 70px;
    height: 70px;
    background: rebeccapurple;
    float: left;
    margin-right: 10px;
    color: white;
    align-items: center;
    text-align: center;
    line-height: 70px;
    font-size: 25px;
    font-weight: bolder;
    overflow: hidden;
  }
  .select-icon-color {
    display: flex;
    width: 90%;
    margin: 0 auto;
    height: 34px;
    margin-top: 25px;
    clear: both;
    justify-content: space-between;
  }
  .color-shower {
    width: 25px;
    height: 25px;
    border-radius: 4px;
  }
  .submit-app {
    margin-top: 100px;
    width: 34%;
    height: 40px;
    margin-left: 5%;
    background: #42b983;
    border-radius: 7px;
    font-size: 15px;
    line-height: 40px;
    color: white;
  }
</style>