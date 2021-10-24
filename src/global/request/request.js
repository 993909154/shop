import router from "../../router";
import {Message} from "element-ui";

const axios = require('axios');

const request = axios.create({
    baseURL: 'http://110.42.132.10:8011/',
    timeout: 1000,
});

request.interceptors.request.use(
    config => {
        const newConfig = {...config}
        const TOKEN = localStorage.getItem('token');
        if (TOKEN) {
            newConfig.headers.Authorization = `Bearer ${TOKEN}`;
        }
        return newConfig;
    },
    error => Promise.reject(error)
)

request.interceptors.response.use(
    res => {
        return res.data
    },
    error => {
        const {response} = error;
        const status = response.status;
        if (status === 401){
            localStorage.clear();
            router.replace(
                {path: `/Login`}
            );
        } else {
            Message.error(error.response.data.message)
            return Promise.reject(error)
        }
    }
)


export default {
    post(url = '', data = {}, config = {}) {
        return request.post(url, data, config)
    },
    // get(url = '', data = {}, config = {}) {
    //     return request.get(url, data, config)
    // },
    get(url = '', params = {}, config = {}){
        const OPTIONS = Object.assign({params}, config)
        return request.get(url, OPTIONS)
    },
    delete(url = '', params = {}, config = {}) {
        const OPTIONS = Object.assign({params}, config)
        return request.delete(url, OPTIONS)
    },
    put(url = '', data = {}, config = {}) {
        return request.put(url, data, config)
    },
}
