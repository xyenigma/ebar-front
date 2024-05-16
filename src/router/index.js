import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderDetails from '../views/OrderDetails.vue'
import LoginView from '../views/LoginView.vue'
import { jwtDecode } from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/orders/:id',
      name: 'order',
      component: OrderDetails
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('token')
  const { exp } = jwtDecode(token)

  const loggedIn = Date.now() < exp * 1000

  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
