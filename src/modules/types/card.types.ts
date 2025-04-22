export interface CartItem {
    uuid: string; // UUID del ítem en el carrito (clave primaria del ítem en backend)
    product: {
        id: number;
        uuid: string;
        name: string;
        price: number;
        // cualquier otro campo relevante
    };
    quantity: number;
}
