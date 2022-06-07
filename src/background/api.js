/* eslint-disable */

function getHistory(sendResponse) {
    console.log('get history')
    let endTime = 999999999999999
    let result = []
    getAllHistory(result, endTime)
    sendResponse(result)
    // return result
}

function getAllHistory(container, endTime) {
    chrome.history.search({text: "", maxResults: 100, endTime: endTime}, (items) => {
        console.log(items)
        if (items.length === 0) {
            return
        }
        endTime = items[items.length-1].lastVisitTime
        container.push.apply(container, items)
        getAllHistory(container, endTime)
    })
}

function getExtension(sendResponse) {
    console.log('get history')
    chrome.management.getAll((items) => {
        sendResponse(items)
    })
}

function setExtensionEnableStatus(sendResponse, id, enabled) {
    chrome.management.setEnabled(id, enabled, () => {
        sendResponse("OK")
    })
}

export default {
    getHistory,
    getExtension,
    setExtensionEnableStatus,
}