import {defineStore} from "pinia";
import type {CartItem} from "../../types/card.types.ts";
import {useApi} from "../../../globals/composables/useApi.ts";
import {EndpointsEnum} from "../../../utils/endpoints";

export const useCartStore = defineStore('cart', {
    state: () => ({ items: [] as CartItem[] }),
    getters: {
        totalItems: state => state.items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: state => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    },
    actions: {
        addProduct(product: CartItem) {

            const existing = this.items.find(i => i.id === product.id)
            if (existing) existing.quantity++
            else this.items.push({...product, quantity: 1})
        },
        removeProduct(id: string) {
            this.items = this.items.filter(i => i.id !== id)
        },
        clearCart() {
            this.items = []
        },
        async fetchCartItems() {
            const { fetchData, data, error } = useApi<CartItem[]>(EndpointsEnum.CARTS);
            try {
                await fetchData();
                if (data.value) {
                    this.items = data.value.map((item)=>({quantity: item.stock, ...item}));
                }
            } catch (err) {
                console.error('Error al obtener los ítems del carrito:', error.value);
            }
        },

    },
})