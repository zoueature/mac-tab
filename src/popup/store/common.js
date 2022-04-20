import keys from "@/popup/store/keys";

export default {
    fsyncApp(state) {
        let allApp = []
        state.fmtApps.forEach((v) => {
            v.forEach((app) => {
                allApp.push(app)
            })
        })
        state.userApps = allApp
        localStorage.setItem(keys.userApp, JSON.stringify(state.userApps))
    },
}