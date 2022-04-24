<template>
  <div class="wallpaper-app">
    <div class="wallpaper-header">
      <input placeholder="输入关键词" value="动漫">
      <button @click="search">搜索</button>
    </div>
    <Scroller class="wrapper"
              @pullingUp="loadingData"
              :data="wallpapers"
    >
      <div class="wallpaper-list">
        <div class="wallpaper-item"
             v-for="(wallpaper, index) in wallpapers"
             :key="wallpaper"
             @mouseenter="hover(index)"
             @mouseleave="leave"
             @scroll="wallpaperScroll"
        >
          <img :src="wallpaper.thumb" alt="wallpaper" style="width: 100%; height: 100%">
          <div class="hover" v-if="index === hoverIndex">
            <div class="set-button" @click="setWallpaper(wallpaper.url)">
              <img src="../../../../assets/icon/done_fill.png" style="width: 100%; height: 100%">
            </div>
          </div>
        </div>
      </div>
    </Scroller>
  </div>
</template>

<script>

// import BS from "better-scroll"
import Scroller from "@/popup/components/common/Scroller";

export default {
  name: "WallpaperCom",
  components: {
    Scroller,
  },
  mounted() {
  },
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
    },
    search() {
      let that = this
      this.$http.get("https://image.baidu.com/search/acjson?tn=resulttagjson&logid=10239998936165607799&ie=utf-8&fr=&word=%E7%BE%8E%E5%A5%B3%E5%A3%81%E7%BA%B8&ipn=r&fm=index&pos=history&queryWord=%E7%BE%8E%E5%A5%B3%E5%A3%81%E7%BA%B8&cl=2&lm=-1&oe=utf-8&adpicid=&st=-1&z=9&ic=0&hd=&latest=&copyright=&s=&se=&tab=&width=0&height=0&face=0&istype=2&qc=&nc=1&expermode=&nojc=&isAsync=true&pn=90&rn=70&gsm=5a&1650704573870=").then((res) => {
        if (res.status === 200) {
          let result = []
          res.data.data.forEach((v) => {
            let url = v.middleURL
            if (v.replaceUrl !== undefined && v.replaceUrl.length > 0) {
              url = v.replaceUrl[0].ObjURL
            }
            if (v.thumbURL !== "" && url !== "") {
              result.push({
                thumb: v.thumbURL,
                url: url
              })
            }
          })
          that.wallpapers = result
        }
      })
    },
    loadingData() {
      if (this.inLoading) {
        return
      }
      this.inLoading = true
      this.$store.commit('openLoading')
      let that = this
      this.$http.get("https://image.baidu.com/search/acjson?tn=resulttagjson&logid=10239998936165607799&ie=utf-8&fr=&word=%E7%BE%8E%E5%A5%B3%E5%A3%81%E7%BA%B8&ipn=r&fm=index&pos=history&queryWord=%E7%BE%8E%E5%A5%B3%E5%A3%81%E7%BA%B8&cl=2&lm=-1&oe=utf-8&adpicid=&st=-1&z=9&ic=0&hd=&latest=&copyright=&s=&se=&tab=&width=0&height=0&face=0&istype=2&qc=&nc=1&expermode=&nojc=&isAsync=true&pn=90&rn=70&gsm=5a&1650704573870=").then((res) => {
        if (res.status === 200) {
          res.data.data.forEach((v) => {
            let url = v.middleURL
            if (v.replaceUrl !== undefined && v.replaceUrl.length > 0) {
              url = v.replaceUrl[0].ObjURL
            }
            if (v.thumbURL !== "" && url !== "") {
              that.wallpapers.push({
                thumb: v.thumbURL,
                url: url
              })
            }
          })
        }
        this.inLoading = false
        this.$store.commit('closeLoading')
      })
    }
  },
  data() {
    return {
      hoverIndex: -1,
      wallpapers: [
        {
          thumb: "https://img0.baidu.com/it/u=6741688,1120193805&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091312%2Ften0xjueygrten0xjueygr.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653283225&t=982dd7f9454a392cbaa336a6f8cec0d3"
        },
        {
          thumb: "https://img1.baidu.com/it/u=262409196,3193006701&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F583e99fbe5836.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653218303&t=ac4dc45a8b47c15d5164a2acecea4600"
        },
        {
          thumb: "https://img0.baidu.com/it/u=1398182852,637093904&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg7.51tietu.net%2Fpic%2F2019-082317%2Fr5dy215xdn5r5dy215xdn5.jpg&refer=http%3A%2F%2Fimg7.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653218329&t=7e5a2326c364ef5a6848cb68ff2245c1"
        },
        {
          thumb: "https://img2.baidu.com/it/u=3868955562,4111205746&fm=253&fmt=auto&app=138&f=JPEG?w=976&h=500",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.itc.cn%2Fimages01%2F20220225%2F41e8b303af31470cb845ad4d4d2c6f3a.jpeg&refer=http%3A%2F%2Fp3.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653218438&t=1786a80aeee861d61e96d1ef31d6cd94"
        },
        {
          thumb: "https://img1.baidu.com/it/u=1246012189,4067281488&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=337",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fwatermark%2F79c1ae4361c705735eff96725e5d06dad044732d.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653145325&t=0350366eefbb8e56cb191d813182a1eb"
        },
        {
          thumb: "https://img1.baidu.com/it/u=1791424006,225103597&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-17%2F5a5f1136aa4c7.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653145202&t=89fd97c97e2cc227c5bf0f00ca12e4a7"
        },
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
      ],
      inLoading: false,
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
    overflow: hidden;
  }
  .wallpaper-header {
    width: 100%;
    height: 100px;
    background: #00c3ff;
    position: fixed;
    z-index: 10;
  }
  .wrapper {
    margin-top: 110px;
    width: 100%;
    height: 80%;
    overflow: hidden;
  }
  .wallpaper-list {
    width: 100%;
    /*height: 100%;*/
    display: flex;
    /*justify-content: space-between;*/
    justify-items: left;
    flex-wrap: wrap;
    padding-bottom: 10px;
    /*overflow: hidden;*/
  }
  .wallpaper-item {
    position: relative;
    width: 23%;
    height: 125px;
    margin-left: 1%;
    margin-right: 1%;
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