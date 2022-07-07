// import api from './api'
import keys from "@/popup/store/keys";
// import extension from "@/chrome/extension";
import runtime from "@/chrome/runtime"
import event from "@/chrome/event"
import alarm from "./alarm"
import msg from "./msg"

console.log('background is running')

alarm.startAlarm()
msg.startListenMsg()

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     switch (request.do) {
//         case "getHistory":
//             api.getHistory(sendResponse, request.param)
//             break
//         case "getExtension":
//             api.getExtension(sendResponse, request.param)
//             break
//         case "enableExtension":
//             api.setExtensionEnableStatus(sendResponse, request.param.id, true)
//             break
//         case "disableExtension":
//             api.setExtensionEnableStatus(sendResponse, request.param.id, false)
//             break
//         case "getSelfExtension":
//             extension.getSelf(sendResponse)
//             break
//         default:
//             console.log('undefined do ' + request.do)
//     }
//     return true
// })

// 创建右键菜单
chrome.contextMenus.create(
    {
        id: "jpnpacmaeaiopacmphlndcahkgbepmgm-123131",
        title: "添加到主页",
        visible: true,
    },
    () => {
        console.log("create menu done")
    }
)

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log(info, tab)
    let r = Math.ceil(Math.random() * 255)
    let g = Math.ceil(Math.random() * 255)
    let b = Math.ceil(Math.random() * 255)
    let app = {
        app: "",
        background: '#' + r.toString(16) + g.toString(16) + b.toString(16),
        icon: tab.favIconUrl,
        id: new Date().getTime(),
        link: tab.url,
        name: tab.title,
        type: "app",
    }
    chrome.storage.local.get([keys.userApp], function(result) {
        let installedApp = result[keys.userApp]
        console.log(installedApp)
        installedApp[installedApp.length-1].push(app)
        console.log(installedApp)
        let storageVal = {}
        storageVal[keys.userApp] = installedApp
        chrome.storage.local.set(storageVal, function() {
            runtime.sendMessage(event.EVENT_ADD_APP_IN_WEBSITE, app, function(response) {
                console.log(response)
            })
        })
    });
})