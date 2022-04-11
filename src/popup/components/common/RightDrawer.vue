<template>
  <transition name="rightDrawer">
    <div class="drawer-container" v-if="showDrawer" @click="closeDrawer">
      <div class="drawer" @click.stop="">
        <router-view name="drawer"></router-view>
      </div>
    </div>
  </transition>
<!--  <transition name="app" >-->
<!--    <div id="app" @click="closeApp" v-if="showApp">-->
<!--      <div class="app-container" @click.stop="">-->
<!--        <div class="app-title" @mouseenter="showIcon" @mouseleave="hiddenIcon">-->
<!--          <div class="close" @click="closeApp">-->
<!--            <img v-if="showIconTrigger" src="../../../assets/icon/close.png" alt="">-->
<!--          </div>-->
<!--          <div class="max" @click="max" v-if="showMaxIcon">-->
<!--            <img v-if="showIconTrigger" src="../../../assets/icon/enlarge.png" alt="">-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="app-content">-->
<!--          <router-view name="app"></router-view>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </transition>-->
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
    transition: all 500ms ease;
  }
  .rightDrawer-enter-from,
  .rightDrawer-leave-to {
    transform: translateX(430px);
  }
</style>