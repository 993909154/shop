import request from '../request/request'
import API from '../request/api'

export default {
    login(form) {
        return request.post(API.login, form)
    }
}