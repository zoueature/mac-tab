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
        id: 30,
        name: "抖音",
        icon: "https://is5-ssl.mzstatic.com/image/thumb/Purple122/v4/db/0f/34/db0f343b-e218-9b6b-a63d-99eef051acc5/AppIcon_TikTok-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png?",
        app: '',
        link: 'https://www.douyin.com/',
        categoryId: 4,
        desc: "抖音短视频WEB版",
    },
    {
        id: 31,
        name: "代办事项",
        icon: "../../../../assets/images/app/todo.png",
        app: 'todo',
        link: '',
        categoryId: 5,
        desc: "待办事项",
    },
    {
        id: 32,
        name: "优酷视频",
        icon: "https://is3-ssl.mzstatic.com/image/thumb/Purple112/v4/3e/7e/b7/3e7eb7e5-1c3f-f162-90cb-cca5cb12fbd7/AppIcon-0-0-1x_U007emarketing-0-0-0-8-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png?",
        app: '',
        link: 'https://www.youku.com/',
        categoryId: 4,
        desc: "【精品内容，尽在优酷】",
    },
    {
        id: 33,
        name: "腾讯视频",
        icon: "https://is3-ssl.mzstatic.com/image/thumb/Purple116/v4/4b/e3/4a/4be34a83-e994-c514-8088-2e823176f676/AppIcon-0-0-1x_U007emarketing-0-0-0-8-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png?",
        app: '',
        link: 'https://v.qq.com/',
        categoryId: 4,
        desc: "且试天下全网独播敬请期待",
    },
    {
        id: 34,
        name: "爱奇艺视频",
        icon: "https://is5-ssl.mzstatic.com/image/thumb/Purple126/v4/c8/07/7f/c8077f25-a83e-c994-bdd9-4ca39fd889e7/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png?",
        app: '',
        link: 'https://www.iqiyi.com/',
        categoryId: 4,
        desc: "《亲爱的小孩》全网独播",
    },
    {
        id: 35,
        name: "哔哩哔哩",
        icon: "https://is3-ssl.mzstatic.com/image/thumb/Purple112/v4/ff/98/97/ff9897b6-63da-c6d2-0b86-694e8c220c21/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png?",
        app: '',
        link: 'https://www.bilibili.com/',
        categoryId: 4,
        desc: "弹幕番剧直播高清视频",
    },
    {
        id: 36,
        name: "QQ邮箱",
        icon: "https://is2-ssl.mzstatic.com/image/thumb/Purple126/v4/94/26/55/942655c4-c539-3c8f-51a3-8ae72da78362/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png?",
        app: '',
        link: 'https://mail.qq.com/',
        categoryId: 2,
        desc: "【QQ邮箱】",
    },
    {
        id: 37,
        name: "百度搜索",
        icon: "https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/36/ed/33/36ed3323-8e32-3796-bb7b-525817b20438/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/350x350.png?",
        app: '',
        link: 'https://www.baidu.com/',
        categoryId: 2,
        desc: "强大的搜索引擎，一站搜索全网，搜文字、搜图片",
    },
    {
        id: 38,
        name: "IconFont",
        icon: "https://img.alicdn.com/imgextra/i3/O1CN01Mn65HV1FfSEzR6DKv_!!6000000000514-55-tps-228-59.svg",
        app: '',
        link: 'https://www.iconfont.cn/',
        categoryId: 1,
        desc: "阿里巴巴矢量图标图",
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
    {
        id: 6,
        icon: '../../../../assets/icon/appstore/component.png',
        name: '小组件',
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