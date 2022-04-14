<template>
  <div>
    <AppItem
        :size="folder.size"
        :name="folder.name"
        :iconBorder=" true"
        :click="openFolder"
    >
        <Draggable :list="folder.apps.slice(0, 4)"
                   item-key="id"
                   :options="option"
                   :clone="clone"
                   @change="log"
                   tag="transition-group"
                   :component-data="{
                      tag: 'div',
                      type: 'transition-group',
                      name:  'flip-list'
                  }"
                   group="apps"
                   class="folder-icon">
          <template #item="{ element }"  >
            <div class="app-icon">
              <img :src="element.icon" style="width: 100%; height: 100%" :alt="element.name">
            </div>
          </template>
        </Draggable>
      <div v-if="showFolder">
        <vue-final-modal
            v-bind="$attrs"
            v-model="showFolder"
            classes="modal-container"
            content-class="modal-content"
            :esc-to-close="true"
            overlay-class="overlay-class"
            :transition="{
               'enter-active-class': 'transition duration-200 ease-in-out transform',
        'enter-from-class': 'opacity-0',
        'enter-to-class': 'opacity-100',
        'leave-active-class': 'transition duration-200 ease-in-out transform',
        'leave-to-class': 'translate-y-full',
        'leave-from-class': 'translate-y-0'
            }"
        >
          <div class="folder-content">
            <div class="folder-name">{{folder.name}}</div>
            <Draggable :list="folder.apps"
                       item-key="id"
                       :options="option"
                       class="folder">
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
        </vue-final-modal>
      </div>
    </AppItem>
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
    this.folderContainerSize = Math.ceil(this.folder.size * 5.5) + 'px'
    this.folderContainerWidth = Math.ceil(this.folder.size * 5.5 * 2) + 'px'
  },
  data() {
    return {
      showFolder: false,
      folderContainerSize: '',
      folderContainerWidth: '',
      option: {
        group: "app",
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
    overflow: hidden;
  }
  .folder-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

  }
  .folder-name {
    padding: 15px;
    color: white;
    font-size: 25px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -16%;
  }
  .folder {
    width: v-bind(folderContainerWidth);
    height: v-bind(folderContainerSize);
    display: grid;
    grid-template-rows: repeat(4, 25%);
    grid-template-columns: repeat(8, 12.5%);
    justify-content: space-around;
    justify-items: center;
    align-items: center;
    border-radius: 16px;
    box-shadow: 2px 2px 20px white;
  }
  ::v-deep .overlay-class {
    /*background: rgba(72, 71, 71, 0.42) !important;*/
    /*filter: blur(10px);*/
    backdrop-filter: blur(7px);
  }
  ::v-deep .opacity-0 {
    opacity: 0;
  }
  ::v-deep .opacity-100 {
    opacity: 100;
  }
</style>
