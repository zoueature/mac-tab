<template>
  <div class="appstore-app">
    <div class="app-category">
      <form class="search" @submit="search">
        <input placeholder="输入关键词搜索" v-model="keyword">
      </form>
      <div class="app-category-list">
        <div :class=" 'category-item ' + (selectedCategory === category.id ? 'active': '')"
            v-for="category in categoryList"
            :key="category.id"
            @click="selectCategory(category)"
        >
          <div class="category">
            <div class="category-icon">
              <img :src="category.icon" alt="">
            </div>
            <div class="category-name">
              {{category?.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <diy-app v-if="diyCategoryId === selectedCategory" class="app-list"/>
    <bookmark-importer v-else-if="selectedCategory === bookmarkImpoterCatgoryId" class="app-list"/>
    <div v-else class="app-list" >
      <div class="title">
        {{selectedCategoryObj?.name}}
      </div>
      <ul class="app-list-container" v-infinite-scroll="loadingData" :infinite-scroll-disabled="inLoadingData || noMoreData" :infinite-scroll-delay="250" infinite-scroll-immediate="false" >
        <!-- <loading ref="loading"/> -->
        <li class="app-item"  v-for="app in apps" :key="app.id">
          <div class="app-container">
            <div class="app-icon" @click="preview(app)">
              <img :src="app.icon" alt="" :style="'background:' + app.color">
            </div>
            <div class="app-name">
              <span>{{app.name}}</span>
            </div>
            <div class="app-desc">{{app.desc}}</div>
            <div class="app-installer" @click="install(app)" v-if="installedApp[app.id] !== true">
              <img src="../../../../assets/icon/download.png" alt="">
            </div>
            <div class="app-installer"  v-else>
              <img src="../../../../assets/icon/gou_white_fill.png" alt="">
            </div>
          </div>
        </li>
        <div style="width:100%; position: relative;" v-if="inLoadingData">
          <loading-inline :scale="0.7"/>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>

import api from "@/popup/components/api/app"
import LoadingInline from "@/popup/components/common/LoadingInline"
import DiyApp from "@/popup/components/App/AppStore/DiyApp"
import BookmarkImporter from "@/popup/components/App/AppStore/BookmarkImporter"

const diyCategoryId = 7
const bookmarkImpoterCatgoryId = 5

export default {
  name: "AppStore",
  components: {
    LoadingInline,
    DiyApp,
    BookmarkImporter,
  },
  methods: {
    search(e) {
      e.preventDefault()
      this.apps = []
      this.page = 1
      this.noMoreData = false
      this.searchApp(this.keyword, 0)
      this.selectedCategory = 0
    },
    loadingData() {
      this.searchApp(this.keyword, this.selectedCategory)
    },
    searchApp(keyword, categoryId) {
      let that = this
      this.inLoadingData = true
      api.searchApp(keyword, categoryId, this.page, this.size, (data) => {
        if (data.length == 0) {
          that.noMoreData = true
        }
        data.forEach(app => {
          that.apps.push({
            id: app.id,
            name: app.title,
            icon: app.icon,
            link: app.target,
            desc: app.desc,
            color: app.background_color,
            })
        })
        that.page ++
        that.inLoadingData = false
      })
    },
    getAppCategoryList() {
      let that = this
      api.getAppCategory((data) => {
        let categoryList = []
        data.forEach(category => {
          categoryList.push({
            id: category.id,
            name: category.title,
            icon: category.icon,
          })
        })
        that.categoryList = categoryList
      })
    },
    selectCategory(category) {
      this.apps = []
      this.page = 1
      this.keyword = ''
      this.noMoreData = false
      this.selectedCategory = category.id
      this.selectedCategoryObj = category
      this.searchApp(this.keyword, this.selectedCategory)
    },
    install(app) {
      app.background = app.color
      this.$store.commit('addApp', app)
      this.installedApp[app.id] = true
    },
    remove(app) {
      this.$store.commit('removeApp', app)
      this.installedApp[app.id] = false
    },
    preview(app) {
      if (app.link === '' || app.link === undefined || app.link === null) {
        return
      }
      window.open(app.link, '_blank');
    },
  },
  created() {
    this.getAppCategoryList()
  },
  data() {
    return {
      selectedCategory: diyCategoryId,
      bookmarkImpoterCatgoryId: bookmarkImpoterCatgoryId,


      selectedCategoryObj: null,
      categoryList: [],
      apps: [],
      installedApp: this.$store.getters.installedAppID,
      diyCategoryId: diyCategoryId,
      keyword: '',
      page: 1, 
      size: 15,
      inLoadingData: false,
      noMoreData: false,
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
    flex: 3.7;
    padding-top: 3.4%;
    /*box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.27);*/
    background: rgba(227, 225, 225, 0.49);
    /* overflow-y: scroll; */
  }
  .app-category-list {
    height: 80%;
    overflow-y: scroll;
  }
  .app-category-list::-webkit-scrollbar {
    /** TODO 展示滚动条并美化 */
    display: none;
  }
  .search {
    width: 100%;
    height: 43px;
    margin: 10px auto 25px auto;
  }
  .search input {
    width: 88%;
    padding-left: 5%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 14px;
    /*box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.35);*/
  }
  .category-item {
    width: 100%;
    height: 46px;
    margin-top: 5px;
    cursor: pointer;
  }
  .category {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    align-content: center;
  }
  .category-icon {
    width: 25px;
    height: 25px;
  }
  .category-icon img {
    width: 100%;
    height: 100%;
  }
  .category-name {
    margin-left: 14px;
    /*font-weight: bold;*/
    font-size: 14px;
    color: rgba(0,0,0,0.77);
    white-space: nowrap;
  }
  .app-list {
    margin: 0;
    flex: 9;
    padding-top: 3.4%;
    display: flex;
    flex-wrap: wrap;
    justify-items: left;
    flex-direction: row;
    align-items: flex-start;
    align-content: flex-start;
    /* overflow-y: scroll; */
    /* overflow: scroll; */
    position: relative;
  }
  .app-list-container {
    height: 90%;
    list-style: none;
    padding-inline-start: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-items: left;
    flex-direction: row;
    align-items: flex-start;
    align-content: flex-start;
    /* overflow-y: scroll; */
    overflow: scroll;
    position: relative;
  }
  .app-item {
    width: 44%;
    margin-left: 5%;
    margin-right: 1%;
    height: 125px;
    margin-bottom: 16px;
    /*overflow: hidden;*/
    text-align: left;
    background: rgb(240, 240, 240);
    border-radius: 7px;
  }
  .app-container:last-child {
    margin-bottom: 100px;
  }
  .app-container {
    width: 90%;
    height: 70%;
    position: relative;
    background: white;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 7px;
  }
  .app-icon {
    width: 70px;
    height: 70px;
    float: left;
    overflow: hidden;
    position: absolute;
    border-radius: 7px;
    top: -25px;
    /* background: white; */
  }
   .app-icon:hover{
    cursor: pointer;
   }
  .app-installer {
    position: absolute;
    right: 0px;
    top: -25px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    background: white;
    border-radius: 100%;
  }
  .app-icon img, .app-installer img {
    border-radius: 7px;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.15);
    width: 80%;
    height: 80%;
    margin-left: 10%;
    margin-top: 10%;
  }
  .app-installer img {
    border-radius: 100%;
  }
  .app-name {
    width: 50%;
    font-size: 14px;
    height: 25px;
    /*font-weight: bolder;*/
    margin-left: 74px;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: bold;
    /*float: left;*/
  }
  .app-desc {
    width: 95%;
    margin-top: 20px;
    margin-left: 5px;
    font-size: 10px;
    color: rgba(12, 16, 33, 0.52);
    font-weight: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .title {
    width: 90%;
    margin: 0 auto;
    font-weight: bold;
    text-align: left;
    font-size: 25px;
    /* margin-bottom: 25px; */
  }
  .preview {
    top: 50%;
    background: #2da2df;
    overflow: hidden;
    border-radius: 100%;
  }
  .selected {
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 0;
    /*background: red;*/
  }
  .selected img {
    display: block;
  }
  .diy-app {
    display: flex;
    flex-direction: row;
    align-content: space-around;
  }
</style>