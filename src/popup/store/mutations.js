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
    addApp(state, app) {
        state.userApps.push(app)
    }
}