<template>
  <div class="todo-container" ref="todo">
    <div class="test">
      <div class="todo-item" v-for="(todo, index) in todos" :key="index">
        <div class="todo-name">
          完成首页TODO模块的开发
        </div>
        <div class="todo-opt">
          <div class="done">
            <img src="../../../assets/icon/done.png">
          </div>
        </div>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>

// import BScroll from 'better-scroll'

export default {
  name: "TodoCom",
  mounted() {
  },
  data() {
    return {
      todos: Array(7),
      showModal: false,
    }
  },

}
</script>

<style scoped>
  .todo-container {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(7px);
    overflow: hidden;
    background: rgba(39, 142, 225, 0.7);
    position: absolute;
  }
  .todo-item {
    display: flex;
    height: 20%;
    margin: 0 auto;
  }
  .todo-name {
    flex: 8;
    font-size: 12px;
    height: 100%;
    line-height: 30px;
  }
  .todo-opt {
    height: 100%;
    flex: 2;
  }
  .done {
    #background: aliceblue;
    margin-top: 50%;
    width: 15px;
    height: 15px;
  }
</style>