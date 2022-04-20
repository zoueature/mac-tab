<template>
  <div id="dock-item" @click="handler">
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
    this.itemSize = this.size + 'px'
    this.iconSize = Math.ceil(this.size * 0.8) + "px"
    this.clickHandler = this.click
  },
  computed: {
    handler() {
      console.log(this.link, this.clickHandler)
      if (this.link !== null && this.link !== undefined && this.link !== "") {
        return this.goto
      }
      return this.clickHandler
    }
  },
  methods: {
    goto() {
      window.location.href = this.link
    }
  },
  data() {
    return {
      itemSize: "",
      iconSize: "",
      clickHandler: null,
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