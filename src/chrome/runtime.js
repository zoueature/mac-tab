/* eslint-disable */
function requestChromeApi(method, param = {}, callback = (resp) => {}) {
    if  (chrome.runtime == undefined) {
        return
    }
    chrome.runtime.sendMessage({
        do: method,
        param: param
    }, function (response) {
        callback(response)
    })
}

function sendMessage(event, data, callback) {
    if  (chrome.runtime == undefined) {
        return
    }
    chrome.runtime.sendMessage({
        event: event,
        data: data,
    }, function (response) {
        callback(response)
    })
}


function listenMessage(callback) {
    if  (chrome.runtime == undefined) {
        return
    }
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        callback(request, sender, sendResponse)
    })
}



export default {
    requestChromeApi,
    listenMessage,
    sendMessage,
}