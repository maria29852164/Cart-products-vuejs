<!-- src/views/CartView.vue -->
<template>
  <v-container>
    <v-row>
      <!-- Columna principal: lista de productos -->
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            Mi Carrito
            <v-spacer />
            <small class="grey--text">({{ cart.totalItems }} ítems)</small>
          </v-card-title>
          <v-divider />

          <v-list two-line>
            <v-list-item v-for="item in cart.items" :key="item.id">
              <!-- Imagen -->
              <v-list-item-avatar size="80">
                <v-img :src="item.image" contain />
              </v-list-item-avatar>

              <!-- Nombre y precio unitario -->
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  ${{ item.price.toFixed(2) }} c/u
                </v-list-item-subtitle>
                <!-- Controles de cantidad -->
                <v-row class="mt-2" align="center" dense>
                  <v-btn icon small @click="decrement(item)">
                    <v-icon small>mdi-minus</v-icon>
                  </v-btn>
                  <div class="mx-2">{{ item.quantity }}</div>
                  <v-btn icon small @click="increment(item)">
                    <v-icon small>mdi-plus</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-content>

              <!-- Subtotal y eliminar -->
              <v-list-item-action>
                <div class="mr-4 font-weight-medium">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
                <v-btn icon @click="remove(item.id)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Columna lateral: resumen de pedido -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Resumen del Pedido</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row justify="space-between">
              <span>Subtotal</span>
              <span>${{ cart.totalPrice.toFixed(2) }}</span>
            </v-row>
            <v-row justify="space-between">
              <span>Envío</span>
              <span>Gratis</span>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-text class="d-flex justify-space-between font-weight-bold">
            <span>Total</span>
            <span>${{ cart.totalPrice.toFixed(2) }}</span>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="primary" @click="checkout">
              Proceder al Pago
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {useCartStore} from "../../cart/store/useCartStore.ts";
import type {CartItem} from "../../types/card.types.ts";
import {useApi} from "../../../globals/composables/useApi.ts";
import {EndpointsEnum} from "../../../utils/endpoints";



const cart = useCartStore()
const router = useRouter()

// Incrementar cantidad
const increment = async (item: CartItem) => {


  cart.addProduct(item)


}

// Decrementar cantidad (elimina si llega a 0)
const decrement = (item: CartItem) => {
  if (item.quantity > 1) {
    cart.removeOne(item.id) // implementa removeOne en el store para restar 1
  } else {
    remove(item.id)
  }
}

// Eliminar por completo
const remove = (id: string) => {
  cart.removeProduct(id)
}

// Checkout
const checkout = () => {
  router.push({ name: 'checkout' }) // define esa ruta en tu router
}
</script>
