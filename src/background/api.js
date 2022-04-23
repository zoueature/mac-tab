/* eslint-disable */

function getHistory(sendResponse) {
    console.log('get history')
    chrome.history.search({text: "", maxResults: 2000}, (items) => {
        console.log('resp items')
        console.log(items)
        sendResponse(items)
    })
}


export default {
    getHistory
}