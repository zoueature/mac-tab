/* eslint-disable */
let opt = {
    type: "basic",
    title: "Primary Title",
    message: "Primary message to display",
    iconUrl: "url_to_small_icon"
}
import axios from 'axios'

// setInterval( () => {
//     axios.get('https://top.baidu.com/board?tab=realtime').then(res => {
//         console.log(res)
//     })
// }, 1000)

// eslint-disable-next-line
setInterval(() => {
    chrome.bookmarks.getTree(function(res) {
        chrome.runtime.sendMessage({event: "bookmark-list", data: res}, (response) => {
            console.log(response)
        })
    })
}, 2000)


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "hello")
            sendResponse({farewell: "goodbye"});
    }
);