import keys from "@/popup/store/keys";
/* eslint-disable */
export default {
    fsyncApp(state) {
        localStorage.setItem(keys.userApp, JSON.stringify(state.fmtApps))
        let val = {}
        val[keys.userApp] = state.fmtApps
        chrome.storage.local.set(val, function() {
            // console.log(val);
        });
        chrome.storage.local.get([keys.userApp], function (res) {
            // console.log(res)
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