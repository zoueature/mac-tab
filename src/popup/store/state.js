import initApps from "@/popup/store/init/init_app";
import initDock from "@/popup/store/init/init_dock";

export default {
    // -------- runtime ------------------
    showApp: false,
    showDrawer: false,
    showLoading: false,
    showFolder: false,
    folderStartPtr: {x: 0, y: 0},
    editApp: false,
    showSearchEngine: false,
    activeAppPage: 0,

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
        appSize: 70, // 桌面app大小
        showComponents: true, // 是否展示小组件
        darkModel: false, // 开启黑暗模式
        searchEngine: "google", // 选择的搜索引擎
        showDock: true, // todo 是否展示下方dock
    },

    // --------- app -----------
    // userApps: initApps,
    installedAppID: {}, // {123: true}
    activeFolder: {}, // 当前打开的文件夹信息
    fmtApps: [initApps],
    dockApps: initDock,

    // todo
    userTodos: {}, // {1: {name: '', count: '', list: []}},
    latestTodo: [], // 最近4条todo
    todoCategory: [], // { {id: 1,name: "第一个五年计划"}
}