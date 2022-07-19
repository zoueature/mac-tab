import keys from "@/popup/store/keys"
import storage from "@/chrome/storage"

export default {
    fsyncApp(state) {
        let fmtApps = []
        state.fmtApps.forEach( (page, i) => {
            if (page.length > 0) {
                let apps = []
                page.forEach((app, index) => {
                    if (app.type === 'folder' && app.apps.length === 0) {
                        // 删除空文件夹
                        state.fmtApps[i].splice(index, 1)
                    } else {
                        apps.push(app)
                    }
                })
                fmtApps.push(apps)
            } else {
                // 页面没有app， 删除页面
                state.fmtApps.splice(i, 1)
            }
        })
        storage.setLocal(keys.userApp, fmtApps)
    },
    updateConfig(state, key, val) {
        state.config[key] = val
        localStorage.setItem(keys.config, JSON.stringify(state.config))
        storage.setLocal(keys.config, state.config)
    },
    updateConfigAndFsync(state, doSomething) {
        doSomething()
        localStorage.setItem(keys.config, JSON.stringify(state.config))
        storage.setLocal(keys.config, state.config)
    }
}