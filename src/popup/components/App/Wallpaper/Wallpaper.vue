<template>
  <div class="wallpaper-app">
    <div class="wallpaper-item"
         v-for="(wallpaper, index) in wallpapers"
         :key="wallpaper"
         @mouseenter="hover(index)"
         @mouseleave="leave"
    >
      <img :src="wallpaper.thumb" alt="wallpaper" style="width: 100%; height: 100%">
      <div class="hover" v-if="index === hoverIndex">
        <div class="set-button" @click="setWallpaper(wallpaper.url)">
          <img src="../../../../assets/icon/done_fill.png" style="width: 100%; height: 100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WallpaperCom",
  methods: {
    hover(index) {
      this.hoverIndex = index
    },
    leave() {
      this.hoverIndex = -1
    },
    setWallpaper(src) {
      let img = new Image()
      img.src = src
      let that = this
      // todo 加loading
      img.onload = function () {
        console.log(123)
        that.$store.commit('setWallpaper', src)
      }
    }
  },
  data() {
    return {
      hoverIndex: -1,
      wallpapers: [
        {
          thumb: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVza3RvcCUyMHdhbGxwYXBlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3017&q=80"
        },
        {
          thumb: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVza3RvcCUyMHdhbGxwYXBlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        },
        {
          thumb: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGVza3RvcCUyMHdhbGxwYXBlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        },
        {
          thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVza3RvcCUyMHdhbGxwYXBlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2946&q=80"
        },
        {
          thumb: "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGRlc2t0b3AlMjB3YWxscGFwZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        },
        {
          thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGRlc2t0b3AlMjB3YWxscGFwZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        },
        {
          thumb: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGRlc2t0b3AlMjB3YWxscGFwZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        },
        {
          thumb: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGRlc2t0b3AlMjB3YWxscGFwZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2744&q=80"
        },
        {
          thumb: "https://images.unsplash.com/photo-1620120966883-d977b57a96ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGRlc2t0b3AlMjB3YWxscGFwZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1620120966883-d977b57a96ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        },
        {
          thumb: "https://images.unsplash.com/photo-1614200202465-edf2c6127983?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGRlc2t0b3AlMjB3YWxscGFwZXJzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
          url: "https://images.unsplash.com/photo-1614200202465-edf2c6127983?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        },
      ]
    }
  }
}
</script>

<style scoped>
  div::-webkit-scrollbar {
    display: none;
  }
  .wallpaper-app {
    width: 100%;
    /*height: 100%;*/
    display: flex;
    /*justify-content: space-between;*/
    justify-items: left;
    flex-wrap: wrap;
    overflow: scroll;
  }
  .wallpaper-item {
    position: relative;
    width: 24%;
    height: 100px;
    margin-left: 0.5%;
    margin-right: 0.5%;
    margin-bottom: 10px;
  }
  .hover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    backdrop-filter: blur(2px);
  }
  .set-button {
    width: 34px;
    height: 34px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>