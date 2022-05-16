import initApps from "@/popup/store/init_apps";

export default {
    // -------- runtime ------------------
    showApp: false,
    showDrawer: false,
    showLoading: false,
    showFolder: false,
    folderStartPtr: {x: 0, y: 0},
    editApp: false,

    // --------- config -------------------
    config: {
        wallpaper: {
            url: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
            position: {
                size: "center",
                position: "cover"
            },
            blur: 0,
        },
        appSize: 70,
        appColumnNum: 10,
        showComponents: true,
    },
    showSearchEngine: false,

    // --------- app -----------
    userApps: initApps,
    installedAppID: {}, // {123: true}
    activeFolder: {}, // 当前打开的文件夹信息
    fmtApps: [],
    dockApps: [],

    // todo
    userTodos: {}, // {1: {name: '', count: '', list: []}},
    latestTodo: [], // 最近4条todo
    todoCategory: [], // { {id: 1,name: "第一个五年计划"}
}