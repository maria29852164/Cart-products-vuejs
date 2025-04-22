<template>
  <v-menu open-on-hover offset-y>
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-cart</v-icon>
        <v-badge :content="cart.totalItems" color="red" />
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="item in cart.items" :key="item.uuid">
        <v-list-item-avatar>
          <v-img :src="item.product.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.product.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.quantity }} × ${{ item.product.price }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <!-- Botón para disminuir cantidad -->
          <v-btn icon @click="updateQuantity(item.uuid, item.quantity - 1)" :disabled="item.quantity <= 1">
            <v-icon>mdi-minus</v-icon>
          </v-btn>

          <!-- Botón para aumentar cantidad -->
          <v-btn icon @click="updateQuantity(item.uuid, item.quantity + 1)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <!-- Botón para eliminar producto -->
          <v-btn icon @click="removeProduct(item.uuid)">
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
import { onMounted, toRaw } from "vue";
import { useApi } from "../../../globals/composables/useApi.ts";
import { EndpointsEnum } from "../../../utils/endpoints";

const cart = useCartStore();
const router = useRouter();
const { postData } = useApi<any>(EndpointsEnum.CARTS);

// Cargar el carrito cuando el componente se monta
onMounted(() => {
  cart.fetchCartItems();  // Cargar el carrito inicial
});

// Función para actualizar la cantidad de un producto en el carrito
const updateQuantity = async (cartItemUuid: string, newQuantity: number) => {
  if (newQuantity > 0) {
    // Actualiza el carrito localmente primero
    const item = cart.items.find((i) => i.uuid === cartItemUuid);
    if (item) {
      item.quantity = newQuantity;
    }

    // Llamada a la API para actualizar la cantidad
    try {
      await postData({ product_id: item?.product.id, stock: newQuantity }, toRaw(cart.cartId), 'PATCH');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }
};

// Función para eliminar un producto del carrito
const removeProduct = async (cartItemUuid: string) => {
  // Elimina el producto localmente antes de hacer la llamada a la API
  cart.removeProduct(cartItemUuid);

  // Llamada a la API para eliminar el producto
  try {
    await postData({ product_id: cartItemUuid, stock: 0 }, toRaw(cart.cartId), 'PATCH');
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

// Redirigir al checkout
const goToCheckout = () => {
  router.push({ name: 'checkout' });
};
</script>
