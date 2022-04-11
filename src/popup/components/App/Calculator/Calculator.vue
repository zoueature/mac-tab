<template>
  <div class="calculator-app">
    <div class="num-show">
      123
    </div>
    <div class="keyboard">
      <img src="../../../../assets/icon/loading.gif" alt="" style="width: 100%; height:40px;">
    </div>
  </div>
</template>

<script>
export default {
  name: "CalculatorCom"
}
</script>

<style scoped>
  .calculator-app {
    width: 100%;
    height: 100%;
  }
  .num-show {
    width: 100%;
    text-align: right;
    font-size: 34px;
    font-weight: bold;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.44);
  }
</style>