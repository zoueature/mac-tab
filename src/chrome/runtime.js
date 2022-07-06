function requestChromeApi(method, callback, param = {}) {
    chrome.runtime.sendMessage({
        do: method,
        param: param
    }, function (response) {
        callback(response)
    })
}

function sendMessage(event, data, callback) {
    chrome.runtime.sendMessage({
        event: event,
        data: data,
    }, function (response) {
        callback(response)
    })
}


function listenMessage(callback) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        callback(request, sender, sendResponse)
    })
}



export default {
    requestChromeApi,
    listenMessage,
    sendMessage,
}