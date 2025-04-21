// src/modules/auth/composables/useAuth.ts

import {useAuthStore} from "../store/useAuthStore.ts";
import {EndpointsEnum} from "../../../utils/endpoints";

export function useAuth() {
    const store = useAuthStore()
    const url =  import.meta.env.VITE_API_URL;

    const login = async (email: string, password: string) => {
        const res = await fetch( `${url}/${EndpointsEnum.LOGIN}`, {
            method: 'POST',
            headers: { [EndpointsEnum.CONTENT_TYPE]: EndpointsEnum.APPLICATION_TYPE },
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) throw new Error('Login failed')

        const data = await res.json()
        store.setToken(data.token)
    }

    return { login, logout: store.logout, token: store.token }
}
