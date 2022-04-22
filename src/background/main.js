/* eslint-disable */

chrome.alarms.create("testAlarm", {periodInMinutes: 1})

chrome.alarms.onAlarm.addListener(
    function (alarmInfo) {
        console.log(alarmInfo)
    }
)

chrome.history.search({text: ""}, (items) => {
    console.log(items)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request, sender)
})

function getHistory() {

}