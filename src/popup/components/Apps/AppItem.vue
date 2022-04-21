<template>
  <div id="dock-item" @click="handler" :class="dockItemClass" @mousedown="down" @mouseup="up">

    <div class="icon-container" :style="iconBorder ? 'border: 1px solid white;': '' ">
      <div v-if="icon !== '' && icon !== undefined ">
        <img :src="icon" :alt="name" style="width: 100%; height: 100%;"/>
      </div>
      <slot v-else></slot>
    </div>
    <div class="title-container" :style="'font-size: ' + (size/10) + 'px;'">
      {{name}}
    </div>
    <div class="delete-icon" v-if="inOpt" @click.stop="removeApp">
      <img src="../../../assets/icon/close.png" style="width: 50%; height: 50%">
    </div>
  </div>
</template>

<script>
let timer

export default {
  name: "DockItem",
  props: [
    "id",
    "size",
    "icon",
    "name",
    "link",
    "iconBorder",
    "click"
  ],
  created() {
    this.clickHandler = this.click
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
    }
  },
  methods: {
    removeApp() {
      this.$store.commit('removeApp', {id: this.appId})
      this.inOpt = false
    },
    down() {
      let that = this
      timer = setTimeout(
          () => {
            that.inOpt = true
          },
          700
      )
    },
    up() {
      clearTimeout(timer)
    },
    handler() {
      if (this.inOpt) {
        return
      }
      this.clickApp = true
      let that = this
      setTimeout(
          () => that.clickApp = false,
          200
      )
      if (this.appLink !== null && this.appLink !== undefined && this.appLink !== "") {
        window.location.href = this.appLink
        return;
      }

      this.clickHandler()
    },
  },
  data() {
    return {
      clickHandler: ()=>{},
      clickApp: false,
      appLink: "",
      inOpt: false,
      appId: 0,
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
    transform: translate(4px, 4px);
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
    background: red;
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