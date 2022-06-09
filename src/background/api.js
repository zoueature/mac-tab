/* eslint-disable */

function getHistory(sendResponse) {
    console.log('get history')
    let endTime = 999999999999999
    let result = []
    getAllHistory(result, endTime)
    sendResponse(result)
    // return result
}

async function getAllHistory(container, endTime) {
    let param = {text: "", maxResults: 1000000, startTime: 0, endTime: endTime}
    console.log(param)
    chrome.history.search(param, (items) => {
        console.log(items[items.length - 1])
        container.push.apply(container, items)
        // getAllHistory(container, items[items.length - 1].lastVisitTime)
    })
    // console.log(1231231321)
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