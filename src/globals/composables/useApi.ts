// src/composables/useApi.ts
import { ref } from 'vue'
import type { AxiosRequestConfig } from 'axios'
import {useI18n} from "vue-i18n";
import {api} from "../../plugins/axios.ts";

export function useApi<T>(endpoint: string, options?: AxiosRequestConfig) {
    const data = ref<T | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const empty = ref(false)
    const { t } = useI18n()


    const fetchData = async (params = {}) => {
        loading.value = true
        error.value = null
        try {
            const res = await api.get<T>(endpoint, { ...options, params })
            data.value = res.data?.data
            empty.value = Array.isArray(res.data) ? res.data.length === 0 : !res.data
        } catch (e: any) {
            error.value = e.message || t('errors.globalError')
        } finally {
            loading.value = false
        }
    }

    return { data, loading, error, empty, fetchData }
}
