const apps = [
    {
        id: 22,
        name: "切壁纸",
        icon: "../../../../assets/images/app/wallpaper.png",
        app: 'wallpaper',
        categoryId: 5,
        desc: "随意切换想要的背景",
    },
    {
        id: 23,
        name: "计算器",
        icon: "../../../../assets/images/app/calculator.png",
        app: 'calculator',
        categoryId: 5,
        desc: "科学计算器",
    },
    {
        id: 24,
        name: "AppStore",
        icon: "../../../../assets/images/app/appstore.png",
        app: 'appstore',
        categoryId: 5,
        desc: "应用商店",
    },
    {
        id: 25,
        name: "备忘录",
        icon: "../../../../assets/images/app/note.png",
        app: 'note',
        categoryId: 5,
        desc: "随时备忘想起的大小事",
    },
    {
        id: 26,
        name: "超级搜索",
        icon: "../../../../assets/images/app/searcher.png",
        app: 'searcher',
        categoryId: 5,
        desc: "支持多种内容搜索的超级搜索器级搜索器级搜索器级搜索器级搜索器",
    },
    {
        id: 27,
        name: "翻译",
        icon: "../../../../assets/images/app/translate.png",
        app: 'translate',
        categoryId: 5,
        desc: "-",
    },
    {
        id: 28,
        name: "JSON格式化",
        icon: "../../../../assets/images/app/json.png",
        app: 'json',
        categoryId: 5,
        desc: "-",
    },
    {
        id: 29,
        name: "热门短视频",
        icon: "../../../../assets/images/app/short_video.png",
        app: 'video',
        categoryId: 5,
        desc: "短视频平台的热门视频",
    },
        {
            id: 1,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 1,
        },
        {
            id: 2,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 1,
        },
        {
            id: 3,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 1,
        },
        {
            id: 4,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 1,
        },
        {
            id: 5,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 2,
        },
        {
            id: 6,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 2,
        },
        {
            id: 7,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 3,
        },
        {
            id: 1,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 3,
        },
        {
            id: 2,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 4,
        },
        {
            id: 3,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 4,
        },
        {
            id: 4,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 4,
        },
        {
            id: 5,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 4,
        },
        {
            id: 6,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 5,
        },
        {
            id: 7,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 5,
        },
        {
            id: 1,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 5,
        },
        {
            id: 2,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 5,
        },
        {
            id: 3,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 4,
        },
        {
            id: 4,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 1,
        },
        {
            id: 5,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 1,
        },
        {
            id: 6,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 1,
        },
        {
            id: 7,
            icon: "../../../../assets/images/app/netease.png",
            name: "网易云音乐",
            desc: "3亿人都在用的音乐平台",
            categoryId: 2,
        },
    ]
const appCategory = [
    {
        id: 5,
        icon: '../../../../assets/icon/appstore/tools.png',
        name: '系统工具',
    },
    {
        id: 1,
        icon: '../../../../assets/icon/appstore/art.png',
        name: '设计',
    },
    {
        id: 2,
        icon: '../../../../assets/icon/appstore/efficiency.png',
        name: '效率',
    },
    {
        id: 3,
        icon: '../../../../assets/icon/appstore/develop.png',
        name: '开发',
    },
    {
        id: 4,
        icon: '../../../../assets/icon/appstore/rocket.png',
        name: '娱乐',
    },
]

function formatApps() {
    let result = {}
    appCategory.forEach((v) => {
        result[v.id] = {
            id: v.id,
            name: v.name,
            list: []
        }
    })
    apps.forEach((v) => {
        if (result[v.categoryId] === undefined) {
            result[v.categoryId] = {
                id: v.categoryId,
                name: '',
                list: []
            }
        }
        result[v.categoryId].list.push(v)
    })
    return result
}

const formatedApps = formatApps()

export default {
    apps: formatedApps,
    category: appCategory,
}