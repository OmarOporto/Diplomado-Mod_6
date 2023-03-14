import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/newView.vue')
  },
  {
    path: '/client',
    name: 'cliente',
    component: () => import('../views/ClienteView.vue')
  },
  {
    path: '/product',
    name: 'producto',
    component: () => import('../views/ProductosView.vue')
  },
  {
    path: '/login',
    name: 'cart',
    component: () => import('../views/CartLoginView.vue')
  },
  {
    path: '/cart',
    name: 'cartview',
    component: () => import('../views/CarritoView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
