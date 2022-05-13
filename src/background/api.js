/* eslint-disable */

function getHistory(sendResponse) {
    console.log('get history')
    chrome.history.search({text: "", maxResults: 2000}, (items) => {
        sendResponse(items)
    })
}

function getExtension(sendResponse) {
    console.log('get history')
    chrome.management.getAll((items) => {
        sendResponse(items)
    })
}


export default {
    getHistory,
    getExtension,
}