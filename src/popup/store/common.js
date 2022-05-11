import keys from "@/popup/store/keys";

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
    },
    updateConfig(state, key, val) {
        state.config[key] = val
        localStorage.setItem(keys.config, JSON.stringify(state.config))
    },
    updateConfigAndFsync(state, doSomething) {
        doSomething()
        localStorage.setItem(keys.config, JSON.stringify(state.config))
    }
}