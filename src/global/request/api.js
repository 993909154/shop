export default {
    login : '/authenticate',
    items : '/items',
    item: (id) => `/items/${id}`,
    cart : '/shopping-cart',
    orders : '/orders',
    order: (id) => `/orders/${id}`,
    statistic: '/orders/statistic'
}