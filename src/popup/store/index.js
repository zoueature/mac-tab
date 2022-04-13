import {createStore} from "vuex";
import mutations from "@/popup/store/mutations";
import state from "@/popup/store/state";
import getters from "@/popup/store/getters";

export default createStore({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: {

    },
    modules: {
    }
})