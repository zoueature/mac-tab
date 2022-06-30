import keys from "@/popup/store/keys"
import storage from "@/chrome/storage"

export default {
    fsyncApp(state) {
        //localStorage.setItem(keys.userApp, JSON.stringify(state.fmtApps))
        // let val = {}
        let fmtApps = []
        state.fmtApps.forEach( (page, i) => {
            if (page.length > 0) {
                let apps = []
                page.forEach(app => {
                    apps.push(app)
                })
                fmtApps.push(apps)
            } else {
                fmtApps.splice(i, 1)
            }
        })
        storage.setLocal(keys.userApp, fmtApps)
        // val[keys.userApp] = fmtApps
        // chrome.storage.local.set(val, function() {
        // });
        // chrome.storage.local.get([keys.userApp], function () {
        // });
    },
    updateConfig(state, key, val) {
        state.config[key] = val
        localStorage.setItem(keys.config, JSON.stringify(state.config))
        storage.setLocal(keys.config, state.config)
        // let storageVal = {}
        // storageVal[keys.config] = state.config
        // chrome.storage.local.set(storageVal, function() {
        // });
    },
    updateConfigAndFsync(state, doSomething) {
        doSomething()
        localStorage.setItem(keys.config, JSON.stringify(state.config))
        storage.setLocal(keys.config, state.config)
        // let storageVal = {}
        // storageVal[keys.config] = state.config
        // chrome.storage.local.set(storageVal, function() {
        // });
    }
}