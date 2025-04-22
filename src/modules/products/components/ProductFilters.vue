<template>
  <v-card class="pa-4 mb-6">
    <v-text-field
        v-model="local.name"
        label="Buscar por nombre"
        @input="onInput"
    />
    <v-text-field
        v-model="local.slug"
        label="Buscar por slug"
        @input="onInput"
    />
    <v-text-field
        v-model="local.status"
        label="Buscar por estado"
        @input="onInput"
    />
    <v-text-field
        v-model="local.description"
        label="Buscar por descripción"
        @input="onInput"
    />

  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {useApi} from "../../../globals/composables/useApi.ts";
import debounce from "debounce";
import type {Category} from "../../types/categories.types.ts";
import {EndpointsEnum} from "../../../utils/endpoints";



const local = ref({
  name: '',
  slug: '',
  status: '',
  description: '',
  category: '',
});

const emit = defineEmits<{
  (e: 'filter', payload: Record<string, any>): void;
}>();

const emitFilter = () => {
  emit('filter', { ...local.value });
};

const onInput = debounce(emitFilter, 500);

// Obtener categorías desde el endpoint con filtros
const {
  data: categoriesData,
  loading: loadingCategories,
  error: errorCategories,
  fetchData: fetchCategories,
} = useApi<Category[]>(EndpointsEnum.SHOP_CATEGORIES);

const categories = ref<Array<{ id: string; name: string }>>([]);

const fetchFilteredCategories = () => {
  const filters = {
    name: local.value.name,
    slug: local.value.slug,
    status: local.value.status,
    description: local.value.description,
  };
  fetchCategories(filters);
};

onMounted(() => {
  fetchFilteredCategories();
});

watch(
    () => [local.value.name, local.value.slug, local.value.status, local.value.description],
    () => {
      fetchFilteredCategories();
    }
);

watch(
    () => categoriesData.value,
    (newVal) => {
      if (newVal) {
        categories.value = newVal;
      }
    }
);
</script>
