<template>
  <div>
    <div class="todo-container" ref="todo" @click="openDetail">
      <div class="todo-title">待办事项</div>
      <div class="todo-item" v-for="(todo) in todos" :key="todo.id">
        <check theme="outline" size="16" fill="#333" @click.stop="done(todo)" v-if="!todo.done"/>
        <success theme="outline" size="16" fill="rgba(206, 205, 205, 0.47)" v-else/>
        <div :class="'todo-name ' + (todo.done ? 'done-word': '')" >
          {{todo.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Check} from '@icon-park/vue-next'
import {Success} from '@icon-park/vue-next'

export default {
  name: "TodoCom",
  components: {
    Check,
    Success,
  },
  methods: {
    done(todo) {
      this.$store.commit('doneTodo', todo)
    },
    openDetail() {
      this.$router.replace("todo")
      this.$store.commit('openApp')
    },
    cancel() {
      console.log(123)
    }
  },
  created() {
    this.$store.commit('initLatestTodo')
  },
  computed: {
    todos() {
      return this.$store.getters.latestTodo
    }
  },
  data() {
    return {
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
    background: rgba(39, 142, 225, 0.88);
    overflow-y: scroll;
  }
  .todo-item {
    width: 85%;
    height: 34px;
    margin: 0 auto;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    position: relative;
    overflow: hidden;
    display: flex;
    align-content: center;
    align-items: center;
  }
  .todo-title {
    width: 85%;
    margin: 7px auto;
    text-align: left;
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
  .todo-name {
    font-size: 12px;
    margin-left: 7px;
    color: rgba(225, 221, 221, 0.91);
    flex: 10;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
  .done-word {
    text-decoration: line-through;
    color: rgba(206, 205, 205, 0.47);
  }
  .todo-op {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 0;
    top: 0;
    /*transform: translate(-50%, -50%);*/
    z-index: 1;
    background: grey;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>