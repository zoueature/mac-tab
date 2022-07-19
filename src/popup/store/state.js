import initDock from "@/popup/store/init/init_dock";

export default {
    // -------- runtime ------------------
    showApp: false,
    showDrawer: false,
    showLoading: false,
    showFolder: false,
    showSuggest: false,
    // folderStartPtr: {
    //     x: 0,
    //     y: 0
    // },
    editApp: false,
    showSearchEngine: false,
    activeAppPage: 0,

    // --------- config -------------------
    config: {
        wallpaper: {
            url: "http://file.crazyman.ml/c4/5b/c45b5d650be49e531e8a7e44dc960a7c.png",
            position: {
                size: "center",
                position: "cover"
            },
            blur: 0,
        },
        appSize: 88, // 桌面app大小
        showComponents: false, // 是否展示小组件
        darkModel: false, // 开启黑暗模式
        searchEngine: "google", // 选择的搜索引擎
        newTabOpenApp: true, // 是否用新标签页打开app
        goToSleepTime: 16, // 进入休眠的时间(分钟)
        showDock: true, // todo 是否展示下方dock
        simpleMode: false, // 极简模式
        language: "en", // 语言
        primaryColor: "",
    },

    // --------- app -----------
    // userApps: initApps,
    installedAppID: {}, // {123: true}
    activeFolder: {}, // 当前打开的文件夹信息
    fmtApps: [],
    dockApps: initDock,

    // todo
    userTodos: {}, // {1: {name: '', count: '', list: []}},
    latestTodo: [], // 最近4条todo
    todoCategory: [], // { {id: 1,name: "第一个五年计划"}
}