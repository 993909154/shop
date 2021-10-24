import request from "../request/request";
import API from "../request/api"

export default {
    addOrder() {
        return request.post(API.orders)
    },
    getList(param) {
        return request.get(API.orders, param)
    },
    getOrderDetailed(id){
        return request.get(API.order(id))
    },
    getOrderStatistic() {
        return request.get(API.statistic)
    }
}