
function getSelf(sendResponse) {
    if  (typeof chrome === undefined) {
        return
    }
    chrome.management.getSelf(function (item) {
        sendResponse(item)
    })
}

export default {
    getSelf,
}