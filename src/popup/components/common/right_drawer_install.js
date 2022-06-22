import {createApp} from 'vue'

import RightDrawer from "@/popup/components/common/RightDrawer";

export default {
    loading:  null,
    install(Vue) {
        Vue.config.globalProperties.$drawer = {
            instance: null,
            div: null,
            open() {
                this.instance = createApp(RightDrawer)
                this.div = document.createElement('div')
                document.body.appendChild(this.div)
                this.instance.mount(this.div)
            },
            close() {
                this.instance.unmount(this.div)
            }
        }
    }
}