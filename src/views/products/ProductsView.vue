<!-- src/views/ProductsView.vue -->
<template>
  <v-container fluid>
    <!-- Filtros -->
    <ProductFilters @filter="onFilter" class="mb-8" />

    <!-- Grilla de productos -->
    <v-row>
      <!-- Skeleton loaders en la primera carga -->
      <v-col
          v-if="page === 1 && loading"
          cols="12"
          md="4"
          v-for="n in 6"
          :key="'skeleton-' + n"
      >
        <v-skeleton-loader
            type="image, heading, text, button"
        />
      </v-col>

      <!-- Estado vacío -->
      <v-col
          v-else-if="!loading && products.length === 0"
          cols="12"
          class="text-center"
      >
        No se encontraron productos.
      </v-col>

      <!-- Productos -->
      <v-col
          v-else
          cols="12"
          md="4"
          v-for="prod in products"
          :key="prod.id"
      >
        <v-card class="ma-2" elevation="2">
          <v-img
              :src="prod.images[0]?.url"
              height="180"
              contain
              class="grey lighten-2"
          />

          <v-card-title class="text-h6">
            {{ prod.name }}
          </v-card-title>

          <v-card-subtitle class="text--secondary mb-2">
            {{ prod.resumen }}
          </v-card-subtitle>

          <v-card-text>
            <div class="text-h5 font-weight-bold mb-2">
              ${{ prod.price }}
            </div>
            <div v-if="prod.categories.length" class="mb-1">
              <strong>Categorías:</strong>
              {{ prod.categories.map(c => c.name).join(', ') }}
            </div>
            <div v-if="prod.brands.length" class="mb-1">
              <strong>Marcas:</strong>
              {{ prod.brands.map(b => b.name).join(', ') }}
            </div>
            <div v-if="prod.colors.length" class="d-flex flex-wrap">
              <strong class="mr-2">Colores:</strong>
              <v-chip
                  v-for="c in prod.colors"
                  :key="c.id"
                  small
                  outlined
                  class="ma-1"
              >
                {{ c.name }}
              </v-chip>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
                color="primary"
                block
                :disabled="prod.stock === 0"
                @click="addToCart(prod)"
            >
              {{ prod.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Sentinel para infinite scroll -->
    <div ref="scroller" v-if="hasMore" style="height: 1px; width: 100%;"></div>

    <!-- Loader de “cargando más” -->
    <v-row justify="center" v-if="page > 1 && loading" class="my-6">
      <v-progress-circular indeterminate size="40" />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import ProductFilters from "../../modules/products/components/ProductFilters.vue";
import {useApi} from "../../globals/composables/useApi.ts";
import type {Product} from "../../modules/types/product.types.ts";
import {EndpointsEnum} from "../../utils/endpoints";
import {useCartStore} from "../../modules/cart/store/useCartStore.ts";


// API & estado
const { data, loading, fetchData } = useApi<Product[]>(EndpointsEnum.SHOP)
const products = ref<Product[]>([])
const page = ref(1)
const hasMore = ref(true)
const filters = ref<Record<string, any>>({})
const { postData, loading:loadingPostData, error: errorPostData } = useApi<any>(EndpointsEnum.CARTS);

// Carrito
const cart = useCartStore()

// Sentinel
const scroller = ref<HTMLElement>()

// Carga de página
const loadPage = async () => {
  if (!hasMore.value) return
  await fetchData({ page: page.value, ...filters.value })
  if (data.value) {
    if (data.value.length === 0) {
      hasMore.value = false
    } else {
      products.value.push(...data.value)
    }
  }
}

// Infinite scroll
onMounted(async () => {
  cart.fetchCartItems()

  await loadPage()
  await nextTick()

  const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !loading.value && hasMore.value) {
          observer.unobserve(entry.target)
          page.value++
          await loadPage()
          if (hasMore.value) observer.observe(entry.target)
        }
      },
      { rootMargin: '0px 0px 200px 0px', threshold: 0.1 }
  )

  if (scroller.value) observer.observe(scroller.value)
})

// Filtrado: resetea lista y vuelve a cargar
watch(filters, async () => {
  products.value = []
  page.value = 1
  hasMore.value = true
  await loadPage()
})

// Evento de filtro
const onFilter = (newFilters: Record<string, any>) => {
  filters.value = newFilters
}

// Agregar al carrito
const addToCart = (prod: Product) => {
  cart.addProduct({
    id: prod.id.toString(),
    name: prod.name,
    price: parseFloat(prod.price),
    quantity: 1,
    image: prod.images[0]?.url,
  })
   postData({ product_id: prod.id, stock: 1 });
}
</script>

<style scoped>
/* Puedes ajustar márgenes, paddings o estilos adicionales aquí */
</style>
