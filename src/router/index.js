import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import ItemList from "../views/ItemList";
import AsideNavigation from "../views/AsideNavigation";
import ItemCreate from "../views/ItemCreate";
import ItemUpdate from "../views/ItemUpdate";
import OrderList from "../views/OrderList";
import OrderDetailed from "../views/OrderDetailed";
import OrderStatistic from "../views/OrderStatistic";

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
                        redirect: {name: 'ItemListSelf'},
                        meta: {
                            title: '商品列表',
                            showInBreadcrumb: true,
                            activeMenu: '/aside',
                            apiActiveMenu: '/item/list'
                        },
                        children: [
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
                                    apiActiveMenu: '/item/list'
                                }
                            },
                            {
                                path: '/item/update',
                                name: 'ItemUpdate',
                                component: ItemUpdate,
                                meta: {
                                    title: '商品编辑',
                                    showInBreadcrumb: true,
                                    activeMenu: '/aside',
                                    apiActiveMenu: '/item/list'
                                }
                            }

                        ]
                    },
                    {
                        path: '/order/list',
                        name: 'OrderList',
                        component: {
                            render: h => h('router-view')
                        },
                        redirect: {
                            name: 'OrderList'
                        },
                        meta: {
                            title: '订单列表',
                            showInBreadcrumb: true,
                            activeMenu: '/aside',
                            apiActiveMenu: '/order/list'
                        },
                        children: [
                            {
                                path: '/order/list',
                                name: 'OrderListSelf',
                                component: OrderList,
                                meta: {
                                    title: '订单列表',
                                    showInBreadcrumb: false,
                                    activeMenu: '/aside',
                                    apiActiveMenu: '/order/list'
                                },
                            },
                            {
                                path: '/order/detailed',
                                name: 'OrderDetailed',
                                component: OrderDetailed,
                                meta: {
                                    title: '订单详情',
                                    showInBreadcrumb: true,
                                    activeMenu: '/aside',
                                    apiActiveMenu: '/order/list'
                                },
                            }
                        ]
                    }
                ]
            },
            {
                path: '/order/statistic',
                name: 'OrderStatistic',
                component: OrderStatistic,
                meta: {
                    activeMenu: '/order/statistic',
                },
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
