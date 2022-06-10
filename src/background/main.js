/* eslint-disable */

import api from './api'
import keys from "@/popup/store/keys";
import extension from "@/chrome/extension";

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
chrome.contextMenus.onClicked.addListener((ev) => {
    console.log(ev)
    chrome.storage.local.get([keys.userApp], function(result) {
        console.log(result);
        let installedApp = result[keys.userApp]
        installedApp.push({
            id: new Date().getTime(),
            title: "测试一下",
            link: "https://www.google.com/search?q=dsa",
        })
        let storageVal = {}
        storageVal[keys.userApp] = installedApp
        chrome.storage.local.set(storageVal, function(result) {
            console.log("add app success")
        })
    });
})