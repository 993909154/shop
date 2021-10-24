import request from "../request/request";
import API from "../request/api"

export default {
    addOrder(param) {
        return request.post(API.order, param)
    },

}