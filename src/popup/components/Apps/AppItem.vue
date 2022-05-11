<template>
  <div id="dock-item" @click="handler" :class="dockItemClass" @click.right.stop="startEditApp">
    <div class="icon-container" :style="iconBorder ? 'border: 1px solid white;': '' ">
      <div v-if="type === 'app'" style="width: 100%; height: 100%;">
        <img :src="icon" :alt="name" style="width: 100%; height: 100%;" @error="loadIconSucc=false" v-if="loadIconSucc && icon !== '' && icon !== undefined"/>
        <div v-else class="icon-word-container" :style="'background: ' + (background !== undefined? background: 'blue') ">
          {{name.substring(0, 3)}}
        </div>
      </div>
      <slot v-else></slot>
    </div>
    <div class="title-container" :style="'font-size: ' + (size/10) + 'px;'">
      {{name}}
    </div>
    <div class="delete-icon" v-if="inEditApp" @click.stop="removeApp">
      <img src="../../../assets/icon/close.png" style="width: 50%; height: 50%">
    </div>
  </div>
</template>

<script>

export default {
  name: "DockItem",
  props: [
    "id",
    "size",
    "icon",
    "name",
    "link",
    "iconBorder",
    "click",
    "background",
    "type",
    "app",
    "params"
  ],
  created() {
    if (typeof this.click === "function") {
      this.clickHandler = this.click
    }
    this.appLink = this.link
    this.appId = this.id
  },
  computed: {
    dockItemClass() {
      return this.clickApp ? 'click' : null
    },
    itemSize() {
      let size = this.$store.getters.appSize
      return size + 'px'
    },
    iconSize() {
      return Math.ceil(this.$store.getters.appSize * 0.8) + "px"
    },
    inEditApp() {
      return this.$store.getters.inEditApp
    },
  },
  methods: {
    startEditApp(ev) {
      ev.preventDefault()
      this.$store.commit('startEditApp')
      // this.inOpt = true
    },
    removeApp() {
      console.log(this.appId)
      this.$store.commit('removeApp', {id: this.appId})
      this.inOpt = false
    },
    handler() {
      if (this.inOpt) {
        return
      }
      this.clickApp = true
      let that = this
      setTimeout(
          () => that.clickApp = false,
          100
      )
      if (this.appLink !== null && this.appLink !== undefined && this.appLink !== "") {
        window.location.href = this.appLink
        return;
      } else if (typeof this.app === "string" && this.app !== "") {
        console.log({
          name: this.app,
          params: this.params,
        })
        this.$router.replace({
          name: this.app,
          params: this.params,
        })
        this.$store.commit('openApp')
      }
      // this.clickHandler()
      this.$store.commit('closeFolder')
    },
  },
  data() {
    return {
      clickHandler: function (){},
      clickApp: false,
      appLink: "",
      // inOpt: this.$store.getters.inEditApp,
      appId: 0,
      loadIconSucc: true,
    }
  }
}
</script>

<style scoped>
  #dock-item {
    width: v-bind(itemSize);
    height: v-bind(itemSize);
    /*animation: shake 500ms infinite linear alternate;*/
    user-select: none;
    position: relative;
  }
  .click {
    transform: translate(2px, 2px);
  }
  @keyframes shake {
    from {
      transform: rotate(-10deg);
    }
    to {
      transform: rotate(10deg);
    }
  }
  .enlarge {
    transform: scale(1.5);
  }
  .border {
    border: 1px solid #FFFFFF;
  }
  .white {
    color: #FFFFFF;
  }
  .icon-container {
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    margin: 0 auto;
    overflow: hidden;
    border-radius: 14px;
    backdrop-filter: blur(250px);
  }
  .icon-word-container {
    color: white;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 25px;
    line-height: v-bind(iconSize);
  }
  .title-container {
    margin-top: 3px;
    font-size: 12px;
    color: white;
    #font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .delete-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(255, 0, 0, 0.88);
    border-radius: 100%;
    overflow: hidden;
  }
  .delete-icon img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>