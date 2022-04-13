import keys from "@/popup/store/keys";

export default {
    openApp(state) {
        state.showApp = true
    },
    closeApp(state) {
        state.showApp = false
    },
    openDrawer(state) {
        state.showDrawer = true
    },
    closeDrawer(state) {
        state.showDrawer = false
    },
    openLoading(state) {
        state.showLoading = true
    },
    closeLoading(state) {
        state.showLoading = false
    },
    setWallpaper(state, wallpaper) {
        state.wallpaper = wallpaper
    },

    //----------- app ---------------
    addApp(state, app) {
        state.userApps.push(app)
        localStorage.setItem(keys.userApp, JSON.stringify(state.userApps))
    },
    removeApp(state, app) {
        state.userApps.forEach((v, i) => {
            if (v.id === app.id) {
                state.userApps.splice(i, 1)
            }
        })
        localStorage.setItem(keys.userApp, JSON.stringify(state.userApps))
    },
    initUserApps(state, apps) {
        state.userApps = apps
    },
}