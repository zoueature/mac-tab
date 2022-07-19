import keys from "@/popup/store/keys";
import common from "@/popup/store/common";

export default {
    // ----------------- common runtime ---------------------
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
    startEditApp(state) {
        state.editApp = true
    },
    closeEditApp(state) {
        state.editApp = false
    },
    setActiveAppPgae(state, page) {
        state.activeAppPage = page
    },
    toggleSearchEngin(state, show) {
        state.showSearchEngine = show
    },
    toggleSearchSuggest(state, show) {
        state.showSuggest = show
    },
    // ----------- config ---------------
    // 读取持久化的用户配置
    initCommonConfig(state, config) {
        let configStr = localStorage.getItem(keys.config)
        if (configStr !== "" && configStr !== null) {
            config = JSON.parse(configStr)
            for (let key in config) {
                state.config[key] = config[key]
            }
        }
    },
    // updateAppSize 更新app大小
    updateAppSize(state, size) {
        common.updateConfig(state, 'appSize', size)
    },
    setShowComponent(state, num) {
        common.updateConfig(state, 'showComponents', num)
    },
    setDarkModel(state, darkModel) {
        common.updateConfig(state, 'darkModel', darkModel)
    },
    setOpenAppModel(state, model) {
        common.updateConfig(state, 'newTabOpenApp', model)
    },
    setSearchEngine(state, engine) {
        common.updateConfig(state, 'searchEngine', engine)
    },
    setGoToSleepMinutesTime(state, minutes) {
        common.updateConfig(state, 'goToSleepTime', minutes)
    },
    setSimpleMode(state, simpleMode) {
        common.updateConfig(state, 'simpleMode', simpleMode)
    },
    setLanguage(state, language) {
        common.updateConfig(state, 'language', language)
    },
    setPrimaryColor(state, color) {
        common.updateConfig(state, 'primaryColor', color)
    },
    setWallpaper(state, wallpaper) {
        if (typeof wallpaper === "string") {
            let position = state.config.wallpaper.position
            wallpaper = {
                url: wallpaper,
                position: position,
                blur: state.config.wallpaper.blur,
            }
        }
        common.updateConfig(state, 'wallpaper', wallpaper)
    },
    setCoverBlur(state, blur) {
        common.updateConfigAndFsync(state,function () {
            state.config.wallpaper.blur = blur
        })
    },


    //----------- app ---------------
    // addApp 添加app到最近的一页
    addApp(state, app) {
        let fmtApp = {
            id: app.id,
            type: 'app',
            name: app.name,
            icon: app.icon,
            app:  app.app,
            link: app.link,
            background: app.background,
            params: app.params,
        }
        state.fmtApps[state.activeAppPage].push(fmtApp)
        common.fsyncApp(state)
    },
    addAppToLocal(state, app) {
        state.fmtApps[state.fmtApps.length - 1].push(app)
    },
    // removeApp 移除app
    removeApp(state, app) {
        let succ = false
        for (let i = 0; i < state.fmtApps.length; i ++) {
          for (let j = 0; j < state.fmtApps[i].length; j ++) {
              if (state.fmtApps[i][j].id === app.id) {
                  state.fmtApps[i].splice(j, 1)
                  succ = true
                  break
              }
          }
          if (succ) {
              break
          }
        }
        common.fsyncApp(state)
    },
    // initUserApps 初始化用户app
    // 本地有数据时， 使用本地的localStorage的数据
    // 本地没有数据时， 使用预定义的初始化数据
    initUserApps(state, userApps) {
        let str = JSON.stringify(userApps)
        if (str === '{}' || str === '[]') {
            return
        }
        console.log
        state.fmtApps = []
        for (let key in userApps) {
            // 遍历每页
            let page = userApps[key]
            let pageResult = []
            for (let appKey in page) {
                let item = page[appKey]
                if (item.type === 'folder') {
                    let folderApps = []
                    for (let k in item.apps) {
                        folderApps.push(item.apps[k])
                    }
                    // 将folder的apps转位array
                    item.apps = folderApps
                }
                pageResult.push(item)
            }
            if (pageResult.length > 0) {
                state.fmtApps.push(pageResult)
            }
        }
    },
    addNewPage(state, direction) {
        if (direction < 0) {
            state.fmtApps.unshift([])
        } else {
            state.fmtApps.push([])
        }
    },
    openFolder(state, folder, x, y) {
        state.showFolder = true
        x += y
        // state.folderStartPtr.x = x
        // state.folderStartPtr.y = y
        state.activeFolder = folder
    },
    closeFolder(state) {
        state.showFolder = false
    },
    fsyncApp(state) {
       common.fsyncApp(state)
    },
    initDockApps(state) {
        let localDockApps = localStorage.getItem(keys.dockApps)
        let dockApps = []
        if (localDockApps !== "" && localDockApps !== null) {
            dockApps = JSON.parse(localDockApps)
            state.dockApps = dockApps
        }
    },
    fsyncDockApps(state) {
        localStorage.setItem(keys.dockApps, JSON.stringify(state.dockApps))
    },




    // ---------- todo -----------------
    initLatestTodo(state) {
        let localLatestTodoStr = localStorage.getItem(keys.latestTodoList)
        if (localLatestTodoStr !== "" && localLatestTodoStr !== null) {
            state.latestTodo = JSON.parse(localLatestTodoStr)
        }
    },
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
        state.latestTodo.unshift(td)
        localStorage.setItem(keys.userTodoList, JSON.stringify(state.userTodos))
        localStorage.setItem(keys.latestTodoList, JSON.stringify(state.latestTodo))
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
        localStorage.setItem(keys.latestTodoList, JSON.stringify(state.latestTodo))
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
        localStorage.setItem(keys.latestTodoList, JSON.stringify(state.latestTodo))
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
        state.latestTodo.forEach((v, i) => {
            state.latestTodo.splice(i, 1)
            v.done = true
            state.latestTodo.push(v)
        })
        localStorage.setItem(keys.latestTodoList, JSON.stringify(state.latestTodo))
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