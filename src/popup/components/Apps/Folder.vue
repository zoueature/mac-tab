<template>
  <div class="folder-app">
    <AppItem
        :id="folder.id"
        :size="folder.size"
        :name="folder.name"
        :iconBorder=" true"
        :type="'folder'"
    >
      <div class="folder-icon">
        <div class="app-icon" v-for="element in folder.apps.slice(0, 4)" :key="element.id">
          <img :src="element.icon" style="width: 100%; height: 100%"
               :alt="element.name"
               @error="element.loadIconSucc=false"
               v-if="element.loadIconSucc !== false && element.icon !== '' && element.icon !== undefined">
          <div v-else class="icon-word-container" :style="'background: ' + (element.background !== undefined? element.background: 'blue') ">
            {{element.name.substring(0, 1)}}
          </div>
        </div>
      </div>
    </AppItem>
  </div>
</template>

<script>
import AppItem from "@/popup/components/Apps/AppItem";

export default {
  name: "FolderCom",
  components: {
    AppItem,
  },
  props: [
      "folder"
  ],
  mounted() {
    console.log(this.folder)
  },
  data() {
    return {
      loadIconSucc: true,
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
    width: 70%;
    height: 70%;
    border-radius: 7px;
    overflow: hidden;
  }
  .icon-word-container {
    color: white;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 2px;
    align-items: center;
  }
</style>
