import {createStore} from "vuex";

export default createStore({
    state: {
        showApp: false,
    },
    getters: {
       showApp(state) {
           return state.showApp
       }
    },
    mutations: {
        openApp(state) {
            state.showApp = true
        },
        closeApp(state) {
            state.showApp = false
        }
    },
    actions: {

    },
    modules: {
    }
})