<template>
  <left theme="outline" size="25" fill="#777" :strokeWidth="2" @click.stop="$router.back()"/>
</template>

<script>

import {Left} from '@icon-park/vue-next'

export default {
  name: "BackCom",
  props: [
  ],
  components:{
    Left,
  },
}
</script>

<style scoped>
</style>