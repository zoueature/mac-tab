<template>
  <div class="folder-app">
    <AppItem
        :size="folder.size"
        :name="folder.name"
        :iconBorder=" true"
        :click="openFolder"
    >
      <div class="folder-icon">
        <div class="app-icon" v-for="element in folder.apps.slice(0, 4)" :key="element.id">
          <img :src="element.icon" style="width: 100%; height: 100%" :alt="element.name">
        </div>
      </div>
    </AppItem>
    <div v-if="showFolder" class="folder-content" @click="showFolder=false">
        <div class="folder-apps">
          <p class="folder-name">{{folder.name}}</p>
          <Draggable :list="folder.apps"
                     item-key="id"
                     :options="option"
                     class="folder"
                     group="apps"
          >
            <template #item="{ element }"  >
              <AppItem
                  :name="element.name"
                  :size="element.size"
                  :icon="element.icon"
                  :link="element.link"
              >
              </AppItem>
            </template>
          </Draggable>
        </div>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import AppItem from "@/popup/components/Apps/AppItem";
//import AppContainer from "@/popup/components/Apps/AppContainer";

let idGlobal = 0;

export default {
  name: "FolderCom",
  components: {
    AppItem,
    Draggable,
//    AppContainer,
  },
  props: [
      "folder"
  ],
  created() {
    this.folderContainerSize = Math.ceil(this.folder.size * 3.5) + 'px'
    this.folderContainerWidth = Math.ceil(this.folder.size * 3.5 * 2) + 'px'
  },
  data() {
    return {
      showFolder: false,
      folderContainerSize: '',
      folderContainerWidth: '',
      option: {
        group: {
          name: "apps",
          pull: true,
        },
        sort: true,
        delay: 1000,
        animation: 1000,
        ghostClass: "ghostClass",
        tag: "transition"
      },
    }
  },
  methods: {
    openFolder() {
      this.showFolder = true
    },
    clone({ name }) {
      return { name, id: idGlobal++ };
    },
    log() {
      console.log(123)
    }
  }
}
</script>

<style scoped>
  .folder-icon {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2, 50%);
    grid-template-columns: repeat(2, 50%);
    flex-wrap: wrap;
    justify-items: center;
    justify-content: space-around;
    align-items: center;
  }
  .app-icon {
    width: 75%;
    height: 75%;
    border-radius: 3px;
    /*overflow: hidden;*/
  }
  .folder-content {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    top:0;
    left: 0;
  }
  .folder-apps {
    width: v-bind(folderContainerWidth);
    height: v-bind(folderContainerSize);
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
  }
  .folder-name {
    color: white;
    font-size: 20px;
    position: absolute;
    top: -25%;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
  }
  .folder {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2, 50%);
    grid-template-columns: repeat(5, 20%);
    justify-content: space-around;
    justify-items: center;
    align-items: center;
    border-radius: 16px;
    box-shadow: 2px 2px 25px white;
  }
</style>
