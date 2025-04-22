<template>
  <v-container fluid>
    <ProductFilters @filter="onFilter" class="mb-8" />

    <v-row>
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
        {{ $t('products.productNotFound') }}
      </v-col>

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
              <strong>{{ $t('products.categories') }}</strong>
              {{ prod.categories.map(c => c.name).join(', ') }}
            </div>
            <div v-if="prod.brands.length" class="mb-1">
              <strong>{{ $t('products.brands') }}</strong>
              {{ prod.brands.map(b => b.name).join(', ') }}
            </div>
            <div v-if="prod.colors.length" class="d-flex flex-wrap">
              <strong class="mr-2">{{ $t('products.colors') }}</strong>
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
              {{ prod.stock > 0 ? $t('products.addToCart') : $t('products.outOfStock') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div ref="scroller" v-if="hasMore" style="height: 1px; width: 100%;"></div>

    <!-- Loader de “cargando más” -->
    <v-row justify="center" v-if="page > 1 && loading" class="my-6">
      <v-progress-circular indeterminate size="40" />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {ref, onMounted, watch, nextTick, toRaw} from 'vue';
import ProductFilters from "../../modules/products/components/ProductFilters.vue";
import { useApi } from "../../globals/composables/useApi.ts";
import type { Product } from "../../modules/types/product.types.ts";
import { EndpointsEnum } from "../../utils/endpoints";
import { useCartStore } from "../../modules/cart/store/useCartStore.ts";

// API & estado
const { data, loading, fetchData } = useApi<Product[]>(EndpointsEnum.SHOP);
const products = ref<Product[]>([]);
const page = ref(1);
const hasMore = ref(true);
const filters = ref<Record<string, any>>({});
const { postData, loading: loadingPostData, error: errorPostData } = useApi<any>(EndpointsEnum.CARTS);

const cart = useCartStore();

const scroller = ref<HTMLElement>();

const loadPage = async () => {
  if (!hasMore.value) return;
  await fetchData({ page: page.value, ...filters.value });
  if (data.value) {
    if (data.value.length === 0) {
      hasMore.value = false;
    } else {
      products.value.push(...data.value);
    }
  }
};

// Infinite scroll
onMounted(async () => {
  cart.fetchCartItems();

  await loadPage();
  await nextTick();

  const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !loading.value && hasMore.value) {
          observer.unobserve(entry.target);
          page.value++;
          await loadPage();
          if (hasMore.value) observer.observe(entry.target);
        }
      },
      { rootMargin: '0px 0px 200px 0px', threshold: 0.1 }
  );

  if (scroller.value) observer.observe(scroller.value);
});

watch(filters, async () => {
  products.value = [];
  page.value = 1;
  hasMore.value = true;
  await loadPage();
});

const onFilter = (newFilters: Record<string, any>) => {
  filters.value = newFilters;
};

const addToCart = (prod: Product) => {
  const existingCartItem = toRaw(cart.items).find((item) => item.product.id == prod.id);
  if(!existingCartItem) {
    cart.addProduct({
      id: prod.id.toString(),
      name: prod.name,
      price: parseFloat(prod.price),
      quantity: 1,
      image: prod.images[0]?.url,
    });
    postData({ product_id: prod.id, stock: 1 });
  }

};
</script>
