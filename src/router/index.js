import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import ItemList from "../views/ItemList";
import AsideNavigation from "../views/AsideNavigation";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {name: 'Order'},
    children: [
      {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
      },
      {
        path: '/aside',
        name: 'AsideNavigation',
        component: AsideNavigation
      },
      {
        path: '/item/list',
        name: 'ItemList',
        component: ItemList
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const TOKEN = localStorage.getItem('token');
  if (!TOKEN && to.path !== '/login') {
    next({name: 'Login', replace: true})
    return
  }
  next()
})
export default router
