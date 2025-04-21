import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/auth/LoginView.vue";
import ProductsView from "../views/products/ProductsView.vue";
import {useAuth} from "../modules/auth/composables/useAuth.ts";
import {EndpointsEnum} from "../utils/endpoints";

const routes = [
    { path: '/', redirect: '/login' },

    { path: '/login',name:'login', component: LoginView },
    { path: '/products', name: 'products', component: ProductsView,
        meta: {
            requiresAuth: true,
        },
    },
]

 const router = createRouter({
    history: createWebHistory(),
    routes,
})
// Configurar la guardia de navegación
router.beforeEach((to, from, next) => {
    const { token } = useAuth()
    console.log(to.meta.requiresAuth && (token==''  || !token))
    if (to.meta.requiresAuth && (token==''  || !token) ) {
        next({ name: EndpointsEnum.LOGIN})
    } else {
        // Si no, continúa la navegación
        next()
    }
})

export default router
