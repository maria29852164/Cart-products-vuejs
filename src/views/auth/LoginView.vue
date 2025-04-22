<template>
  <v-container class="mt-14">
    <Login/>

  </v-container>


</template>


<script setup lang="ts">
import Login from "../../modules/auth/components/login.vue";

import { useI18n } from 'vue-i18n'
import {computed, type WritableComputedRef} from 'vue'

const { locale } = useI18n()

const locales = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
]

const selected: WritableComputedRef<string, string> = computed({
  get: () => locale.value,
  set: (val) => {
    locale.value = val
  },
})
</script>
