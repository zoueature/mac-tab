
function getSelf(sendResponse) {
    if  (chrome == undefined) {
        return
    }
    chrome.management.getSelf(function (item) {
        sendResponse(item)
    })
}

export default {
    getSelf,
}