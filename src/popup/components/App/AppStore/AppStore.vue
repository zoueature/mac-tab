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
        <input placeholder="http://" v-model="diyApp.link" @focusout="getWebsiteTitle" @keyup.enter="getWebsiteTitle">
      </div>
      <div class="app-input">
        <div>名称</div>
        <input placeholder="输入名称" v-model="diyApp.name">
      </div>
      <div class="select-app-icon">
        <div class="app-icon-shower" :style="'background: ' + diyApp.wordIconColor">
          {{diyApp.name.substring(0,2)}}
        </div>
        <div class="app-icon-shower">
         <img :src="diyApp.onlineIcon" style="width: 100%; height: 100%" v-if="diyApp.onlineIcon !== ''">
        </div>
      </div>
      <div class="select-icon-color">
        <div class="color-shower" v-for="(color, index) in colors"
             :key="index"
             :style="'background: ' + color.color"
             @click="diyApp.wordIconColor = color.color"
        ></div>
      </div>
      <div class="submit-app" @click="addDiyApp">添加</div>
    </div>
  </div>
</template>

<script>

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
    },
    getWebsiteTitle() {
      let that = this
      if (this.diyApp.link !== "") {
        let requestLink = this.diyApp.link
        requestLink = formatLink(requestLink)
        this.diyApp.onlineIcon = requestLink + "/favicon.ico"
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
        id: new Date().getDate(),
        name: this.diyApp.name,
        icon: this.diyApp.onlineIcon,
        app: '',
        link: formatLink(this.diyApp.link),
        background: this.diyApp.wordIconColor,
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
        link: defaultDiyApp.link,
        name: defaultDiyApp.name,
        wordIcon: defaultDiyApp.wordIcon,
        wordIconColor: defaultDiyApp.wordIconColor,
        onlineIcon: defaultDiyApp.onlineIcon,
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
    flex: 3.7;
    padding-top: 3.4%;
    /*box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.27);*/
    background: rgba(227, 225, 225, 0.49);
  }
  .search {
    width: 100%;
    height: 34px;
    margin: 10px auto 10px auto;
  }
  .search input {
    width: 88%;
    padding-left: 5%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 13px;
    /*box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.35);*/
  }
  .category-item {
    width: 100%;
    height: 35px;
    margin-top: 7px;
    cursor: pointer;
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
    width: 25px;
    height: 25px;
  }
  .category-icon img {
    width: 100%;
    height: 100%;
  }
  .category-name {
    margin-left: 16px;
    line-height: 35px;
    font-weight: bold;
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
    /*font-weight: bolder;*/
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
    cursor: pointer;
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
  }
  .select-icon-color {
    display: flex;
    width: 90%;
    margin: 0 auto;
    height: 34px;
    margin-top: 52px;
    clear: both;
    justify-content: space-between;
  }
  .color-shower {
    width: 25px;
    height: 25px;
    border-radius: 4px;
  }
  .submit-app {
    margin-top: 70px;
    width: 34%;
    height: 40px;
    /*margin-left: 5%;*/
    background: #42b983;
    border-radius: 7px;
    font-size: 15px;
    line-height: 40px;
    color: white;
  }
</style>