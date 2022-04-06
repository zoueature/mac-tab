<template>
  <vue-final-modal
      v-bind="$attrs"
      classes="modal-container"
      content-class="modal-content"
      overlay-class="overlay-class"
      v-model="showModal"
      :name="modalName"
  >
    <div class="modal-title" @mouseenter="showIcon" @mouseleave="hiddenIcon">
      <div class="close" @click="close">
        <img v-if="showIconTrigger" src="../../../assets/icon/close.png" alt="">
      </div>
      <div class="max" @click="max">
        <img v-if="showIconTrigger" src="../../../assets/icon/enlarge.png" alt="">
      </div>
    </div>
    <div class="modal-detail">
      <slot></slot>
    </div>
  </vue-final-modal>
</template>

<script>

const defaultWidth = '50%'
const defaultHeight = '60%'
export default {
  name: 'WindowModal',
  inheritAttrs: false,
  props:[
    "name",
    "background"
  ],
  created() {
    this.modalName = this.name
    if (this.background !== undefined) {
      this.backgroundColor = this.background
    }
  },
  data() {
    return {
      showModal: false,
      modalName: '',
      width: defaultWidth,
      height: defaultHeight,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      showIconTrigger: false,
    }
  },
  methods: {
    close() {
      this.$vfm.hide(this.modalName)
      this.width = defaultWidth
      this.height = defaultHeight
    },
    max() {
      if (this.width === defaultWidth) {
        this.width = '100%'
        this.height = '100%'
      } else {
        this.width = defaultWidth
        this.height = defaultHeight
      }
    },
    showIcon() {
      this.showIconTrigger = true
    },
    hiddenIcon() {
      this.showIconTrigger = false
    }
  }
}
</script>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  /*max-height: 90%;*/
  /*max-width: 80%;*/
  border-radius: 0.52rem;
  width: v-bind(width);
  height: v-bind(height);
  box-shadow: 1rem 1rem 10rem rgba(19, 19, 19, 0.66);
  background: v-bind(backgroundColor);
  overflow: hidden;
}
::v-deep .overlay-class {
  background: none !important;
}
.modal-title {
  width: 100%;
  height: 10%;
  display: flex;
}
.modal-title div:first-child {
  margin-left: 0.7rem;
}
.close, .max {
  width: 14px;
  height: 14px;
  background: #ab0000;
  border-radius: 100%;
  overflow: hidden;
  margin-top: 0.5rem;
  margin-left: 0.3rem;
  position: relative;
}
.max {
  background: #42b983;
}
.modal-title img {
  position: absolute;
  width: 43%;
  height: 43%;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.modal-detail {
  width: 100%;
  height: 95%;
  position: relative;
  overflow: hidden;
}
</style>