<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app color="green-darken-4" dark>
      <v-toolbar-title>Mi Aplicación</v-toolbar-title>
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
import { computed } from 'vue'

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
</script>
