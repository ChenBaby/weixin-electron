import axios from 'axios'
var options = {
    'baseURL': 'https://richole.cn',
    'withCredentials': true
}
var _ajax = axios.create(options)

var ajax = {
    get (url, data) {
        let config = {
            "params": {
                ...data,
                "ck": encodeURIComponent(localStorage.getItem('ck') || '')
            }
        }
        return _ajax.get(url, config)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err
            })
    },
    post (url, data) {
        let config = {
            ...data,
            "ck": encodeURIComponent(localStorage.getItem('ck') || '')
        }
        return _ajax.post(url, config)
            .then(res => {
                if (res.data.success) {
                    return res.data
                } else {
                    return Promise.reject(new Error(res.data.message))
                }
            })
            .catch(err => {
                return Promise.reject(new Error(err.message))
            })
    }
}

export default ajax
