<template>
  <v-card class="pa-4 mb-6">
    <v-text-field
        v-model="local.name"
        label="Buscar por nombre"
        @input="onInput"
    />
    <v-select
        v-model="local.category"
        :items="categories"
        label="Categoría"
        @change="emitFilter"
    />
    <v-select
        v-model="local.brand"
        :items="brands"
        label="Marca"
        @change="emitFilter"
    />
    <v-select
        v-model="local.color"
        :items="colors"
        label="Color"
        @change="emitFilter"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import debounce from 'lodash/debounce'

const categories = ['Electrónica','Ropa','Hogar']
const brands     = ['Marca A','Marca B','Marca C']
const colors     = ['Rojo','Azul','Verde']

const local = ref({ name: '', category: '', brand: '', color: '' })

const emitFilter = () => {
  emit('filter', { ...local.value })
}

const onInput = debounce(emitFilter, 500)

const emit = defineEmits<{
  (e: 'filter', payload: Record<string, any>): void
}>()
</script>
