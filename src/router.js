import { createRouter, createWebHistory } from "vue-router"
const routes = [
  {
    path: '/',
    redirect: "/booklist",
    component: () => import('./components/Index.vue'),
    children: [
      {
        path: "/booklist",
        component: () => import('./components/bookList/BookList.vue')
      },
      {
        path: "/orderlist",
        component: () => import('./components/order/OrderList.vue')
      },
      {
        path: "/orderconfirm",
        component: () => import('./components/order/OrderConfirm.vue')
      },
      {
        path: "/addresslist",
        component: () => import('./components/order/AddressList.vue')
      }

    ]
  },
  {
    path: '/login',
    component: () => import('./components/loginReg/Login.vue')
  },
  {
    path: '/register',
    component: () => import('./components/loginReg/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router