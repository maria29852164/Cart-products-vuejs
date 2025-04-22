// src/plugins/axios.ts
import axios from 'axios'
import router from "../router";
import {EndpointsEnum} from "../utils/endpoints";
import {useAuthStore} from "../modules/auth/store/useAuthStore.ts";
const url =  import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: url,
    headers: { [EndpointsEnum.CONTENT_TYPE]: EndpointsEnum.APPLICATION_TYPE },
    timeout: 10000,
})
// add token if already exist

api.interceptors.request.use(config => {
    const auth = useAuthStore()
    if (auth.token) {
        config.headers!['Authorization'] = `Bearer ${auth.token}`
    }
    return config
})
//Global error

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            const auth = useAuthStore()
            auth.logout()
            router.push({ name: EndpointsEnum.LOGIN })
        }
        // Puedes mostrar un toast global aquí
        return Promise.reject(err)
    }
)
