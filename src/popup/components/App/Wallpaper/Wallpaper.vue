<template>
  <div class="wallpaper-app">
    <div class="config-set">
      <div class="wallpaper-shower no-need-dark" @mouseenter="hoverWallpaper=true" @mouseleave="hoverWallpaper=false">
        <div v-if="!hoverWallpaper" class="cover" :style=" 'backdrop-filter: ' + backgroundBlur"></div>
        <div v-else class="cover" style="cursor: pointer">
          <div class="set-wallpaper" @click="$router.push({name: 'wallmarket', params: {fromWallpaper: true}})">
            更换壁纸
          </div>
        </div>
      </div>
      <div class="wallpaper-setting">
        <div class="setting-name">
          <cycle-movement theme="outline" size="18" fill="#777" :strokeWidth="4"/>
          <span class="setting-title">位置模式</span>
        </div>
        <div class="position-shower">
          <div :class="'position '  + (position.id === configWallpaperPosition.id? 'active': '')" v-for="(position, index) in positions"
              :key="index"
              @click="selectPos(position)">
            <img :src="position.icon" style="width: 100%; height: 100%">
          </div>
        </div>
      </div>
      <div class="wallpaper-setting">
        <div class="setting-name">
          <mosaic theme="outline" size="18" fill="#777" :strokeWidth="2"/>
          <span class="setting-title">遮罩模糊</span>
        </div>
        <el-slider :min="0"
                   :max="10"
                   :step="0.01"
                   :show-tooltip="false"
                   v-model="coverBlur"
                   @input="changeCoverBlur"
                   :size="'small'"
                   class="blur-slider cover-setting">
        </el-slider>
      </div>
    </div>
  </div>
</template>

<script>

import {CycleMovement, Mosaic} from '@icon-park/vue-next'

export default {
  name: "WallpaperCom",
  components: {
    CycleMovement,
    Mosaic,
  },
  watch: {
    configWallpaperPosition(val) {
      this.$store.commit('setWallpaper', {
        url: this.$store.getters.config.wallpaper.url,
        position: val,
      })
    },
  },
  computed: {
    backgroundImg() {
      return 'url(' + this.$store.getters.config.wallpaper.url + ')'
    },
    size() {
      return this.configWallpaperPosition.size
    },
    position() {
      return this.configWallpaperPosition.position
    },
    backgroundBlur() {
      return 'blur(' + this.coverBlur + 'px)'
    },
    showerStyle() {
      let  style = 'background-position: ' + this.configWallpaperPosition.size + ';'
      style += ' background-size: ' + this.configWallpaperPosition.position + ';'
      return style
    }
  },
  methods: {
    changeCoverBlur(val) {
      this.$store.commit('setCoverBlur', val)
    },
    selectPos(pos) {
      this.configWallpaperPosition = pos
    }
  },
  data() {
    return {
      coverBlur: this.$store.getters.wallpaper.blur,
      configWallpaperPosition: this.$store.getters.config.wallpaper.position,
      positions: [
        {
          id: 1,
          size: "bottom",
          position: "cover",
          icon: require("@/assets/icon/inherit_contain.png")
        },
        {
          id: 2,
          size: "inherit",
          position: "cover",
          icon: require("@/assets/icon/inherit_cover.png")
        },
        {
          id: 3,
          size: "center",
          position: "contain",
          icon: require("@/assets/icon/center_contain.png")
        },
        {
          id: 4,
          size: "center",
          position: "cover",
          icon: require("@/assets/icon/center_cover.png")
        }
      ],
      hoverWallpaper: false,
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
  .config-set {
    width: 80%;
    height: 90%;
    text-align: left;
    margin: 34px auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .config-set span {
    display: block;
    font-size: 13px;
    color: #5f5f5f;
    /* margin-top: 34px; */
  }
  .wallpaper-shower {
    width: 100%;
    /*height: 200px;*/
    padding-top: 47%;
    background-image: v-bind(backgroundImg);
    background-repeat: no-repeat;
    background-position: v-bind(size);
    background-size: v-bind(position);
    box-shadow: 1px 1px 7px rgba(4, 4, 4, 0.16);
    position: relative;
    border-radius: 7px;
    overflow: hidden;
  }
  .position-shower {
    width: 100%;
    /* margin-top: 7px; */
    display: flex;
    justify-content: space-between;
    justify-items: center;
  }
  .position {
    margin-right: 16px;
    width: 70px;
    height: 70px;
    box-shadow: 1px 1px 7px rgba(106, 106, 106, 0.25);
    background: rgba(178, 176, 176, 0.25);
    border-radius: 7px;
    overflow: hidden;
  }
  .cover-setting {
    width: 100%;
    height: 10px;
    /* margin-top: 10px; */
    font-size: 12px !important;
  }
  .cover {
    width: 100%;
    height: 100%;
  }
  .blur-slider {
    width: 100%;
    height: 16px;
  }
  .set-wallpaper {
    position: absolute;
    width: 70px;
    height: 34px;
    margin:auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: white;
    line-height: 34px;
    text-align: center;
    border-radius: 2px;
    box-shadow: 1px 1px 7px white;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
  }
  .setting-name {
    display: flex;
    margin-bottom: 1vw;
    align-content: center;
    align-items: center;
  }
  .setting-title {
    /* margin-left: 1vw; */
    margin-left: 7px;
  }
</style>