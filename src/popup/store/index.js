import {createStore} from "vuex";

export default createStore({
    state: {
        showApp: false,
        showDrawer: false,
        wallpaper: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    getters: {
       showApp(state) {
           return state.showApp
       },
        wallpaper(state) {
           return state.wallpaper
        },
        showDrawer(state) {
           return state.showDrawer
        }
    },
    mutations: {
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
        setWallpaper(state, wallpaper) {
            state.wallpaper = wallpaper
        }
    },
    actions: {

    },
    modules: {
    }
})