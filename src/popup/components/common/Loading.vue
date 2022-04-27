<template>
  <div class="loading-container" v-if="showLoading">
    <img src="../../../assets/icon/loading.gif" alt="">
  </div>
</template>

<script>
export default {
  name: "LoadingCom",
  computed: {
    showLoading() {
      return this.$store.getters.showLoading
    }
  }
}
</script>

<style scoped>
  .loading-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(1px);
    z-index: 1000000;
  }
  .loading-container img {
    width: 52px;
    height: 52px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>