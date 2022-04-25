/* eslint-disable */

import api from './api'

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
        default:
            console.log('undefined do')
    }
    return true
})
