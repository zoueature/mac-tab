import { createApp } from 'vue'
import App from './components/app'
import store from './store'
import {createRouter, createMemoryHistory} from "vue-router";
import appCfg from "./components/App/app_config"
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './css/common.css'
import axios from './components/api/axios'
import installLoading from "@/popup/components/common/loading_install";
import right_drawer_install from "@/popup/components/common/right_drawer_install";
import {createI18n} from 'vue-i18n'
import cn from '../_locales/zh_CN/i18n'
import en from '../_locales/en/i18n'

const router = createRouter({
    // 4. 内部提供了 history 模式的实现s。为了简单起见，我们在这里使用 hash 模式。
    history: createMemoryHistory(),
    routes: appCfg.routes, // `routes: routes` 的缩写
})
const i18n = createI18n({
    locale: "zh",
    silentFallbackWarn: true,
    messages: {
        "zh": cn,
        "en": en,
    }
})
const app = createApp(App)
app.use(store)
app.use(i18n)
app.use(router)
app.use(installLoading)
app.use(right_drawer_install)

// let http = axios.create({
//     // baseURL: "http://127.0.0.1:9090"
//     baseURL: "http://api.crazyman.ml"
// })
app.config.globalProperties.$http = axios.http
// app.use(VueAxios, axios)
app.mount('#app')
