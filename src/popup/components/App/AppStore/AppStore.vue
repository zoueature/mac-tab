<template>
  <div class="appstore-app">
    <div class="app-category">
      <form class="search" @submit="search">
        <input placeholder="输入关键词搜索" v-model="keyword">
      </form>
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
    <div class="app-list" v-if="diyCategoryId !== selectedCategory">
      <div class="title">
        {{selectedCategoryObj?.name}}
      </div>
      <div class="app-item"  v-for="app in selectedApp" :key="app.id">
        <div class="app-container">
          <div class="app-icon" @click="preview(app)">
            <img :src="app.icon" alt="">
          </div>
          <div class="app-name">
            <span>{{app.name}}</span>
          </div>
          <div class="app-desc">{{app.desc}}</div>
          <div class="app-installer" @click="install(app)" v-if="!app.installed">
            <img src="../../../../assets/icon/download.png" alt="">
          </div>
          <div class="app-installer"  v-else>
            <img src="../../../../assets/icon/gou_white_fill.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div v-else class="app-list">
      <div class="title">
        自定义应用
      </div>
      <div class="app-input">
        <div>地址</div>
        <input placeholder="http://" v-model="diyApp.link" @focusout="getWebsiteTitle" @keyup.enter="getWebsiteTitle">
      </div>
      <div class="app-input">
        <div>名称</div>
        <input placeholder="输入名称" v-model="diyApp.name">
      </div>
      <div class="select-app-icon">
        <div class="app-icon-shower" :style="'background: '  + diyApp.wordIconColor" @click="diyApp.iconType = 'word'">
          {{diyApp.name.substring(0,2)}}
          <div class="selected" v-if="diyApp.iconType === 'word'">
            <img src="../../../../assets/icon/gou_white_fill.png" alt="" style="width: 100%; height: 100%; margin: 0; padding: 0">
          </div>
        </div>
        <div class="app-icon-shower" v-if="diyApp.onlineIcon !== ''" @click="diyApp.iconType = 'img'">
         <img :src="diyApp.onlineIcon" style="width: 100%; height: 100%" >
          <div class="selected" v-if="diyApp.iconType === 'img'">
            <img src="../../../../assets/icon/gou_white_fill.png" alt="" style="width: 100%; height: 100%; margin: 0; padding: 0">
          </div>
        </div>
      </div>
      <div class="select-icon-color">
        <div class="color-shower" v-for="(color, index) in colors"
             :key="index"
             :style="'background: ' + color.color"
             @click="diyApp.wordIconColor = color.color"
        >
          <img src="../../../../assets/icon/gou_white.png"
               style="width: 50%; height: 50%; margin-left: 10%; margin-top: 25%;"
               alt=""
               v-if="diyApp.wordIconColor === color.color">
        </div>
      </div>
      <div class="opt-container">
        <div class="submit-app" @click="addDiyApp">添加</div>
      </div>
    </div>
  </div>
</template>

<script>

import {ElNotification} from "element-plus";

function formatLink(link) {
  let requestLink = link
  if (requestLink.substring(0, 7) !== "http://" && requestLink.substring(0, 8) !== 'https://') {
    requestLink = "http://" + requestLink
  }
  return requestLink
}

import apps from './apps'
import color from "@/popup/components/App/AppStore/color";
import utils from "@/utils/funcs"

const diyCategoryId = 7

const defaultDiyApp = {
  link: '',
  name: '',
  wordIcon: '',
  wordIconColor: color[0].color,
  onlineIcon: '',
}

const searchCateIdentify = 'search'

export default {
  name: "AppStore",
  methods: {
    async search(e) {
      e.preventDefault()
      let that = this
      let result = await this.$http.get("/app/search?keyword=" + this.keyword)
      if (result.status !== 200) {
        ElNotification({
          title: '搜索失败',
          message: result.statusText,
          type: 'error',
          position: 'top-left',
          duration: 2000,
        })
        return
      }
      let apps = []
      for (let key in result.data.data) {
        let item = result.data.data[key]
        apps.push({
          id: item.id,
          name: item.title,
          icon: item.icon,
          link: item.target,
          desc: item.desc,
        })
      }
      that.apps[searchCateIdentify] = {list: apps}
      that.selectedCategory = searchCateIdentify
    },
    selectCategory(category) {
      this.selectedCategory = category.id
      this.selectedCategoryObj = category
    },
    install(app) {
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
    getWebsiteTitle() {
      let that = this
      if (this.diyApp.link !== "") {
        let requestLink = this.diyApp.link
        requestLink = formatLink(requestLink)
        let url = new URL(requestLink)
        this.diyApp.onlineIcon = url.origin + "/favicon.ico"
        this.$http.get(requestLink).then((res) => {
          if (res.status === 200) {
            let title = utils.getTitleFromHTML(res.data)
            if (title !== "") {
              that.diyApp.name = title
            }
          }
        })
      }
    },
    addDiyApp() {
      let app = {
        id: new Date().getTime(),
        name: this.diyApp.name,
        icon: this.diyApp.onlineIcon,
        app: '',
        link: formatLink(this.diyApp.link),
        background: this.diyApp.wordIconColor,
        iconType: this.diyApp.iconType
      }
      if (app.iconType === '') {
        app.iconType = 'word'
      }
      this.$store.commit('addApp', app)
      this.diyApp = {
        link: defaultDiyApp.link,
        name: defaultDiyApp.name,
        wordIcon: defaultDiyApp.wordIcon,
        wordIconColor: defaultDiyApp.wordIconColor,
        onlineIcon: defaultDiyApp.onlineIcon,
      }
    }
  },
  computed: {
    selectedApp() {
      let result = []
      for (let v in this.apps[this.selectedCategory].list) {
        let item = this.apps[this.selectedCategory].list[v]
        item.installed = this.installedApp[item.id]
        result.push(item)
      }
      return result
    }
  },
  data() {
    return {
      selectedCategoryObj: null,
      selectedCategory: diyCategoryId,
      categoryList: apps.category,
      apps: apps.apps,
      installedApp: this.$store.getters.installedAppID,
      diyCategoryId: diyCategoryId,
      diyApp: {
        link: defaultDiyApp.link,
        name: defaultDiyApp.name,
        wordIcon: defaultDiyApp.wordIcon,
        wordIconColor: defaultDiyApp.wordIconColor,
        onlineIcon: defaultDiyApp.onlineIcon,
        iconType: '',
      },
      colors: color,
      keyword: '',
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
    flex: 9;
    padding-top: 3.4%;
    display: flex;
    flex-wrap: wrap;
    justify-items: left;
    flex-direction: row;
    align-items: flex-start;
    align-content: flex-start;
    overflow-y: scroll;
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
    height: 61%;
    position: relative;
    background: white;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 7px;
  }
  .app-icon {
    width: 60px;
    height: 60px;
    float: left;
    overflow: hidden;
    position: absolute;
    border-radius: 7px;
    top: -25px;
    background: white;
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
    margin-left: 64px;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: bold;
    /*float: left;*/
  }
  .app-desc {
    width: 95%;
    margin-top: 10px;
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
  .app-input {
    width: 90%;
    text-align: left;
    margin: 0 auto;
    font-size: 14px;
    margin-bottom: 43px;

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
    /*margin-top: 25px;*/
  }
  .app-icon-shower {
    width: 70px;
    height: 70px;
    float: left;
    margin-right: 10px;
    color: white;
    align-items: center;
    text-align: center;
    line-height: 70px;
    font-size: 25px;
    font-weight: bolder;
    overflow: hidden;
    border-radius: 5px;
    position: relative;
  }
  .select-icon-color {
    display: flex;
    width: 90%;
    margin: 0 auto;
    height: 34px;
    margin-top: 43px;
    clear: both;
    justify-content: space-between;
  }
  .color-shower {
    width: 25px;
    height: 25px;
    border-radius: 4px;
  }
  .opt-container {
    width: 90%;
    margin: 0 auto;
    margin-top: 70px;
  }
  .submit-app {
    width: 25%;
    height: 40px;
    /*margin-left: 5%;*/
    background: #42b983;
    border-radius: 7px;
    font-size: 15px;
    line-height: 40px;
    color: white;
  }
  .title {
    width: 90%;
    margin: 0 auto;
    font-weight: bold;
    text-align: left;
    font-size: 20px;
    margin-bottom: 25px;
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
</style>