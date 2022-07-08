/* eslint-disable */
import { createApp } from 'vue'
import app from './components/app.vue'
import keys from "@/popup/store/keys";

console.log('content inject')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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

const dark = 'invert(1) hue-rotate(180deg)'
// updateBackground 黑暗模式
function updateBackground() {
    chrome.storage.local.get([keys.config], function(result) {
        if (result[keys.config].darkModel) {
            let html = document.getElementsByTagName('html')[0]
            html.style.filter = dark
            html.style.WebkitFilter = dark
            let style = document.getElementsByTagName('style')[0]
            style.textContent += "\nimg{filter: "+dark+"};"
            style.textContent += "\nvideo{filter: "+dark+"};"
            style.textContent += "\ncanvas{filter: "+dark+"};"
            style.textContent += "\ng-emoji{filter: "+dark+"};"
            style.textContent += "\ndiv[background-img]{filter: "+dark+"};"
            style.textContent += "\na[background-img]{filter: "+dark+"};"
            // let img = document.querySelectorAll('img')
            // for (let i = 0; i < img.length; i ++) {
            //     img[i].style.filter = dark
            // }
            // let video = document.querySelectorAll('video')
            // for (let i = 0; i < video.length; i ++) {
            //     video[i].style.filter = dark
            // }
            // let canvas = document.querySelectorAll('canvas')
            // for (let i = 0; i < canvas.length; i ++) {
            //     canvas[i].style.filter = dark
            // }
            // let emoji = document.querySelectorAll('g-emoji')
            // for (let i = 0; i < canvas.length; i ++) {
            //     emoji[i].style.filter = dark
            // }
        }
    })
}

