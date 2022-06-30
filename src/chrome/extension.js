
function getSelf(sendResponse) {
    chrome.management.getSelf(function (item) {
        sendResponse(item)
    })
}

export default {
    getSelf,
}