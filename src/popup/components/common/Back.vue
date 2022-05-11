<template>
  <div class="back" @click.stop="$router.back()">
    <img src="../../../assets/icon/back.png" alt="" style="width: 100%; height: 100%">
  </div>
</template>

<script>
export default {
  name: "BackCom"
}
</script>

<style scoped>
.back {
  width: 10px;
  height: 23px;
}
</style>