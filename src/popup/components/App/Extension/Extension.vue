<template>
  <div class="extension-app">
    <div class="extension-item" v-for="extension in extensions" :key="extension.id">
      <div class="extension-info">
        <div class="extension-icon">
          <img :src="extension.icons === undefined ? '../../../../assets/icon/logo.png' : extension.icons[extension.icons.length-1]?.url ?? ''" alt="" width="100%" height="100%">
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
import {ElSwitch} from "element-plus";
import runtime from "@/chrome/runtime";


export default {
  name: "ExtensionCom",
  components: {
    ElSwitch,
  },
  created() {
    let that = this
    runtime.requestChromeApi("getSelfExtension", {}, function (item) {
      that.selfID = item.id
    })
    runtime.requestChromeApi("getExtension", {}, function (response) {
      that.extensions = response
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
      runtime.requestChromeApi(doOp,  {id: extension.id})
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
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.02);
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
    border-radius: 16%;
    overflow: hidden;
    border: 1px solid rgba(193, 192, 192, 0.02);
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