<template>
  <div class="weather-app">
    <iframe src="https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=auto&key=6dfbb01bdc16466193f1c2789dd7ee44&v=_1650435393003"></iframe>
  </div>
</template>

<script>
export default {
  name: "WeatherCom"
}
</script>

<style scoped>
.weather-app {
  width: 100%;
  height: 100%;
}
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
</style>