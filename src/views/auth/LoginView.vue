<template>
  <v-app>

    <Login/>

  </v-app>
</template>


<script setup lang="ts">
import Login from "../../modules/components/login.vue";

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
