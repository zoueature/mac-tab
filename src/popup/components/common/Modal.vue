<template>
  <div>
    <vue-final-modal v-model="showModal"
                     content-class="modal-content"
                     classes="modal-container"
                     name="test"
    >
      <span class="modal__title">Hello, vue-final-modal</span>
    </vue-final-modal>
    <button @click="showModal = !showModal">Open Modal</button>
  </div>
</template>

<script>
export default {
  name: "DialogCom",
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300
    }
  },
  computed: {
  },
  methods: {
    showModals() {
      this.$vfm.show('test')
    }
  },
  created() {
    this.widthPx = this.width + "px"
    this.heightPx = this.height + 'px'
  },
  data() {
    return {
      showModal: false,
      dialogState: false,
      widthPx: '',
      heightPx: '',
    }
  }
}
</script>

<style scoped>
  .window {
    width: 160px ;
    height: 160px ;
    background: green;
  }
  .modal__title {
    font-size: 1.5rem;
    font-weight: 700;
  }
  ::v-deep .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .modal-content {
    display: inline-block;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
  }
  .dark-mode div::v-deep .modal-content {
    border-color: #2d3748;
    background-color: #1a202c;
  }

</style>
