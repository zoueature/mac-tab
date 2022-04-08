<template>
  <div>
    <WindowModal name="todo">
      <div class="todo-app">
        <div class="todo-tab">
          <div class="todo-static">
            <div :class="'static-tab' + (activeTab === stc.id ? ' active' : '')"
                 v-for="(stc, index) in statics" :key="index"
                 @click="selectTab(stc.id)"
            >
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
            <div class="category-list" ref="cateList">
              <div v-for="(category, index) in todoCategories" :key="category.id"
                  :class="'category-item' + (activeTab === category.id ? ' active' : '')"
                   @click="selectTab(category.id)"
                   @dblclick="modifyID = category.id"
              >
                <div class="category-icon">
                  <img :src="category.icon" alt="">
                </div>
                <div class="category-name">
                  <div v-if="category.id !== modifyID">
                    {{category.name}}
                  </div>
                  <div v-else>
                    <input v-model="category.name" @keyup.enter="saveCategory(index, category)">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="opt-button">
            <div class="add-icon" @click="createCategory">
              <img src="../../../../assets/icon/plus_blue.png" alt="">
            </div>
          </div>
        </div>
        <div class="todo-list">
          <div class="todo-list-title-container">
            <div class="todo-title">全部</div>
            <div class="add-todo-icon" @click="todoList(activeTab).unshift({id: 123, title:'dadad'})">
              <img src="../../../../assets/icon/plus_blue.png" alt="">
            </div>
          </div>
          <transition-group  name="list">
            <div class="todo-item"
                 v-for="(todoItem) in todoList(activeTab)"
                 :key="todoItem">
              {{todoItem.title}}
            </div>
          </transition-group>
        </div>
      </div>
    </WindowModal>
  </div>
</template>

<script>

import WindowModal from "@/popup/components/common/WindowModal";
import gsap from 'gsap'

export default {
  name: "TodoApp",
  components: {
    WindowModal,
  },
  data() {
    return {
      test: false,
      newCateName: "",
      activeTab: 0,
      modifyID: -1,
      todoCategories: [
        {
          id: 1,
          name: "第一个五年计划",
          icon: "../../../../assets/icon/list.png",
        },
        {
          id: 2,
          name: "第一个五年计划",
          icon: "../../../../assets/icon/list.png",
        },
        {
          id: 3,
          name: "第一个五年计划",
          icon: "../../../../assets/icon/list.png",
        },
        {
          id: 4,
          name: "第一个五年计划",
          icon: "../../../../assets/icon/list.png",
        },
        {
          id: 5,
          name: "第一个五年计划",
          icon: "../../../../assets/icon/list.png",
        },
      ],
      allTodoList: {
        1000000000000: [
          {
            title: "完成TODO模块的开发",
          }
        ]
      },
      statics: [
        {
          id: 1000000000000,
          icon: "../../../../assets/icon/today.png",
          name: "今日",
          num: 1,
        },
        {
          id: 1000000000001,
          icon: "../../../../assets/icon/deadline.png",
          name: "Deadline",
          num: 23,
        },
        {
          id: 1000000000002,
          icon: "../../../../assets/icon/radio-done.png",
          name: "完成",
          num: 3,
        },
        {
          id: 1000000000003,
          icon: "../../../../assets/icon/all.png",
          name: "全部",
          num: 23,
        }
      ],
    }
  },
  computed: {
    todoList() {
      let that = this
      return function (id) {
        return that.allTodoList[id] ?? []
      }
    }
  },
  methods: {
    createCategory() {
      console.log(123)
      let newCategory = {
        id: (new Date()).getTime(),
        name: "新分类",
        icon: "../../../../assets/icon/list.png",
      }
      this.todoCategories.unshift(newCategory)
      this.selectTab(newCategory.id)
      this.selectModifyCate(newCategory.id)
    },
    selectTab(id) {
      if (id !== this.modifyID) {
        this.modifyID = -1
      }
      if (id !== this.activeTab) {
        this.activeTab = id
      }
    },
    selectModifyCate(id) {
      this.modifyID = id
    },
    saveCategory(index, category) {
      // todo 持久化数据
      this.selectModifyCate(-1)
      this.todoCategories[index] = category
    },
    enter(el, done) {
      console.log('enter')
      gsap.from(el, {
        scale: 0,
        x: 400,
        onComplete: done
      })
    },
    leave(el, done) {
      console.log('leave')
      gsap.to(el, {
        scale: 0,
        x: 200,
        onComplete: done
      })
    }
  },
  mounted() {
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
    font-weight: bold;
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
    margin: 10px auto 0 auto;
  }
  .category-list {
    max-height: 100%;
    overflow: scroll;
  }
  .category-item {
    height: 34px;
    display: flex;
    color: rgba(49, 49, 49, 0.87);
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
    font-size: 10px;
    font-weight: bold;
    margin-left: 10px;
  }
  .opt-button {
    width: 100%;
    height: 10%;
  }
  .add-icon {
    width: 14px;
    height: 14px;
    margin-top: 6px;
    margin-left: 7px;
  }
  .active {
    background: rgba(62, 206, 239, 0.84) !important;
    color: white !important;
  }
  .active .category-icon {
    border-radius: 100%;
    overflow: hidden;
    background: #0da861;
  }
  .todo-list {
    flex: 7;
    width: 100%;
    height: 100%;
    overflow: scroll;
    margin: 0 auto;
  }
  div::-webkit-scrollbar {
    display: none;
  }
  .todo-item {
    width: 95%;
    height: 37px;
    color: white;
    font-size: 12px;
    background-image: linear-gradient(to right, rgba(22, 129, 175, 0.68), rgba(31, 105, 136, 0.31));
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.33);
    text-align: left;
    border-radius: 1px;
    margin: 3px auto 4px auto;
  }
  .todo-list-title-container {
    width: 100%;
  }
  .todo-title {
    text-align: left;
    color: #0C1021;
    font-size: 25px;
    font-weight: bold;
    margin-left: 25px;
  }
  .add-todo-icon {
    width: 16px;
    height: 16px;
    float: right;
    margin-top: -37px;
    margin-right: 16px;
  }
  .add-todo-icon img {
    width: 100%;
    height: 100%;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(70px);
  }
  .list-move {
    transform: translateY(70px);
  }
</style>