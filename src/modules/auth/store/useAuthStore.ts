import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '' as string,
    }),
    actions: {
        setToken(token: string) {
            this.token = token
            localStorage.setItem('token', token)
        },
        loadToken() {
            const savedToken = localStorage.getItem('token')
            if (savedToken) this.token = savedToken
        },
        logout() {
            this.token = ''
            localStorage.removeItem('token')
        },
    },
})