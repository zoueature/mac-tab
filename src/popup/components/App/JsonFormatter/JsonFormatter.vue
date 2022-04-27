<template>
  <div class="json-app">
    <div class="input-container">
      <textarea class="input-area"
                v-model="inputStr"
                autofocus
                placeholder="输入JSON字符串"
      >
      </textarea>
    </div>
    <div class="opt-container">
      <div class="submit-button" @click="format">
        <img src="../../../../assets/icon/beauty.png" alt="" style="width: 18px; height: 15px; margin-top: 8px">
      </div>
      <div class="reset-button" @click="reset">
        <img src="../../../../assets/icon/reset.png" alt="" style="width: 18px; height: 18px; margin-top: 7px">
      </div>
      <div class="err-reason">
        {{errMsg}}
      </div>
    </div>
  </div>
</template>

<script>

const stringifyJson = require("json-stringify-pretty-compact");

export default {
  name: "JsonFormatter",
  data() {
    return {
      inputStr: "",
      errMsg: '',
    }
  },
  methods: {
    format() {
      try {
        let jsonObj = JSON.parse(this.inputStr)
        this.inputStr = stringifyJson(jsonObj)
        this.errMsg = ''
      } catch (e) {
        this.errMsg = e.toString()
      }
    },
    reset() {
      this.inputStr = ""
    }
  }
}
</script>

<style scoped>
  .json-app {
    width: 100%;
    height: 95%;
    margin-top: 5%;
  }
  .input-container {
    width: 98%;
    height: 88%;
    margin: 0 auto;
    box-shadow: 2px 2px 7px grey;
  }
  .input-area {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
  .opt-container {
    width: 98%;
    align-items: center;
    margin: 0 auto;
  }
  .submit-button, .reset-button {
    width: 60px;
    height: 30px;
    margin-top: 2%;
    background: #26c2ef;
    border-radius: 10px;
    float: right;
    margin-left: 10px;
  }
  .reset-button {
    background: #dc3232;
  }
  .err-reason {
    float: left;
    width: 70%;
    height: 30px;
    line-height: 30px;
    margin-top: 2%;
    color: #b71a1a;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
</style>