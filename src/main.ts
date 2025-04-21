import { createApp } from 'vue'
import 'vuetify/styles'


import App from './App.vue'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Opcional, si usas íconos mdi
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createPinia} from "pinia";
import {i18n} from "./i18n";

const vuetify = createVuetify({
    components,
    directives,
})
const pinia = createPinia()

createApp(App).use(i18n).use(pinia).use(vuetify).mount('#app')
