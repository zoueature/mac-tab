<template>
  <div>
    <GDialog v-model="dialogState" max-width="500">
      <div class="window">

      </div>
    </GDialog>

    <button
        class="btn btn--primary"
        @click="dialogState = true"
    >
      Open Dialog
    </button>
  </div>
</template>

<script>
export default {
  name: "DialogCom",
  props: [
    'width',
    'height',
  ],
  data() {
    return {
      dialogState: false,
    }
  }
}
</script>

<style scoped>
  .window {
    width: 300px;
    height: 150px;
    background: aliceblue;
  }
</style>
