<template>
  <div class="history-app">

  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "HistoryCom",
  created() {
    chrome.runtime.sendMessage({do: "getHistory"}, function(response) {
      console.log(response);
    });
  }
}
</script>

<style scoped>
  .history-app {
    width: 100%;
    height: 100%;
    background: red;
  }
</style>