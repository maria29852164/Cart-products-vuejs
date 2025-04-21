import { createApp } from 'vue'
import 'vuetify/styles'


import App from './App.vue'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Opcional, si usas íconos mdi
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createPinia} from "pinia";
import {i18n} from "./i18n";
import router from "./router";
import {useAuthStore} from "./modules/auth/store/useAuthStore.ts";

const vuetify = createVuetify({
    components,
    directives,
})
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
const authStore = useAuthStore()
authStore.loadToken()
// settings
app.use(i18n)
app.use(vuetify)
app.use(router)


app.mount('#app')
