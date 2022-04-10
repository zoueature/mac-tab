import { createApp } from 'vue'
import App from './components/app'
import vfmPlugin from 'vue-final-modal'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import {createRouter, createWebHistory} from "vue-router";
import routers from "./components/App/app_route"

const router = createRouter({
    // 4. 内部提供了 history 模式的实现s。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes: routers, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(vfmPlugin)
app.use(ElementPlus)
app.mount('#app')
