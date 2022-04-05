<template>
  <div>
    <WindowModal name="todo">
      <div class="todo-app">
        <div class="todo-tab">
          <div v-for="(todo, index) in todoList"
               :key="todo.type"
               :class="activeTab === index ? 'active' : ''"
               @click="activeTab = index"
          >
            {{todo.name}}
          </div>
        </div>
        <div class="todo-list">
          <div v-for="(todoItem, index) in todoList[activeTab].list"
               :key="index"
               class="todo-item"
          >
            {{todoItem.title}}
          </div>
        </div>
      </div>
    </WindowModal>
  </div>
</template>

<script>

import WindowModal from "@/popup/components/common/WindowModal";

export default {
  name: "TodoApp",
  components: {
    WindowModal,
  },
  data() {
    return {
      activeTab: 0,
      todoList: [
        {
          type: "today",
          name: "今日",
          list: [
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
            {
              title: "完成Todo模块的开发",
              createTime: '2022-04-04',
              endTime: '2022-04-05',
            },
          ]
        },
        {
          type: "week",
          name: "本周",
          list: []
        },
        {
          type: "all",
          name: "全部",
          list: []
        }
      ],
    }
  }
}
</script>

<style scoped>
  .todo-app {
    width: 100%;
    height: 100%;
  }
  .todo-tab {
    text-align: center;
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(3, 33.33%);
    height: 10%;
    line-height: 2.5rem;
  }
  .todo-tab div {
    background: #ccffcc;
  }
  .active {
    background: #95f695 !important;
    box-shadow: 0.01rem 0.01rem 0.7rem rgba(45, 45, 45, 0.56);
  }
  .todo-list {
    width: 97%;
    margin: 2% auto 0 auto;
    height: 88%;
    display: flex;
    flex-wrap: wrap;
    flex-flow: wrap;
  }
  .todo-item {
    width: 20%;
    height: 2rem;
  }
</style>