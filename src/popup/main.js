import { createApp } from 'vue'
import App from './components/app'
import vfmPlugin from 'vue-final-modal'




const app = createApp(App)
app.use(vfmPlugin)
app.mount('#app')
