<template>
  <a :href="link" id="dock-item">
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
  created() {
    this.itemSize = this.size + 'px'
    this.iconSize = Math.ceil(this.size * 0.8) + "px"
    this.zoomSize = Math.ceil(this.size * 1.5) + "px"
    console.log(this.zoomSize)
  },
  data() {
    return {
      zoomSize: "",
      itemSize: "",
      iconSize: ""
    }
  }
}
</script>

<style scoped>
  #dock-item {
    width: v-bind(itemSize);
    height: v-bind(itemSize);
  }
  a:link {
    color: black;
  }
  a:visited {
    color: black;
  }
  a:hover {
    background: red;
    width: v-bind(zoomSize);
  }
  a {
    text-decoration: none;
  }
  .icon-container {
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    margin: 0 auto;
    overflow: hidden;
    border-radius: 10px;
  }
  .title-container {
    margin-top: 3px;
    font-weight: bold;
  }
</style>