import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import ItemList from "../views/ItemList";
import AsideNavigation from "../views/AsideNavigation";
import ItemCreate from "../views/ItemCreate";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: {
            name: 'Cart'
        },
        children: [
            {
                path: '/cart',
                name: 'Cart',
                component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
                meta: {
                    activeMenu: '/cart'
                }
            },
            {
                path: '/aside',
                name: 'AsideNavigation',
                component: AsideNavigation,
                redirect: {
                    name: 'ItemList'
                },
                meta: {
                    title: '我的工作台',
                    showInBreadcrumb: true,
                    activeMenu: '/aside'
                },
                children: [
                    {
                        path: '/item/list',
                        name: 'ItemList',
                        component: {
                            render: h => h('router-view')
                        },
                        meta: {
                            title: '商品列表',
                            showInBreadcrumb: true,
                            activeMenu: '/aside',
                            apiActiveMenu: '/item/list'
                        },
                        children:[
                            {
                                path: '/item/list',
                                name: 'ItemListSelf',
                                component: ItemList,
                                meta: {
                                    title: '商品列表',
                                    showInBreadcrumb: false,
                                    activeMenu: '/aside',
                                    apiActiveMenu: '/item/list'
                                }
                            },
                            {
                                path: '/item/create',
                                name: 'ItemCreate',
                                component: ItemCreate,
                                meta: {
                                    title: '商品添加',
                                    showInBreadcrumb: true,
                                    activeMenu: '/aside',
                                    apiActiveMenu: '/item/create'
                                }
                            }
                        ]
                    },


                ]
            },
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
