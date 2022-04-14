<template>
  <div class="apps">
      <Draggable :list="userApps"
                 item-key="id"
                 :options="option"
                 tag="transition-group"
                 :component-data="{
                  tag: 'ul',
                  type: 'transition-group',
                  name: !drag ? 'flip-list' : null
                }"
                 ghostClass="ghost"
                 chosenClass="chosen"
                 group="apps"
                 @start="start"
                 @end="end"
                 @move="move"
                 :move="move"
                 v-bind="dragOptions"
                 class="app">
        <template #item="{ element }"  >
          <AppContainer :app="element"/>
        </template>
      </Draggable>
    </div>
</template>

<script>

import Draggable from 'vuedraggable'
import AppContainer from "@/popup/components/Apps/AppContainer";
import keys from "@/popup/store/keys";

const appsStorageKeyName = "applications"

export default {
  name: "AppCom",
  components: {
    Draggable,
    AppContainer,
  },
  props: [
    "size",
    'rows',
    'columns'
  ],
  beforeCreate() {
    let apps = localStorage.getItem(appsStorageKeyName)
    if (apps !== "" && apps !== null) {
      this.apps = JSON.parse(apps)
    } else {
      this.apps = []
    }
  },
  data() {
    return {
      inFolder: false,
      dragOptions: {
        animation: 200,
        group: "app",
        disabled: false,
        ghostClass: "ghost"
      },
      drag: false,
      disabled: false,
      appSize: 0,
      rowsNum: 0,
      columNum: 0,
      list1: [],
      option: {
        group: "app",
        sort: false,
        delay: 1000,
        animation: 1000,
        ghostClass: "ghostClass",
        tag: "transition"
      }
    }
  },
  created() {
    this.appSize = this.size
    this.rowsNum = this.rows
    this.columNum = this.columns
    let localUserApps = localStorage.getItem(keys.userApp)
    let userApps = []
    if (localUserApps !== "" && localUserApps !== null) {
      userApps = JSON.parse(localUserApps)
      this.$store.commit('initUserApps', userApps)
    }
  },
  computed: {
    containerHeight() {
      return (this.appSize * this.rowsNum) + 'px'
    },
    containerWidth() {
      return (this.appSize * this.columNum) + 'px'
    },
    userApps() {
      let list =  this.$store.getters.userApps
      let that = this
      list.forEach((v, i) => {
        list[i].click = that.openApp(v.app)
      })
      return list
    }
  },
  methods: {
    openApp(app) {
      let that = this
      return function () {
        that.$store.commit('openApp')
        that.$router.replace(app)
      }
    },
    start(ev) {
      console.log('start', ev)
      this.drag = true
    },
    end(ev) {
      console.log('end', ev)
      this.drag = false
      localStorage.setItem(appsStorageKeyName, JSON.stringify(this.apps))
    },
    move(ev) {
      let dragged = ev.draggedContext
      let related = ev?.relatedContext?.element?.type?? '';
      if (related === 'folder') {
        this.dragOptions.disabled = true
        this.apps.splice(dragged.index, 1)
        this.apps[ev.relatedContext.index].apps.push(dragged.element)
      }
      this.dragOptions.disabled = false
    }
  },
}
</script>

<style  scoped>
.apps{
  /*width: v-bind(containerWidth);*/
  /*height: v-bind(containerHeight);*/
  margin: 0 auto;
}
.ghostClass {
  transform: scale(2) !important;
}

.app{
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: repeat(auto-fill, 100px);
  grid-auto-flow: dense;
  justify-items: center;
  /*align-items: center;*/
}

.ghost {
  opacity: 0.5;
  transform: scale(1.1);
}

.chosen {
  /*cursor: move;*/
  /*transform: scale(0.3);*/
}

</style>