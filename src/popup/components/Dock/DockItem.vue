<template>
  <a :href="link" id="dock-item" v-bind:style="/*'background:' + color + ';*/'width: ' + size + 'px; height: ' + size + 'px'">
      <div class="icon-container">
        <img :src="icon" :alt="name" style="width: 100%; height: 100%;"/>
      </div>
      <div class="title-container" :style="'font-size: ' + (size/10) + 'px;'">
        {{name}}
      </div>
  </a>
</template>

<script>
export default {
  name: "DockItem",
  props: [
    "color",
    "size",
    "icon",
    "name",
    "link"
  ],
  data() {
    return {
      zoomSize: "100px",
    }
  }
}
</script>

<style scoped>
  #dock-item {
  }
  a:link {
    color: black;
  }
  a:visited {
    color: black;
  }
  a:hover {
    background: red;
  }
  a {
    text-decoration: none;
  }
  .icon-container {
    width: 80%;
    height: 80%;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 10px;
  }
  .title-container {
    font-size: 7px;
  }
</style>