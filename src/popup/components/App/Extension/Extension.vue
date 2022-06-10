<template>
  <div class="extension-app">
    <div class="extension-item" v-for="extension in extensions" :key="extension.id">
      <div class="extension-info">
        <div class="extension-icon">
          <img :src="extension.icons === undefined ? 'https://img1.baidu.com/it/u=4216761644,15569246&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500' : extension.icons[2]['url'] ?? ''" alt="" width="100%" height="100%">
        </div>
        <div class="extension-name">
          {{extension.name}}<br>
          <span class="extension-desc">{{extension.description.substring(0, 37)}}</span>
        </div>
      </div>
      <el-switch v-model="extension.enabled" @change="toggleEnable(extension)" :disabled="selfID === extension.id"/>
    </div>
  </div>
</template>

<script>
/*description: "It's a browser and editor for JSON document.You can get a beautiful view"
enabled: true
homepageUrl: "https://chrome.google.com/webstore/detail/iahnhfdhidomcpggpaimmmahffihkfnj"
hostPermissions: ['chrome://favicon/*']
icons: Array(3)
0: {size: 16, url: 'chrome://extension-icon/iahnhfdhidomcpggpaimmmahffihkfnj/16/0'}
1: {size: 48, url: 'chrome://extension-icon/iahnhfdhidomcpggpaimmmahffihkfnj/48/0'}
2: {size: 128, url: 'chrome://extension-icon/iahnhfdhidomcpggpaimmmahffihkfnj/128/0'}
length: 3
[[Prototype]]: Array(0)
id: "iahnhfdhidomcpggpaimmmahffihkfnj"
installType: "normal"
isApp: false
mayDisable: true
name: "JSON-handle"
offlineEnabled: true
optionsUrl: "chrome-extension://iahnhfdhidomcpggpaimmmahffihkfnj/options.html"
permissions: (3) ['contextMenus', 'tabs', 'webRequest']
shortName: "JSON-handle"
type: "extension"
updateUrl: "https://clients2.google.com/service/update2/crx"
version: "0.6.2"*/

import {ElSwitch} from "element-plus";
import runtime from "@/chrome/runtime";

/* eslint-disable */

export default {
  name: "ExtensionCom",
  components: {
    ElSwitch,
  },
  created() {
    let that = this
    runtime.requestChromeApi("getSelfExtension", function (item) {
      that.selfID = item.id
      console.log(item)
    })
    chrome.runtime.sendMessage({
      do: "getExtension",
      param: {start: this.startTime, end: this.endTime}
    }, function (response) {
      that.extensions = response
      console.log(that.extensions)
    })
  },
  data() {
    return {
      selfID: '',
      extensions: [

      ]
    }
  },
  methods: {
    toggleEnable(extension) {
      let doOp = ""
      if (extension.enabled) {
        doOp = "enableExtension"
      } else {
        doOp = "disableExtension"
      }
      chrome.runtime.sendMessage({
        do: doOp,
        param: {id: extension.id}
      }, function (response) {
        console.log(response)
      })
      console.log(extension)
    }
  }
}
</script>

<style scoped>
  .extension-app {
    width: 100%;
    height: 95%;
    margin-top: 5%;
    overflow-y: scroll;
  }
  .extension-item {
    width: 90%;
    margin: 0 auto 16px auto;
    height: 60px;
    padding-right: 16px;
    background: rgba(222, 220, 220, 0.56);
    display: flex;
    justify-content: space-between;
    justify-items: center;
    align-items: center;
    align-content: flex-start;
    border-radius: 2px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.16);
  }
  .extension-item:last-child {
    margin-bottom: 25px;
  }
  .extension-info {
    display: flex;
    justify-content: start;
    justify-items: center;
    align-items: center;
    align-content: flex-start;
  }
  .extension-icon {
    width: 43px;
    height: 43px;
    margin-left: 16px;
    border-radius: 100%;
    overflow: hidden;
    border: 1px solid rgba(193, 192, 192, 0.7);
  }
  .extension-name {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 15px;
    align-content: start;
    text-align: start;
  }
  .extension-desc {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.61);
  }
</style>