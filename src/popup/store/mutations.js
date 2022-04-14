import keys from "@/popup/store/keys";

export default {
    // ----------------- common ---------------------
    openApp(state) {
        state.showApp = true
    },
    closeApp(state) {
        state.showApp = false
    },
    openDrawer(state) {
        state.showDrawer = true
    },
    closeDrawer(state) {
        state.showDrawer = false
    },
    openLoading(state) {
        state.showLoading = true
    },
    closeLoading(state) {
        state.showLoading = false
    },
    setWallpaper(state, wallpaper) {
        state.config.wallpaper = wallpaper
        localStorage.setItem(keys.config, JSON.stringify(state.config))
    },
    initCommonConfig(state, config) {
        state.config = config
    },


    //----------- app ---------------
    addApp(state, app) {
        state.userApps.push({
            id: app.id,
            type: 'app',
            size: 70,
            name: app.name,
            icon: app.icon,
            app:  app.app,
            link: app.link,
        })
        localStorage.setItem(keys.userApp, JSON.stringify(state.userApps))
    },
    removeApp(state, app) {
        state.userApps.forEach((v, i) => {
            if (v.id === app.id) {
                state.userApps.splice(i, 1)
            }
        })
        localStorage.setItem(keys.userApp, JSON.stringify(state.userApps))
    },
    initUserApps(state, apps) {
        state.userApps = apps
    },





    // ---------- todo -----------------
    initTodo(state) {
        let cateStr = localStorage.getItem(keys.userTodoCategories)
        if (cateStr !== null && cateStr !== "") {
            state.todoCategory = JSON.parse(cateStr)
        }
        let todoListStr = localStorage.getItem(keys.userTodoList)
        if (todoListStr !== null && todoListStr !== "") {
            state.userTodos = JSON.parse(todoListStr)
        }
    },
    // todo {id: '', title: '', createTime: Date(), categoryId: 0, categoryName: ''}
    // addTodo 创建新TODO
    addTodo(state, todo) {
        let categoryId = todo.categoryId
        let td = {
            id: todo.id,
            title: todo.title,
            categoryId: categoryId,
            done: false,
            createTime: todo.createTime,
        }
        if (state.userTodos[categoryId] === undefined) {
            let tmp = {
                id: categoryId,
                list: [td]
            }
            state.todoCategory.forEach((v) => {
                if (v.id === tmp.id) {
                    tmp.name = v.name
                }
            })
            state.userTodos[categoryId] = tmp
        } else {
            state.userTodos[categoryId].list.unshift(td)
        }
        state.latestTodo.push(td)
        localStorage.setItem(keys.userTodoList, JSON.stringify(state.userTodos))
    },
    // saveTodo 保存TODO信息
    saveTodo(state, todo) {
        state.userTodos[todo.categoryId].list.forEach((v, i) => {
            if (v.id === todo.id) {
                state.userTodos[todo.categoryId].list[i] = todo
            }
        })
        state.latestTodo.forEach((v, i) => {
            if (v.id === todo.id) {
                state.latestTodo[i] = todo
            }
        })
        localStorage.setItem(keys.userTodoList, JSON.stringify(state.userTodos))
    },
    // removeTodo 删除TODO
    removeTodo(state, todo) {
        state.userTodos[todo.categoryId].list.forEach((v, i) => {
            if (v.id === todo.id) {
                state.userTodos[todo.categoryId].list.splice(i, 1)
            }
        })
        state.latestTodo.forEach((v, i) => {
            if (v.id === todo.id) {
                state.latestTodo.splice(i, 1)
            }
        })
        localStorage.setItem(keys.userTodoList, JSON.stringify(state.userTodos))
    },
    // doneTodo 修改todo为完成
    doneTodo(state, todo) {
        state.userTodos[todo.categoryId].list.forEach((v, i) => {
            if (v.id === todo.id) {
                state.userTodos[todo.categoryId].list.splice(i, 1)
                v.done = true
                state.userTodos[todo.categoryId].list.push(v)
            }
        })
        localStorage.setItem(keys.userTodoList, JSON.stringify(state.userTodos))
    },
    // addTodoCategory 创建TODO分类
    addTodoCategory(state, category) {
        state.todoCategory.unshift(category)
        if (state.userTodos[category.id] === undefined) {
            state.userTodos[category.id] = {
                id: category.id,
                name: category.name,
                list: []
            }
        }
        localStorage.setItem(keys.userTodoCategories, JSON.stringify(state.todoCategory))
    },
    // saveTodoCategory 保存TODO分类
    saveTodoCategory(state, category) {
        state.todoCategory.forEach((v, i) => {
            if (v.id === category.id) {
                state.todoCategory[i] = category
            }
        })
        state.userTodos[category.id].name = category.name
        localStorage.setItem(keys.userTodoCategories, JSON.stringify(state.todoCategory))
    }
}