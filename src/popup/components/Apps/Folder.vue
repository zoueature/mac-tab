<template>
  <div class="folder-app">
    <AppItem
        :size="folder.size"
        :name="folder.name"
        :iconBorder=" true"
    >
      <div class="folder-icon">
        <div class="app-icon" v-for="element in folder.apps.slice(0, 4)" :key="element.id">
          <img :src="element.icon" style="width: 100%; height: 100%" :alt="element.name">
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
</style>
