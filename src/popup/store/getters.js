export default {
    // ------------ runtime -------------------
    showApp(state) {
        return state.showApp
    },
    showDrawer(state) {
        return state.showDrawer
    },
    showLoading(state) {
        return state.showLoading
    },
    showFolder(state) {
        return state.showFolder
    },
    folderStart(state) {
        return state.folderStartPtr
    },
    activeFolder(state) {
        return state.activeFolder
    },
    inEditApp(state) {
        return state.editApp
    },
    activeAppPage(state) {
        return state.activeAppPage
    },
    showSuggest(state) {
        return state.showSuggest
    },

    // ------------------- CONFIG ----------------------
    appSize(state) {
      return state.config.appSize
    },
    config(state) {
        return state.config
    },
    appColumnNum(state) {
        return state.config.appColumnNum
    },
    wallpaper(state) {
        return state.config.wallpaper
    },
    showComponents(state) {
        return state.config.showComponents
    },
    darkModel(state) {
        return state.config.darkModel
    },
    searchEngine(state) {
        return state.config.searchEngine
    },
    newTabOpenApp(state) {
        return state.config.newTabOpenApp
    },
    goToSleepMinutes(state) { 
        return state.config.goToSleepTime
    },
    simpleMode(state) { 
        return state.config.simpleMode
    },

    // ------------------- APPS ------------------------
    installedAppID(state) {
        let result = {}
        state.fmtApps.forEach((v) => {
            v.forEach(item => {
                if (item.type === 'folder') {
                    for (let app in v.apps) {
                        result[app.id] = true
                    }
                }
                result[item.id] = true
            })
        })
        state.dockApps.forEach(v => {
            result[v.id] = true
        })
        return result
    },
    pageApps(state) {
        return state.fmtApps
    },
    dockApps(state) {
        return state.dockApps
    },




    // --------------------- Desktop ----------------------
    showEngineList(state) {
        return state.showSearchEngine
    },





    // ---------- TODO ---------
    userTodoList(state) {
        return function (categoryID) {
            return state.userTodos[categoryID]?? {}
        }
    },
    latestTodo(state) {
        let result = []
        let len = state.latestTodo.length
        if (len === 0) {
            return result
        }
        for (let i = len -1; i >=0; i--) {
            result.push(state.latestTodo[i])
        }
        return result
    },
    // todayTodoNum 今日创建的数量
    todayTodoNum(state) {
        let num = 0
        let now = new Date()
        for (let k in state.userTodos) {
            state.userTodos[k].list.forEach((todo) => {
                if (todo.createTime <= now.getTime()) {
                    num ++
                }
            })
        }
        return num
    },
    todayTodoList(state) {
        let list = []
        let now = new Date()
        for (let k in state.userTodos) {
            state.userTodos[k].list.forEach((todo) => {
                if (todo.createTime <= now.getTime()) {
                    list.push(todo)
                }
            })
        }
        return list
    },
    // 完成的Todo数量
    doneTodoNum(state) {
        let num = 0
        for (let k in state.userTodos) {
            state.userTodos[k].list.forEach((todo) => {
                if (todo.done) {
                    num ++
                }
            })
        }
        return num
    },
    doneTodoList(state) {
        let list = []
        for (let k in state.userTodos) {
            state.userTodos[k].list.forEach((todo) => {
                if (todo.done) {
                    list.push(todo)
                }
            })
        }
        return list
    },
    // 完成的Todo数量
    allTodoNum(state) {
        let num = 0
        for (let k in state.userTodos) {
            state.userTodos[k].list.forEach(() => {
                num ++
            })
        }
        return num
    },
    allTodoList(state) {
        let list = []
        for (let k in state.userTodos) {
            state.userTodos[k].list.forEach((todo) => {
                list.push(todo)
            })
        }
        return list
    },
    todoCategories(state) {
        return state.todoCategory
    }
}