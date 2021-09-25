import { createApp } from 'vue'
import App from './App.vue'
import VueClipboard from 'vue3-clipboard'
import './css/main.css'
import router from './router'

createApp(App)
.use(router)
.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
})
.mount('#app')
