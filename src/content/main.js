/* eslint-disable */
import { createApp } from 'vue'
import app from './components/app.vue'
import keys from "@/popup/store/keys";

console.log(11111111111111, 'content inject')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request, sender)
    sendResponse("ok")
})

joinContent(app)
updateBackground()

function joinContent (element) {
    const div = document.createElement('div')
    div.id = 'joinContentApp'
    document.body.appendChild(div)
    createApp(element).mount('#joinContentApp')
}
// import dark from "@/content/components/dark";

// updateBackground 黑暗模式
function updateBackground() {
    chrome.storage.local.get([keys.config], function(result) {
        console.log(result[keys.config].darkModel)
        if (result[keys.config].darkModel) {
            let html = document.getElementsByTagName('html')[0]
            html.style.filter = "invert(1) hue-rotate(180deg)"
            html.style.WebkitFilter = "invert(1) hue-rotate(180deg)";

            console.log(html.style.filter)
            let img = document.getElementsByTagName('img')
            for (let i = 0; i < img.length; i ++) {
                img[i].style.filter = "invert(1) hue-rotate(180deg)"
            }
            let video = document.getElementsByTagName('video')
            for (let i = 0; i < video.length; i ++) {
                video[i].style.filter = "invert(1) hue-rotate(180deg)"
            }
        }
    })
}

