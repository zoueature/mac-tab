import {createApp} from 'vue'

import Loading from "@/popup/components/common/Loading";

export default {
    loading:  null,
    install(Vue) {
        if (!this.loading) {
            let instance = createApp(Loading)
            let div = document.createElement('div')
            document.body.appendChild(div)
            this.loading = instance.mount(div)
        }
        Vue.config.globalProperties.$loading = this.loading
    }
}