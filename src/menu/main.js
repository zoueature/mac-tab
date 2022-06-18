import { createApp } from 'vue'
import App from './components/app'
import store from '../popup/store'

const app = createApp(App)
app.use(store)
app.mount('#app')
