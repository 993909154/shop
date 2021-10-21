import request from '../request/request'

export default {
    login(form) {
        return request.post('/authenticate', form)
    }
}