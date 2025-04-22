import { defineStore } from "pinia";
import type { CartItem } from "../../types/cart.types.ts";
import { useApi } from "../../../globals/composables/useApi.ts";
import { EndpointsEnum } from "../../../utils/endpoints";
import { toRaw } from "vue";

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [] as CartItem[],
        cartId: null as string | null,
    }),

    getters: {
        totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: (state) =>
            state.items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0),
    },

    actions: {
        async addProduct(product: CartItem["product"]) {
            const { fetchData, data, error } = useApi<CartItem>(EndpointsEnum.CARTS);
            try {
                await fetchData("POST", { product_id: product.id, quantity: 1 });

                if (data.value) {
                    this.items.push({
                        uuid: data.value.uuid,
                        product: data.value.product,
                        quantity: data.value.stock,
                    });
                }
            } catch (err) {
                console.error("Error al agregar el producto al carrito:", error.value);
            }
        },

        async removeProduct(cartItemUuid: string) {
            const { fetchData, error } = useApi<void>(`${EndpointsEnum.CARTS}/${cartItemUuid}`);
            try {
                await fetchData("DELETE");
                this.items = this.items.filter((i) => i.uuid !== cartItemUuid);
            } catch (err) {
                console.error("Error al eliminar el producto del carrito:", error.value);
            }
        },

        async updateProductQuantity(cartItemUuid: string, quantity: number) {
            const { fetchData, error } = useApi<CartItem>(`${EndpointsEnum.CARTS}/${cartItemUuid}`);
            try {
                await fetchData("PUT", { quantity });
                const item = this.items.find((i) => i.uuid === cartItemUuid);
                if (item) {
                    item.quantity = quantity;
                }
            } catch (err) {
                console.error("Error al actualizar el producto en el carrito:", error.value);
            }
        },

        clearCart() {
            this.items = [];
            this.cartId = null;
        },

        async fetchCartItems() {
            const { fetchData, data, error } = useApi<CartItem[]>(EndpointsEnum.CARTS);
            try {
                await fetchData();

                if (data.value) {
                    this.items = data.value.map((item) => ({
                        uuid: item.uuid,
                        product: item.product,
                        quantity: item.stock,
                    }));

                    // Guardamos el cartId desde el primer ítem (si aplica)
                    this.cartId = data.value[0]?.id?.toString() ?? null;
                }
            } catch (err) {
                console.error("Error al obtener los ítems del carrito:", error.value);
            }
        },
    },
});
