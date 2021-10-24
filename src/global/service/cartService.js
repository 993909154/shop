import request from "../request/request";
import API from '../request/api'

export default {
    add(param) {
        return request.post(API.cart, param)
    },
    getCart(param) {
        return request.get(API.cart, param)
    },
    clearCart() {
        return request.delete(API.cart)
    }
}