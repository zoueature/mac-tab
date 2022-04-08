<template>
  <div>
    <WindowModal name="todo">
      <div class="todo-app">
        <div class="todo-tab">
          <div class="todo-static">
            <div class="static-tab" v-for="(stc, index) in statics" :key="index">
              <div class="static-name">
                <div class="static-icon">
                  <img :src="stc.icon" :alt="stc.name">
                  <span>{{stc.name}}</span>
                </div>
              </div>
              <div class="static-num">
                <div>{{stc.num}}</div>
              </div>
            </div>
          </div>
          <div class="todo-category-list">
            <div class="category-list">
              <div :class="'category-item' + (index === 2 ? ' active' : '')" v-for="(category, index) in todoCategories" :key="index">
                <div class="category-icon">
                  <img src="../../../../assets/icon/list.png" alt="">
                </div>
                <el-icon><close /></el-icon>
                <div class="category-name">第一个五年计划</div>
              </div>
            </div>
          </div>
          <div class="opt-button">
            <div class="add-icon">
              <img src="../../../../assets/icon/plus_blue.png" alt="">
            </div>
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
      statics: [
        {
          icon: "../../../../assets/icon/today.png",
          name: "今日",
          num: 0,
        },
        {
          icon: "../../../../assets/icon/today.png",
          name: "今日",
          num: 0,
        },
        {
          icon: "../../../../assets/icon/today.png",
          name: "今日",
          num: 0,
        },
        {
          icon: "../../../../assets/icon/today.png",
          name: "今日",
          num: 0,
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
  .todo-tab img {
    width: 100%;
    height: 100%;
  }
  .todo-static {
    width: 95%;
    height: 30%;
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
    background: rgba(197, 196, 196, 0.66);
    border-radius: 0.7rem;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.34);
    display: flex;
  }
  .static-name {
    flex: 1;
  }
  .static-icon {
    width: 25px;
    height: 25px;
    flex: 1;
    margin: 10% auto 0 auto;
    color: white;
    font-size: 10px;
  }
  .static-num {
    flex: 1;
  }
  .static-num div {
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-top: 25%;
  }
  .todo-category-list {
    width: 100%;
    height: 60%;
    overflow: hidden;
    margin: 0 auto;
  }
  .category-list {
    max-height: 100%;
    overflow: scroll;
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
    margin-left: 11px;
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
    color: rgba(49, 49, 49, 0.87);
  }
  .opt-button {
    width: 100%;
    height: 10%;
  }
  .add-icon {
    width: 16px;
    height: 16px;
    margin-top: 16px;
    margin-left: 7px;
  }
  .active {
    background: rgba(62, 206, 239, 0.84) !important;
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