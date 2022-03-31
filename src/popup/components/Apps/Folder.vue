<template>
  <div>
    <AppItem
        :size="folder.size"
        :name="folder.name"
        :iconBorder=" true"
        :click="openFolder"
    >
      <div class="folder-icon">
        <div class="app-icon" v-for="app in folder.apps.slice(0, 4)" :key="app.id">
          <img :src="app.icon" style="width: 100%; height: 100%" :alt="app.name">
        </div>
      </div>
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
            <div class="folder">
              <AppItem v-for="app in folder.apps"
                       :key="app.id"
                       :name="app.name"
                       :size="app.size"
                       :icon="app.icon"
                       :link="app.link"
              >
              </AppItem>
            </div>
          </div>
        </vue-final-modal>
      </div>
    </AppItem>
  </div>
</template>

<script>

import AppItem from "@/popup/components/Apps/AppItem";

export default {
  name: "FolderCom",
  components: {
    AppItem
  },
  props: [
      "folder"
  ],
  created() {
    this.folderContainerSize = Math.ceil(this.folder.size * 5.5) + 'px'
  },
  data() {
    return {
      showFolder: false,
      folderContainerSize: '',
    }
  },
  methods: {
    openFolder() {
      this.showFolder = true
    }
  }
}
</script>

<style scoped>
  .folder-icon {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-items: center;
    justify-content: space-around;
    align-items: center;
  }
  .app-icon {
    width: 37%;
    height: 37%;
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
  }
  .folder {
    width: v-bind(folderContainerSize);
    height: v-bind(folderContainerSize);
    display: grid;
    grid-template-rows: repeat(4, 25%);
    grid-template-columns: repeat(4, 25%);
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
