<template>
  <transition name="folder" v-show="showFolder">
      <div class="folder-container" @click.stop="" >
        <Draggable
            :list="apps"
            item-key="id"
            tag="transition-group"
            :component-data="{
              tag: 'div',
              type: 'transition-group',
              name: !drag ? 'apps' : 'apps-drag'
            }"
            ghostClass="ghostClass"
            chosenClass="chosenClass"
            @start="drag = true"
            @end="end"
            :move="move"
            group="apps"
            class="app"
            :sort="true"
            id="folder"
        >
          <template #item="{ element }">
            <AppItem  :size="70"
                      :icon="element.icon"
                      :name="element.name"
                      :link="element.link"
                      :click="element.click">

            </AppItem>
          </template>
        </Draggable>
      </div>
<!--    </div>-->
  </transition>
</template>

<script>

import AppItem from "@/popup/components/Apps/AppItem";
import Draggable from "vuedraggable";

let displayDesktop = false

export default {
  name: "FolderContent",
  components: {
    AppItem,
    Draggable,
  },
  methods: {
    closeFolder() {
      this.$store.commit('closeFolder')
    },
    move(e) {
      console.log(e.to.id)
      if (e.to.id==='apps') {
        // 拖到桌面
        displayDesktop = true
        let that = this
        setTimeout(function (){
          if (displayDesktop) {
            displayDesktop = false
            that.closeFolder()
          }
        }, 500)
      } else {
        displayDesktop = false
      }
    },
    end() {
      this.drag = false
    }
  },
  computed: {
    showFolder() {
      return this.$store.getters.showFolder
    },
  },
  data() {
    return {
      drag: false,
      apps: [
        {
          id: 24,
          type: 'app',
          size: 70,
          name: "AppStore",
          icon: "../../../assets/images/app/appstore.png",
          app: 'appstore',
        },
        {
          id: 25,
          type: 'app',
          size: 70,
          name: "备忘录",
          icon: "../../../assets/images/app/note.png",
          app: 'note',
        },
        {
          id: 26,
          type: 'app',
          size: 70,
          name: "超级搜索",
          icon: "../../../assets/images/app/searcher.png",
          app: 'searcher',
        },
      ]
    }
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
    border-radius: 10px;
    backdrop-filter: blur(10px);
    box-shadow: 1px 1px 10px white;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 10000;
  }
  .app {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: repeat(3, 120px);
    grid-auto-flow: dense;
    justify-items: center;
    justify-content: center;
    align-items: center;
    position: absolute;
  }
  .folder-enter-active,
  .folder-leave-active {
    transition: all 500ms ease;
  }
  .folder-enter-from,
  .folder-leave-to {
    transform: scale(0);
  }
  .apps-move {
    transition: transform 0.5s;
  }
  .apps-drag-move {
    transition: transform 0.1s;
  }
  .no-move {
    transition: transform 0s;
  }
</style>