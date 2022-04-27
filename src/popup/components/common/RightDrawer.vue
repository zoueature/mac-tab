<template>
  <transition name="rightDrawer">
    <div class="drawer-container" v-if="showDrawer" @click="closeDrawer">
      <div class="drawer" @click.stop="">
        <router-view name="drawer"></router-view>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RightDrawer",
  methods: {
    openDrawer() {
      this.$store.commit('openDrawer')
    },
    closeDrawer() {
      this.$store.commit('closeDrawer')
    },
  },
  computed: {
    showDrawer() {
      return this.$store.getters.showDrawer
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  .drawer-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000000;
  }
  .drawer {
    width: 370px;
    height: 100%;
    position: absolute;
    right: 0;
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 0;*/
  }
  .rightDrawer-enter-active,
  .rightDrawer-leave-active {
    transition: all 250ms ease;
  }
  .rightDrawer-enter-from,
  .rightDrawer-leave-to {
    transform: translateX(430px);
  }
</style>