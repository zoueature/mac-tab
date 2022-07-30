import keys from "@/popup/store/keys";
import initApps from "@/popup/store/init/init_app";
import storage from "@/chrome/storage"

const chromeExtApp =     {
    "app": "",
    "icon": "http://file.crazyman.ml/fd/4f/fd4f55935c7fe447764ad744211fda7d.png",
    "id": 100,
    "name": "插件下载",
    "size": 70,
    "type": "app",
    "background": "#FFF",
    "link": "https://chrome.google.com/webstore/detail/ost%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/cnfgofonilbgcmpklmnoommkhmbepmjd?utm_source=chrome-ntp-icon",
}
// const chromeIcon = "http://file.crazyman.ml/fd/4f/fd4f55935c7fe447764ad744211fda7d.png"
// const chromeLink = "https://chrome.google.com/webstore/detail/ost%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/cnfgofonilbgcmpklmnoommkhmbepmjd?utm_source=chrome-ntp-icon"
const edgeIcon = "http://file.crazyman.ml/36/f9/36f9877b2ec5b804e20af4736e49cda4.png"
const edgeLink = "https://microsoftedge.microsoft.com/addons/detail/ost-new-tab/ejeocdkhpncdigifkciolkibpbggafpn"

export default {
    initApp(context) {
        let inWebsite = window.location.host.match(/[0-9a-zA-Z]+(\.[0-9a-zA-Z]+)/) !== null
        let ua = navigator.userAgent
        // let isChrome = ua.match(/.*?chrome.*?/i) !== null
        let isEdge = ua.match(/.*?(edg|edge).*?/i) !== null
        console.log(ua, isEdge)
        if (isEdge) {
            chromeExtApp.icon = edgeIcon
            chromeExtApp.link = edgeLink
        }
        storage.getLocal(keys.userApp, function(result) {
            if (result != null) {
                context.commit("initUserApps", result)
            } else {
                if (inWebsite) {
                    initApps.push(chromeExtApp)
                }
                context.commit("initUserApps", [initApps])
            }
        });
    },
    addAppToLocal(context, app) {
        context.commit("addAppToLocal", app)
    }
}