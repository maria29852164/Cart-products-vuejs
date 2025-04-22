// src/modules/auth/composables/useAuth.ts

import { useAuthStore } from '../store/useAuthStore.ts';
import { EndpointsEnum } from '../../../utils/endpoints';
import { useCartStore } from '../../cart/store/useCartStore.ts';

export function useAuth() {
    const store = useAuthStore();
    const cart = useCartStore();

    const url = import.meta.env.VITE_API_URL;

    const login = async (email: string, password: string) => {
        const res = await fetch(`${url}/${EndpointsEnum.LOGIN}`, {
            method: 'POST',
            headers: { [EndpointsEnum.CONTENT_TYPE]: EndpointsEnum.APPLICATION_TYPE },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error('Login failed');

        const response = await res.json();
        store.setToken(response.data.token);
    };

    const logout = async () => {
        // Aquí puedes agregar lógica adicional para cerrar sesión, como llamar a un endpoint de logout si es necesario

        // Limpiar el carrito
        cart.clearCart();

        // Limpiar el token de autenticación
        store.logout();
    };

    return { login, logout, token: store.token };
}
