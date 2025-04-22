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
          <!-- Botón para disminuir cantidad -->
          <v-btn icon @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <!-- Botón para aumentar cantidad -->
          <v-btn icon @click="updateQuantity(item.id, item.quantity + 1)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <!-- Botón para eliminar producto -->
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
import { useRouter } from 'vue-router';
import { useCartStore } from "../store/useCartStore.ts";
import {onMounted, toRaw} from "vue";
import {useApi} from "../../../globals/composables/useApi.ts";
import {EndpointsEnum} from "../../../utils/endpoints";

const cart = useCartStore();
const router = useRouter();
const {postData} = useApi<any>(EndpointsEnum.CARTS)

onMounted(() => {
  cart.fetchCartItems(); // Cargar los productos del carrito al iniciar el componente
});

// Función para actualizar la cantidad de un producto
const updateQuantity = (productId: string, newQuantity: number) => {
  if (newQuantity > 0) {
    cart.updateProductQuantity(productId, newQuantity); // Actualiza la cantidad en el carrito
    postData({ product_id: productId, stock: newQuantity }, toRaw(cart.cartId),'PATCH');
    cart.fetchCartItems();

  }
};

const goToCheckout = () => {
  router.push({ name: 'checkout' });
};


</script>
