<template>
  <div>
    <div class="todo-container" ref="todo" @click="openDetail">
      <div class="todo-title">待办事项</div>
      <div class="todo-item" v-for="(todo) in todos" :key="todo.id">
        <div class="done" @click.stop="done(todo)" v-if="!todo.done">
          <img src="../../../../assets/icon/done.png" alt="done">
        </div>
        <div :class="'todo-name ' + (todo.done ? 'done-word': '')" >
          {{todo.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import BScroll from 'better-scroll'

 // import CustomModal from "../common/WindowModal";

export default {
  name: "TodoCom",
  components: {
     // CustomModal,
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
  .todo-title {
    margin-top: 3%;
    text-align: left;
    margin-left: 7%;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: white;
    font-size: 16px;
    font-weight: bold;
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
    text-align: left;
  }
  .done-word {
    text-decoration: line-through;
    color: rgba(206, 205, 205, 0.47);
  }
  .done {
    width: 12px;
    height: 12px;
    position: absolute;
    top: 37%;
    left: 3%;
    transform: translate(0, -50%);
  }
  ::v-deep .modal-content {
    width: 200px;
    height: 100px;
    background: white;
  }
  ::v-deep .modal-container {
    position: absolute;
    left: 0;
    right: 0;
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
</style>