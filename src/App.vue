<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app color="green-darken-4" dark>
      <v-toolbar-title>Mi Aplicación</v-toolbar-title>
      <v-spacer/>
      <Cart/>

      <v-select
          v-model="locale"
          :items="locales"
          label="Idioma"
          item-title="label"
          item-value="code"
          dense
          hide-details
          style="max-width: 150px"
      />
      <!-- Botón de Logout, solo si está autenticado -->
      <v-btn
          v-if="isAuthenticatedComputed"
          icon
          @click="handleLogout"
          title="Cerrar sesión"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content (Login Form) -->
    <v-main>
      <router-view/>
    </v-main>

    <!-- Footer -->
    <v-footer app color="green-darken-4">
      <v-row justify="center" align="center" class="py-4">
        <v-col class="text-center" cols="12">
          <span>&copy; 2025 Mi Aplicación. Todos los derechos reservados.</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>


<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import {computed, onMounted} from 'vue'
import {useRouter} from "vue-router";
import {useAuth} from "./modules/auth/composables/useAuth.ts";
import Cart from "./modules/cart/components/cart.vue";
import {useCartStore} from "./modules/cart/store/useCartStore.ts";

const { locale } = useI18n()

const locales = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
]

const selected = computed({
  get: () => locale.value,
  set: (val) => {
    locale.value = val
  },
})
const router = useRouter()
const { token, logout } = useAuth()
const isAuthenticatedComputed = computed(() => !(token=='' || !token))
const handleLogout = () => {
  logout()                         // Limpia el estado de autenticación
  router.push({ name: 'login' })  // Redirige al login
}

</script>
