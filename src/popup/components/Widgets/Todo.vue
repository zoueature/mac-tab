<template>
  <div class="todo-container" ref="todo">
    <div class="todo-item" v-for="(todo, index) in todos" :key="index">
      <div class="done" @click.stop="done" v-if="index !== 2">
        <img src="../../../assets/icon/done.png">
      </div>
      <div :class="'todo-name ' + (index === 2 ? 'done-word': '')" >
        完成首页TODO模块的开发,完成首页TODO模块的开发,完成首页TODO模块的开发,完成首页TODO模块的开发
      </div>
    </div>
  </div>
</template>

<script>

// import BScroll from 'better-scroll'

export default {
  name: "TodoCom",
  methods: {
    done() {
      console.log(123)
    }
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
    width: 85%;
    height: 20%;
    margin: 0 auto;
    border-bottom: 1px solid rgba(255, 255, 255, 0.38);
    position: relative;
    overflow: hidden;
  }
  .todo-item div {
    float: left;
  }
  .todo-name {
    font-size: 12px;
    color: rgba(225, 221, 221, 0.91);
    width: 80%;
    position: absolute;
    left: 15%;
    top: 50%;
    transform: translate(0, -50%);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .done-word {
    text-decoration: line-through;
    color: rgba(206, 205, 205, 0.47);
  }
  .done {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    left: 3%;
    transform: translate(0, -50%);
  }
</style>