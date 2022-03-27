<template>
  <div id="dock-item"  :class="itemClass" @click="goto">
      <div :class="iconClass">
        <img :src="icon" :alt="name" style="width: 100%; height: 100%;"/>
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
    "type",
    "size",
    "icon",
    "name",
    "link",
    "slotName",
    "hover",
    "disable",
    "margin",
    'ratio'
  ],
  created() {
    this.appType = this.type
    this.itemSize = this.size + 'px'
    this.itemWidth = this.size * this.ratio + 'px'
    this.iconSize = Math.ceil(this.size * 0.6) + "px"
    this.disableScale = this.disable
    this.slot = this.slotName
    if (this.margin !== undefined) {
      this.itemMargin = this.margin
    }
  },
  computed: {
    itemClass() {
      let cls = ""
      if (this.appType === 'operate') {
        cls += ' white'
      }
      return cls
    },
    iconClass() {
      let cls = 'icon-container'
      if (this.appType === 'operate') {
        cls += ' border'
      }
      return cls
    }
  },
  methods: {
    goto() {
      window.location.href = this.link
    }
  },
  data() {
    return {
      appType: 'app',
      itemSize: "",
      itemWidth: '',
      iconSize: "",
      itemMargin: 25,
      slot: "",
    }
  }
}
</script>

<style scoped>
  #dock-item {
    width: v-bind(itemWidth);
    height: v-bind(itemSize);
    /*animation: shake 500ms infinite linear alternate;*/
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
    border-radius: 10px;
  }
  .title-container {
    margin-top: 3px;
    font-size: 12px;
    color: white;
    #font-weight: bold;
  }
</style>