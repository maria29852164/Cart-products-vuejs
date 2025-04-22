<template>
  <v-menu open-on-hover offset-y>
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-cart</v-icon>
        <v-badge :content="cart.totalItems" color="red" />
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="item in cart.items" :key="item.id">
        <v-list-item-avatar>
          <v-img :src="item.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.quantity }} × ${{ item.price }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="cart.removeProduct(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <strong>Total:</strong> ${{ cart.totalPrice }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-btn block @click="goToCheckout">Checkout</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {useCartStore} from "../store/useCartStore.ts";

const cart = useCartStore()
const router = useRouter()

const goToCheckout = () => {
  router.push({ name: 'checkout' })
}
</script>
