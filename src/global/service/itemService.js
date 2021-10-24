import request from "../request/request";
import API from '../request/api'

export default {
    getList(param){
        return request.get(API.items, param)
    },
    get(id){
        return request.get(API.item(id))
    },
    create(param){
        return request.post(API.items, param)
    },
    delete(id){
        return request.delete(API.item(id))
    }
}