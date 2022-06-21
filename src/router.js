import { createRouter, createWebHistory } from "vue-router"
const routes = [
  {
    path: '/',
    component: () => import('./components/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router