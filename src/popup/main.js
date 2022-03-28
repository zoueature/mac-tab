import { createApp } from 'vue'
import App from './components/app'
import { GDialog } from 'gitart-vue-dialog'
import { plugin as dialogPlugin } from 'gitart-vue-dialog'
import 'gitart-vue-dialog/dist/style.css'





const app = createApp(App)
app.component('GDialog', GDialog)
app.use(dialogPlugin)
app.mount('#app')
