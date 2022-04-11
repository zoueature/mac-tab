<template>
  <div class="translate-app">
    <iframe height="100%" width="100%" src="https://fanyi.youdao.com/" ></iframe>
  </div>
</template>

<script>
export default {
  name: "TranslateCom"
}
</script>

<style scoped>
  .translate-app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .translate-app iframe {
    border: none;
    outline: none;
  }
</style>