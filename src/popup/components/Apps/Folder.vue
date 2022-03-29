<template>
  <div class="folder" @click.capture.stop="openFolder">
    <AppItem
        :size="folder.size"
        :name="folder.name"
        :iconBorder=" true"
    >
      <div class="folder-icon">
        <div class="app-icon" v-for="app in folder.apps" :key="app.id">
          <img :src="app.icon" style="width: 100%; height: 100%" :alt="app.name">
        </div>
      </div>
      <div v-if="showFolder">

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
  data() {
    return {
      showFolder: false
    }
  },
  methods: {
    openFolder() {
      console.log(123)
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
    border-radius: 1px;
    overflow: hidden;
  }
</style>