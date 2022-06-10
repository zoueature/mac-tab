import keys from "@/popup/store/keys";
/* eslint-disable */
export default {
    fsyncApp(state) {
        let allApp = []
        state.fmtApps.forEach((v) => {
            v.forEach((app, i) => {
                if (app.type === 'folder' && app.apps.length === 0) {
                    console.log(app)
                    v.splice(i, 1)
                } else {
                    allApp.push(app)
                }
            })
        })
        state.userApps = allApp
        localStorage.setItem(keys.userApp, JSON.stringify(allApp))
        let val = {}
        val[keys.userApp] = allApp
        chrome.storage.local.set(val, function() {
            console.log(val);
        });
        chrome.storage.local.get([keys.userApp], function (res) {
            console.log(res)
        });
    },
    updateConfig(state, key, val) {
        state.config[key] = val
        localStorage.setItem(keys.config, JSON.stringify(state.config))
        let storageVal = {}
        storageVal[keys.config] = state.config
        chrome.storage.local.set(storageVal, function() {
        });
    },
    updateConfigAndFsync(state, doSomething) {
        doSomething()
        localStorage.setItem(keys.config, JSON.stringify(state.config))
        let storageVal = {}
        storageVal[keys.config] = state.config
        chrome.storage.local.set(storageVal, function() {
        });
    }
}