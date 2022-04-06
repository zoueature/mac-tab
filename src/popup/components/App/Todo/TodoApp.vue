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
    display: flex;
    justify-content: space-around;
    grid-template-columns: repeat(3, 33.33%);
    padding: 1%;
    height: 10%;
    width: 90%;
    margin: 0 auto;
    line-height: 2.5rem;
  }
  .todo-tab div {
    flex: 1;
  }
  .active {
    background: #95f695 !important;
    box-shadow: 1px 1px 7px rgba(45, 45, 45, 0.26);
    border-radius: 0.5rem !important;
  }
  .todo-list {
    padding: 2%;
    width: 97%;
    overflow: scroll;
    margin: 0 auto;
    height: 83%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    justify-items: center;
    text-align: center;
    flex-direction: row;
  }
  .todo-list::-webkit-scrollbar {
    display: none;
  }
  .todo-item {
    width: 32%;
    height: 3rem;
    color: white;
    background-image: linear-gradient(to right, rgba(22, 129, 175, 0.92), rgba(31, 105, 136, 0.62));
    border-radius: 0.3rem;
    margin-bottom: 0.7rem;
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.33);
  }
</style>