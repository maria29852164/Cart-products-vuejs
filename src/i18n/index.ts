import {createI18n} from "vue-i18n";

const messages = {
    en: {
        login: {
            title: 'Login',
            email: 'Email',
            password: 'Password',
            loginButton: 'Login',
            error: 'Incorrect email or password',
            required: 'This field is required',
        },
    },
    es: {
        login: {
            title: 'Iniciar sesión',
            email: 'Correo',
            password: 'Contraseña',
            loginButton: 'Iniciar sesión',
            error: 'Correo o contraseña incorrectos',
            required: 'Este campo es requerido',
        },
    },
}

export const i18n = createI18n({
    messages,
})