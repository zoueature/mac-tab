import {createStore} from "vuex";
import mutations from "@/popup/store/mutations";
import state from "@/popup/store/state";
import getters from "@/popup/store/getters";
import action from "@/popup/store/action";

export default createStore({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: action,
    modules: {
    }
})