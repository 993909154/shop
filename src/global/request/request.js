
const axios = require('axios');

const request = axios.create({
    baseURL: 'http://110.42.132.10:8011/',
    timeout: 1000,
});


export default {
    post(url = '', data = {}, config = {}) {
        return request.post(url, data, config)
    }
}
