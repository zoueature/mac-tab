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

import BScroll from 'better-scroll'

export default {
  name: "TodoCom",
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.todo, {
        mouseWheel: {
          speed: 1,
          easeTime: 100,
          dampingFactor: 0.005,
        },
        bounceTime: 500,
      })
    })
  },
  data() {
    return {
      todos: Array(70)
    }
  },

}
</script>

<style scoped>
  .todo-container {
    width: 160px;
    height: 160px;
    position: relative;
    /*width: 100%;*/
    /*height: 100%;*/
    border: 1px solid rgba(215, 211, 211, 0.48);
    border-radius: 7px;
    overflow: hidden;
  }
  .bg {
    width: 100%;
    height: 100%;
    background: #42b983;
    position: absolute;
    z-index: -1;
    background: rgba(215, 211, 211, 0.5);
    filter: blur(5px);
  }
  .todo-item {
    display: flex;
    height: 30px;
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 1px 1px rgba(171, 171, 171, 0.65);
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
    background: aliceblue;
    margin-top: 50%;
    width: 15px;
    height: 15px;
  }
</style>