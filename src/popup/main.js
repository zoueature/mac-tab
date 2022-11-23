import { createApp } from 'vue'
import App from './components/app'
import store from './store'
import {createRouter, createMemoryHistory} from "vue-router";
import appCfg from "./components/App/app_config"
import 'element-plus/dist/index.css'
import './css/common.css'
import axios from './components/api/axios'
import right_drawer_install from "@/popup/components/common/right_drawer_install";
import in18 from "../i18n/in18"

const router = createRouter({
    // 4. 内部提供了 history 模式的实现s。为了简单起见，我们在这里使用 hash 模式。
    history: createMemoryHistory(),
    routes: appCfg.routes, // `routes: routes` 的缩写
})
const app = createApp(App)
app.use(store)
app.use(router)
app.use(right_drawer_install)
app.use(in18)
app.config.globalProperties.$http = axios.http
app.mount('#app')
