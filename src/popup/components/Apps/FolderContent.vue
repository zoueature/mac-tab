<template>
  <transition name="folder" >
    <div id="folder" @click="closeFolder" v-if="showFolder">
      <div class="folder-container" @click.stop="">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "FolderContent",
  methods: {
    closeFolder() {
      this.$store.commit('closeFolder')
    },
  },
  computed: {
    showFolder() {
      return this.$store.getters.showFolder
    },
  }
}
</script>

<style scoped>
  #folder {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    z-index: 100000000000;
    top: 0;
  }
  .folder-container {
    width: 50%;
    height: 50%;
    background: blue;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .folder-enter-active,
  .folder-leave-active {
    transition: all 500ms ease;
  }
  .folder-enter-from,
  .folder-leave-to {
    transform: scale(0);
  }
</style>