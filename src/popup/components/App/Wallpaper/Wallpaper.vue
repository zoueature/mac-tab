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
      this.$store.commit('openLoading')
      img.onload = function () {
        that.$store.commit('closeLoading')
        that.$store.commit('setWallpaper', src)
      }
    }
  },
  data() {
    return {
      hoverIndex: -1,
      wallpapers: [
        {
          thumb: "https://img1.baidu.com/it/u=3701747776,893088473&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fd.zdqx.com%2Fmeitui_20190717%2F006.jpg&refer=http%3A%2F%2Fd.zdqx.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653125712&t=f435db6a5885c48efc167a9f34c0b786"
        },
        {
          thumb: "https://img0.baidu.com/it/u=1707027638,949397941&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2020-06-04%2F5ed8a4d473b6d.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653125754&t=c407529b16cd49264268d849ad12d4a0"
        },
        {
          thumb: "https://img0.baidu.com/it/u=920813101,2589189775&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fd95245a4c2144da52cf2fa875799180d8af9132d.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653125871&t=15e3943d9ce344de38f1b70f267c21ab",
        },
        {
          thumb: "https://img0.baidu.com/it/u=1853780514,3985249021&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F64d271e74908e322992de7c57c3aa9ba9d93f4d7.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653125963&t=92b2a458ddffe5ea1534351370f4db06"
        },
        {
          thumb: "https://img0.baidu.com/it/u=2219754784,149187514&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F86%2Fca%2F14%2F86ca14a61b11132d7dcf1bce940369cc.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653126332&t=b0898c1aaa083f4c7bb14739de36223a"
        },
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
    height: 98%;
    display: flex;
    /*justify-content: space-between;*/
    justify-items: left;
    flex-wrap: wrap;
    overflow: scroll;
  }
  .wallpaper-item {
    position: relative;
    width: 23.6%;
    height: 100px;
    margin-left: 0.7%;
    margin-right: 0.7%;
    margin-bottom: 10px;
  }
  .hover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(1px);
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