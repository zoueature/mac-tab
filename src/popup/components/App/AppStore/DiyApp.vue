<template>
    <div class="diy-app">
      <div class="title diy-title">
        自定义应用
      </div>
      <div class="app-input">
        <div>地址</div>
        <input placeholder="http://" v-model="diyApp.link" @focusout="getWebsiteTitle" @keyup.enter="getWebsiteTitle" class="input-item">
      </div>
      <div class="app-input">
        <div>名称</div>
        <input placeholder="输入名称" v-model="diyApp.name" class="input-item">
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
          <check theme="outline" size="20" fill="#fff" :strokeWidth="2" v-if="diyApp.wordIconColor === color.color"/>
        </div>
      </div>
      <div class="opt-container">
        <div class="submit-app" @click="addDiyApp">添加</div>
      </div>
    </div>
</template>

<script>

import color from "@/popup/components/App/AppStore/color";
import utils from "@/utils/funcs"
import {Check} from "@icon-park/vue-next"

function formatLink(link) {
  let requestLink = link
  if (requestLink.substring(0, 7) !== "http://" && requestLink.substring(0, 8) !== 'https://') {
    requestLink = "http://" + requestLink
  }
  return requestLink
}

const defaultDiyApp = {
  link: '',
  name: '',
  wordIcon: '',
  wordIconColor: color[0].color,
  onlineIcon: '',
}

export default {
  name: "DiyApp",
  components: {
    Check,
  },
  methods: {
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
      if (app.iconType === 'word') {
        app.icon = ''
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
  data() {
    return {
      diyApp: {
        link: defaultDiyApp.link,
        name: defaultDiyApp.name,
        wordIcon: defaultDiyApp.wordIcon,
        wordIconColor: defaultDiyApp.wordIconColor,
        onlineIcon: defaultDiyApp.onlineIcon,
        iconType: '',
      },
      colors: color,
    }
  }
}
</script>

<style scoped>
  .app-input {
    width: 90%;
    text-align: left;
    margin: 0 auto;
    font-size: 14px;
  }
  .app-input input {
    margin-top: 10px;
    border: none;
    outline: none;
    height: 25px;
    width: 70%;
    background: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    font-size: 15px;
  }
  .input-item::placeholder {
    color: rgba(0, 0, 0, 0.2)
  }
  .select-app-icon {
    width: 90%;
    margin: 0 auto;
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
    clear: both;
    justify-content: space-between;
  }
  .color-shower {
    width: 25px;
    height: 25px;
    border-radius: 4px;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .opt-container {
    width: 90%;
    margin: 0 auto;
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
    font-size: 25px;
    /* margin-bottom: 25px; */
  }
  .diy-title {
    font-size: 20px;
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