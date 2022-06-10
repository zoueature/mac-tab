/* eslint-disable */
function requestChromeApi(method, callback, param = {}) {
    chrome.runtime.sendMessage({
        do: method,
        param: param
    }, function (response) {
        callback(response)
    })
}

export default {
    requestChromeApi,
}