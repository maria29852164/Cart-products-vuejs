<template >
  <v-row class="d-flex justify-center align-center">
    <v-col   cols="6">
      <v-card  >
        <v-card-title class="text-center  pa-8" >

          <span class=" text-h4   grey-darken-3  font-weight-bold">{{ t('login.title') }}</span>
        </v-card-title>

        <v-card-subtitle >
          <v-form @submit.prevent="handleLogin">
            <v-text-field
                class="mb-2 mt-2"
                v-model="email"
                :label="t('login.email')"
                outlined
                :rules="emailRules"
            />
            <v-text-field
                class="mb-2 mt-2"

                v-model="password"
                :label="t('login.password')"
                type="password"
                outlined
                :rules="passwordRules"
            />
            <v-container class="d-flex justify-center align-center">
              <v-btn
                  type="submit"

                  class="text-none text-subtitle-1 w-25 rounded-xl	"
                  color="green-darken-4"
              >
                {{ t('login.loginButton') }}
              </v-btn>
            </v-container>


          </v-form>
        </v-card-subtitle>

        <v-card-actions>
          <v-alert v-if="error" type="error" dismissible>
            {{ t('login.error') }}
          </v-alert>
        </v-card-actions>
      </v-card>
    </v-col>

  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from "../auth/composables/useAuth.ts";
import { useI18n } from "vue-i18n";

// Usar 't' de useI18n
const { t } = useI18n()

const email = ref('')
const password = ref('')
const error = ref('')

// Reemplazar $t por t()
const emailRules = [(v: string) => !!v || t('login.required')]
const passwordRules = [(v: string) => !!v || t('login.required')]

const { login } = useAuth()

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    alert(t('login.title') + ' ¡exitoso!') // Ejemplo de mensaje en español
  } catch (err) {
    error.value = t('login.error')
  }
}
</script>

<style scoped>
/* Personaliza estilos si lo necesitas */
</style>
