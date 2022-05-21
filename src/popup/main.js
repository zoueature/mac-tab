import { createApp } from 'vue'
import App from './components/app'
import store from './store'
import {createRouter, createWebHashHistory} from "vue-router";
import routers from "./components/App/app_route"
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './css/common.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

const router = createRouter({
    // 4. 内部提供了 history 模式的实现s。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: routers, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(store)
// app.use(ElementPlus)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
