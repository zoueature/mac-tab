import { createApp } from 'vue'
import App from './components/app'
import vfmPlugin from 'vue-final-modal'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'




const app = createApp(App)
app.use(vfmPlugin)
app.use(ElementPlus)
app.mount('#app')
