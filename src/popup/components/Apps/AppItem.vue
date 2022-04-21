<template>
  <div id="dock-item" @click="handler" :class="dockItemClass">
      <div class="icon-container" :style="iconBorder ? 'border: 1px solid white;': '' ">
        <div v-if="icon !== '' && icon !== undefined ">
          <img :src="icon" :alt="name" style="width: 100%; height: 100%;"/>
        </div>
        <slot v-else></slot>
      </div>
      <div class="title-container" :style="'font-size: ' + (size/10) + 'px;'">
        {{name}}
      </div>
  </div>
</template>

<script>
export default {
  name: "DockItem",
  props: [
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
    goto() {
      window.location.href = this.appLink
    },
    handler() {
      this.clickApp = true

      let that = this
      setTimeout(
          () => that.clickApp = false,
          200
      )
      if (this.appLink !== null && this.appLink !== undefined && this.appLink !== "") {
        return this.goto
      }

      this.clickHandler()
    },
  },
  data() {
    return {
      clickHandler: null,
      clickApp: false,
      appLink: "",
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
  }
</style>