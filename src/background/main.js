/* eslint-disable */

import api from './api'
import keys from "@/popup/store/keys";
import extension from "@/chrome/extension";
import runtime from "@/chrome/runtime"
import event from "@/chrome/event"

console.log('background is running')

chrome.alarms.create("testAlarm", {periodInMinutes: 1})

chrome.alarms.onAlarm.addListener(
    function (alarmInfo) {
        console.log(alarmInfo)
    }
)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    switch (request.do) {
        case "getHistory":
            api.getHistory(sendResponse, request.param)
            break
        case "getExtension":
            api.getExtension(sendResponse, request.param)
            break
        case "enableExtension":
            api.setExtensionEnableStatus(sendResponse, request.param.id, true)
            break
        case "disableExtension":
            api.setExtensionEnableStatus(sendResponse, request.param.id, false)
            break
        case "getSelfExtension":
            extension.getSelf(sendResponse)
            break
        default:
            console.log('undefined do ' + request.do)
    }
    return true
})

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
    let app = {
        app: "",
        background: "#CC3333",
        icon: tab.favIconUrl,
        id: new Date().getTime(),
        link: tab.url,
        name: tab.title,
        type: "app",
    }
    chrome.storage.local.get([keys.userApp], function(result) {
        let installedApp = result[keys.userApp]
        installedApp.push(app)
        let storageVal = {}
        storageVal[keys.userApp] = installedApp
        chrome.storage.local.set(storageVal, function(result) {
            runtime.sendMessage(event.EVENT_ADD_APP_IN_WEBSITE, app, function(response) {
                console.log(response)
            })
        })
    });
})