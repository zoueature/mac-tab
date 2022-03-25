<template>
  <div class="search-item">
    <input placeholder="" class="search-input" @keyup="">
  </div>
</template>

<script>
export default {
  name: "SearchCom",
  data() {
    return {
      searchEngine: [
        {
          id: 1,
          name: "Google",
          icon: "../../../assets/icon/google.png",
          link: "https://www.google.com/search?q="
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .search-item {
    width: 100%;
    height: 61px;
    border-radius: 10px;
    overflow: hidden;
  }
  .search-input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    box-shadow: 5px 5px 15px rgba(9, 9, 9, 0.24);
    font-size: 25px;
    padding-left: 10px;
  }
</style>