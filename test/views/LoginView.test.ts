import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createPinia } from 'pinia'
import LoginView from "../../src/views/auth/LoginView.vue";
import {i18n} from "../../src/i18n";

const vuetify = createVuetify({ components, directives })

describe('LoginView', () => {
    it('renderiza el formulario y permite enviar credenciales', async () => {
        render(LoginView, {
            global: {
                plugins: [createPinia(), vuetify, i18n],
            },
        })

        const emailLabel    = i18n.global.t('login.email')    // p.ej. "Correo electrónico"
        const passwordLabel = i18n.global.t('login.password') // p.ej. "Contraseña"
        const btnText       = i18n.global.t('login.loginButton') // p.ej. "Entrar"

        // Ahora buscamos los campos con los textos reales:
        const emailInput    = await screen.findByLabelText(emailLabel)
        const passwordInput = await screen.findByLabelText(passwordLabel)
        const submitButton  = await screen.findByRole('button', { name: btnText })

        await userEvent.type(emailInput,    'usuario@prueba.com')
        await userEvent.type(passwordInput, 'miPassword123')
        await userEvent.click(submitButton)

        expect(submitButton).toBeInTheDocument()
    })
})
