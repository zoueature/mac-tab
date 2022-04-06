<template>
  <div>
    <WindowModal name="todo">
      <div class="todo-app">
        <div class="todo-tab">
          <div class="todo-static">
            <div class="static-tab"></div>
            <div class="static-tab"></div>
            <div class="static-tab"></div>
            <div class="static-tab"></div>
          </div>
          <div class="todo-category-list">
            <div class="category-list">
              <div class="category-item" v-for="(category, index) in todoCategories" :key="index" :style="index === 2 ? 'background: blue;' : ''">
                <div class="category-icon">
                  <img src="../../../../assets/icon/fire.png" alt="">
                </div>
                <el-icon><close /></el-icon>
                <div class="category-name">第一个五年计划</div>
              </div>
            </div>
          </div>
          <div class="opt-button">ds</div>
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
      todoCategories: Array(17),
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
    display: flex;
    flex-direction: row;
  }
  .todo-tab {
    max-width: 200px;
    flex: 3;
    height: 100%;
    width: 100%;
  }
  .todo-static {
    width: 95%;
    height: 37%;
    max-height: 160px;
    margin:  0 auto;
    display: grid;
    grid-template-rows: repeat(2, 50%);
    grid-template-columns: repeat(2, 50%);
    justify-items: center;
    align-items: center;
  }
  .static-tab {
    width: 90%;
    height: 90%;
    background: #a2a2a2;
    border-radius: 0.7rem;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.34);
  }
  .todo-category-list {
    width: 100%;
    height: 63%;
    margin: 7px auto 0 auto;
  }
  .category-list {
    max-height: 90%;
    overflow: scroll;
    padding-bottom: 43px;
  }
  .category-item {
    height: 34px;
    display: flex;
  }
  .category-icon {
    float: left;
    width: 16px;
    height: 16px;
    margin-top: 8px;
    margin-left: 7px;
    background: blue;
    border-radius: 100%;
    overflow: hidden;
  }
  .category-icon img {
    width: 100%;
    height: 100%;
  }
  .category-name {
    float: left;
    line-height: 34px;
    font-size: 12px;
    margin-left: 2px;
    color: rgba(0, 0, 0, 0.71);
  }
  .opt-button {
    position: absolute;
    background: blue;
    width: 100%;
    height: 34px;
    bottom: 0;
    z-index: 999999;
  }
  .active {
    background: #95f695 !important;
    box-shadow: 1px 1px 7px rgba(45, 45, 45, 0.26);
    border-radius: 0.5rem !important;
  }
  .todo-list {
    flex: 7;
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
  div::-webkit-scrollbar {
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