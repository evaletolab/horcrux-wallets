import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/recover',
    name: 'Recover',
    component: () => import(/* webpackChunkName: "recover" */ '../views/Recover.vue')
  },
  {
    path: '/wallets',
    name: 'Wallets',
    component: () => import(/* webpackChunkName: "wallets" */ '../views/Wallets.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
