
function getHistory(sendResponse) {
    let endTime = 999999999999999
    let result = []
    getAllHistory(result, endTime).then(() => {
        sendResponse(result)
    })
}

async function getAllHistory(container, endTime) {
    let param = {text: "", maxResults: 1000000, startTime: 0, endTime: endTime}
    let result = []
    result = await chrome.history.search(param)
    if (result.length > 0) {
        container.push.apply(container, result)
        // let nextEndTime = result[result.length-1].lastVisitTime
        // await getAllHistory(container, nextEndTime)
    }
}

function getExtension(sendResponse) {
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