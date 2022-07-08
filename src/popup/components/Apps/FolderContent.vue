<template>
  <transition name="folder" v-show="showFolder">
      <div class="folder-container" @click.stop="" >
        <div class="folder-name" @click="triggerModify">
          <input v-model="folder.name"
                 :readonly="!modifyFolderName"
                 @focusout="modifyFolder"
                 @keyup.enter="modifyFolder"
                 :style="modifyFolderName? 'background: rgba(139, 139, 139, 0.34)': null"
          >
        </div>
        <Draggable
            :list="folder.apps"
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
            @add="add"
            class="app"
            :sort="true"
            id="folder"
        >
          <template #item="{ element }">
            <AppItem  :id="element.id"
                      :icon="element.icon"
                      :name="element.name"
                      :link="element.link"
                      :type="element.type"
                      :app="element.app"
                      :background="element.background"
                      :click="element.click">

            </AppItem>
          </template>
        </Draggable>
      </div>
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
  props: [
  ],
  methods: {
    closeFolder() {
      if (this.modifyFolderName) {
        this.modifyFolder()
        return
      }
      this.$store.commit('closeFolder')
    },
    move(e) {
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
      this.$store.commit('fsyncApp')
    },
    add() {
      this.$store.commit('fsyncApp')
    },
    openApp(app) {
      let that = this
      return function () {
        that.$store.commit('openApp')
        that.$router.replace(app)
      }
    },
    modifyFolder() {
      this.modifyFolderName = false
      this.$store.commit('fsyncApp')
    },
    triggerModify() {
      this.modifyFolderName = !this.modifyFolderName
    }
  },
  computed: {
    showFolder() {
      return this.$store.getters.showFolder
    },
    folder() {
      let folderInfo = this.$store.getters.activeFolder
      if (typeof folderInfo.apps === "object") {
        let apps = []
        for (let key in folderInfo.apps) {
          apps.push(folderInfo.apps[key])
        }
        folderInfo.apps = apps
      }
      return this.$store.getters.activeFolder
    },
    appGridSize() {
      // app 大小
      let size = this.$store.getters.appSize
      let gridSize = Math.ceil(size * 1.2) + 'px'
      let result = 'repeat(auto-fill, ' + gridSize + ')'
      return result
    },
  },
  data() {
    return {
      drag: false,
      modifyFolderName: false,
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
    width: 70%;
    height: 90%;
    border-radius: 10px;
    backdrop-filter: blur(25px);
    box-shadow: 1px 1px 7px rgba(255, 255, 255, 0.16);
    background: rgba(0, 0, 0, 0.07);
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
    backdrop-filter: blur(10px);
    display: grid;
    grid-template-columns: v-bind(appGridSize);
    grid-template-rows: v-bind(appGridSize);
    grid-auto-flow: dense;
    justify-items: center;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
  }
  .folder-enter-active,
  .folder-leave-active {
    transition: all 160ms linear;
  }
  .folder-enter-from,
  .folder-leave-to {
    /*width: 0;*/
    /*height: 0;*/
    /*width: 0;*/
    /*left: -100px;*/
    transform: scale(0);
    opacity: 0;
    /*transform: scale(0);*/
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
  .folder-name {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -10%;
  }
  .folder-name input {
    background: none;
    color: white;
    font-size: 20px;
    font-weight: bolder;
    border: none;
    outline: none;
    width: 90%;
    text-align: center;

  }
</style>