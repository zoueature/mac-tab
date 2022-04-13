export default {
    showApp(state) {
        return state.showApp
    },
    wallpaper(state) {
        return state.wallpaper
    },
    showDrawer(state) {
        return state.showDrawer
    },
    showLoading(state) {
        return state.showLoading
    },
    userApps(state) {
        return state.userApps
    },
    installedAppID(state) {
        let result = {}
        state.userApps.forEach((v) => {
            result[v.id] = true
        })
        return result
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
        console.log(state.latestTodo.length)
        for (let i = len -1; i >=0; i--) {
            result.push(state.latestTodo[i])
        }
        console.log(result)
        return result
    },
    todayTodoNum(state) {
        let num = 0
        let now = new Date()
        new Date()
        for (let v in state.userTodos) {
            if (v.createTime <= now) {
                num ++
            }
        }
        console.log(num)
        return num
    },
    todoCategories(state) {
        return state.todoCategory
    }
}