// src/composables/useApi.ts
import { ref } from 'vue'
import type { AxiosRequestConfig } from 'axios'
import {useI18n} from "vue-i18n";
import {api} from "../../plugins/axios.ts";
import {EndpointsEnum} from "../../utils/endpoints";
import {useAuth} from "../../modules/auth/composables/useAuth.ts";

export function useApi<T>(endpoint: string, options?: AxiosRequestConfig) {
    const data = ref<T | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const empty = ref(false)
    const {token} = useAuth()

    const url =  import.meta.env.VITE_API_URL;

    const fetchData = async (params = {}) => {
        loading.value = true
        error.value = null
        try {
            const res = await api.get<T>(endpoint, { ...options, params })
             data.value = res.data.data



            empty.value = Array.isArray(res.data) ? res.data.length === 0 : !res.data
        } catch (e: any) {
            error.value = e.message || "Error"
        } finally {
            loading.value = false
        }
    }
    const postData = async (payload: Record<string, any>,params='', method='POST') => {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetch(params !=='' ?`${url}/${endpoint}/${params}` :`${url}/${endpoint}`, {
                method: method,
                headers: {
                    [EndpointsEnum.CONTENT_TYPE]: EndpointsEnum.APPLICATION_TYPE,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error('Error en la solicitud POST');
            data.value = await response.json();
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error desconocido';
        } finally {
            loading.value = false;
        }
    };
    return { data, loading, error, empty, fetchData, postData }
}
