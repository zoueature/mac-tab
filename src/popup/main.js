import { createApp } from 'vue'
import App from './components/app'
import store from './store'
import {createRouter, createWebHistory} from "vue-router";
import appCfg from "./components/App/app_config"
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './css/common.css'
import axios from './components/api/axios'
// import VueAxios from 'vue-axios'

const router = createRouter({
    // 4. 内部提供了 history 模式的实现s。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes: appCfg.routes, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(store)
// app.use(ElementPlus)
app.use(router)

// let http = axios.create({
//     // baseURL: "http://127.0.0.1:9090"
//     baseURL: "http://api.crazyman.ml"
// })
app.config.globalProperties.$http = axios.http
// app.use(VueAxios, axios)
app.mount('#app')
