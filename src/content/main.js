// import { createApp } from 'vue'
// import app from './components/app.vue'
//
// joinContent(app)
//
// function joinContent (element) {
//     const div = document.createElement('div')
//     div.id = 'joinContentApp'
//     document.body.appendChild(div)
//     createApp(element).mount('#joinContentApp')
// }
/* eslint-disable */

console.log(11111111111111, 'content inject')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request, sender)
    sendResponse("ok")
})