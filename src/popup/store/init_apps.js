export default [
    {
        id: new Date().getTime(), type: 'folder', size: 70, name:"系统工具", apps: [
            {
                id: 10,
                type: 'app',
                size: 70,
                name: "历史记录",
                icon:"../../../assets/images/app/history.png",
                link:"chrome://history/"
            },
        ]
    },
    {
        id: 22,
        type: 'app',
        size: 70,
        name: "切壁纸",
        icon: "../../../assets/images/app/wallpaper.png",
        app: 'wallpaper',
    },
    {
        id: 23,
        type: 'app',
        size: 70,
        name: "计算器",
        icon: "../../../assets/images/app/calculator.png",
        app: 'calculator',
    },
    {
        id: 24,
        type: 'app',
        size: 70,
        name: "AppStore",
        icon: "../../../assets/images/app/appstore.png",
        app: 'appstore',
    },
    {
        id: 25,
        type: 'app',
        size: 70,
        name: "备忘录",
        icon: "../../../assets/images/app/note.png",
        app: 'note',
    },
    {
        id: 26,
        type: 'app',
        size: 70,
        name: "超级搜索",
        icon: "../../../assets/images/app/searcher.png",
        app: 'searcher',
    },
    {
        id: 27,
        type: 'app',
        size: 70,
        name: "翻译",
        icon: "../../../assets/images/app/translate.png",
        app: 'translate',
    },
    {
        id: 28,
        type: 'app',
        size: 70,
        name: "JSON格式化",
        icon: "../../../assets/images/app/json.png",
        app: 'json',
    },
    {
        id: 29,
        type: 'app',
        size: 70,
        name: "热门短视频",
        icon: "../../../assets/images/app/short_video.png",
        app: 'video',
    },
]