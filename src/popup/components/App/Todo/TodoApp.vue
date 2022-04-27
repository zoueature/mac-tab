<template>
    <div class="todo-app">
      <div class="todo-tab">
        <div class="todo-static">
          <div :class="staticTabClass(stc.id)"
               v-for="(stc, index) in statics" :key="index"
               @click="selectTab(stc.id)"
               :style="stc.id === 1000000000000 ? 'grid-column: span 2; width: 95%': ''"
          >
            <div class="static-name">
              <div class="static-icon">
                <img :src="stc.icon" :alt="stc.name">
                <span>{{stc.name}}</span>
              </div>
            </div>
            <div class="static-num">
              <div v-if="stc.id === 1000000000000">{{todayNum}}</div>
              <div v-else-if="stc.id === 1000000000002">{{doneNum}}</div>
              <div v-else-if="stc.id === 1000000000003">{{allNum}}</div>
            </div>
          </div>
        </div>
        <div class="todo-category-list">
          <div class="category-list" ref="cateList">
            <div v-for="(category) in todoCategories" :key="category.id"
                :class="'category-item' + (activeTab === category.id ? ' active' : '')"
                 @click="selectTab(category.id)"
                 @dblclick="modifyID = category.id"
            >
              <div class="category-icon">
                <img src="../../../../assets/icon/list.png" alt="">
              </div>
              <div class="category-name">
                <div v-if="category.id !== modifyID">
                  {{category.name}}
                </div>
                <div v-else>
                  <input class="input-cate"
                         v-model="category.name"
                         @keyup.enter="saveCategory(category)"
                         @focusout="saveCategory(category)"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="opt-button">
          <div class="add-icon" @click="createCategory(selectTab)">
            <img src="../../../../assets/icon/plus_blue.png" alt="">
          </div>
        </div>
      </div>
      <div class="todo-list">
        <div class="todo-list-title-container">
          <div class="todo-title">
            {{todoList.name?? "还没创建TODO哦"}}
            <span class="add-todo-icon" @click="createTodo" v-if="activeTab !== 1000000000000 && activeTab !== 1000000000002 && activeTab !== 1000000000003">
              <img src="../../../../assets/icon/plus_blue.png" alt="">
            </span>
          </div>
        </div>
        <transition-group  name="list">
          <div class="todo-item"
               v-for="(todoItem) in todoList.list ?? []"
               :key="todoItem"
               @mouseenter="showTodoOp(todoItem.id)"
               @mouseleave="hideTodoOp"
          >
            <p v-if="createTodoId === todoItem.id">
              <input type="text"
                     class="input-todo"
                     v-model="todoItem.title"
                     placeholder="创建新TODO"
                     autofocus
                     :style="'font-size:15px; font-weight: bold;'"
                     @focusout="saveTodo(todoItem)"
                     @keyup.enter="saveTodo(todoItem)"
                     ref="inputTodo"
              >
            </p>
            <p v-else
               :style="todoItem.done ? 'text-decoration: line-through; color: rgba(0,0,0,0.25);' :''"
               style="font-size: 14px;"
            >
              {{todoItem.title}}
            </p>
            <transition name="optbutton">
              <div class="todo-opt" v-if="(opTodoID === todoItem.id && createTodoId !== todoItem.id)">
                <div class="opt" @click="done(todoItem)">
                  <img src="../../../../assets/icon/done_fill.png" alt="done">
                </div>
                <div class="opt" @click="deleteTodo(todoItem)">
                  <img src="../../../../assets/icon/delete.png" alt="delete">
                </div>
              </div>
            </transition>
          </div>
        </transition-group>
      </div>
    </div>
</template>

<script>

const todayId = 1000000000000
const doneID = 1000000000002
const allID = 1000000000003
const staticTab = [
  {
    id: todayId,
    icon: "../../../../assets/icon/today.png",
    name: "今日",
  },
  {
    id: doneID,
    icon: "../../../../assets/icon/radio-done.png",
    name: "完成",
    num: 3,
  },
  {
    id: allID,
    icon: "../../../../assets/icon/all.png",
    name: "全部",
    num: 23,
  }
]

export default {
  name: "TodoApp",
  components: {
  },
  created() {
    this.$store.commit('initTodo')
  },
  data() {
    return {
      newCateName: "",
      activeTab: todayId,
      modifyID: -1,
      opTodoID: 0,
      statics: staticTab,
      createTodoId: 0,
    }
  },
  computed: {
    staticTabClass() {
      let that = this
      return function (id) {
        let cls = "static-tab "
        if (id === that.activeTab) {
          let activeClass = 'active'
          if (id === todayId) {
            activeClass = "active-orange"
          } else if (id === doneID) {
            activeClass = "active-green"
          }
          cls += activeClass
        }
        return cls
      }
    },
    todoList() {
      if (this.activeTab === todayId) {
        return {
          id: todayId,
          name: "今日",
          list:  this.$store.getters.todayTodoList
        }
      } else if (this.activeTab === doneID) {
        return {
          id: doneID,
          name: "完成",
          list:  this.$store.getters.doneTodoList
        }
      } else if (this.activeTab === allID) {
        return {
          id: allID,
          name: "全部",
          list:  this.$store.getters.allTodoList
        }
      } else {
        return this.$store.getters.userTodoList(this.activeTab)
      }
    },
    todayNum() {
      return this.$store.getters.todayTodoNum
    },
    doneNum() {
      return this.$store.getters.doneTodoNum
    },
    allNum() {
      return this.$store.getters.allTodoNum
    },
    todoCategories() {
      return this.$store.getters.todoCategories
    }
  },
  methods: {
    // createCategory 创建分类
    createCategory() {
      let newCategory = {
        id: (new Date()).getTime(),
        name: "新分类",
      }
      this.$store.commit('addTodoCategory', newCategory)
      this.selectTab(newCategory.id)
      this.selectModifyCate(newCategory.id)
    },
    // selectTab 左边tab选择
    selectTab(id) {
      if (id !== this.modifyID) {
        this.modifyID = -1
      }
      if (id !== this.activeTab) {
        this.activeTab = id
      }
    },
    // selectModifyCate 开启修改界面
    selectModifyCate(id) {
      this.modifyID = id
    },
    // saveCategory 保存修改的分类信息
    saveCategory(category) {
      // todo 持久化数据
      this.selectModifyCate(-1)
      this.$store.commit('saveTodoCategory', category)
    },
    // showTodoOp 展示todo操作按钮
    showTodoOp(todoID) {
      this.opTodoID = todoID
    },
    // hideTodoOp 隐藏todo操作按钮
    hideTodoOp() {
      this.opTodoID = 0
    },
    createTodo() {
      let todo = {
        id: new Date().getTime(),
        title:'',
        newCreate: true,
        categoryId: this.activeTab,
        createTime: new Date().getTime(),
      }
      this.createTodoId = todo.id
      this.$store.commit('addTodo', todo)
    },
    done(todo) {
      this.$store.commit('doneTodo', todo)
    },
    deleteTodo(todo) {
      this.$store.commit('removeTodo', todo)
    },
    saveTodo(todo) {
      this.createTodoId = 0
      this.$store.commit('saveTodo', todo)
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
    height: 95%;
    width: 100%;
    padding-top: 5%;
    border-right: 1px solid rgba(0, 0, 0, 0.07);
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
    /*justify-items: center;*/
    justify-content: start;
    align-items: center;
    cursor: pointer;
  }
  .static-tab {
    width: 90%;
    height: 90%;
    background: rgba(162, 161, 161, 0.66);
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
    height: 59%;
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
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
    margin-left: 16px;
  }
  .input-cate {
    border: none;
    outline: none;
    height: 80%;
    width: 90%;
    font-size: 12px;
    color: #505050;
  }
  .active {
    background: rgba(62, 206, 239, 0.84) !important;
    color: white !important;
  }
  .active-orange {
    background: rgba(188, 67, 15, 0.8);
    color: white !important;
  }
  .active-green {
    background: #76EA16CC;
    color: white !important;
  }
  .active .category-icon {
    overflow: hidden;
  }
  .todo-list {
    flex: 7;
    width: 100%;
    height: 95%;
    padding-top: 2%;
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
    background-image: linear-gradient(to right, rgba(62, 206, 239, 0.87), rgba(62, 206, 239, 0.34));
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.33);
    text-align: left;
    border-radius: 2px;
    margin: 3px auto 4px auto;
    line-height: 37px;
    position: relative;
  }
  .todo-item p {
    max-width: 70%;
    /*overflow: hidden;*/
    margin-left: 16px;
    /*font-size: 13px;*/
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
  }
  .todo-item p input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    background: none;
    border: none;
    outline: none;
    color: white;
    font-size: 14px;
  }
  .todo-opt {
    top: 0;
    position: absolute;
    float: right;
    height: 100%;
    right: 0;
    padding-right: 2%;
    padding-left: 2%;
    display: flex;
    background: rgba(9, 9, 9, 0.34);
  }
  .opt {
    margin-top: 6px;
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
  .opt img {
    width: 100%;
    height: 100%;
  }
  .todo-list-title-container {
    width: 100%;
  }
  .todo-title {
    text-align: left;
    color: rgba(25, 25, 25, 1);
    font-size: 25px;
    font-weight: bold;
    margin-left: 12px;
  }
  .add-todo-icon {
    width: 16px;
    height: 16px;
    float: right;
    /*margin-top: -25px;*/
    margin-right: 16px;
  }
  .add-todo-icon img {
    width: 100%;
    height: 100%;
  }
  .list-enter-active {
    transition: all 500ms ease;
  }
  .list-enter-from {
    opacity: 0;
    transform: translateX(70px);
  }
  .list-leave-to{
    opacity: 0;
    transform: translateY(70px);
  }
  .optbutton-enter-active,
  .optbutton-leave-active {
    transition: all 200ms ease;
  }
  .optbutton-enter-from, .optbutton-leave-to{
    transform: translateX(100px);
  }
</style>