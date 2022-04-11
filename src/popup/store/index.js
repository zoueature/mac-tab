import {createStore} from "vuex";

export default createStore({
    state: {
        showApp: false,
        showDrawer: false,
        wallpaper: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
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