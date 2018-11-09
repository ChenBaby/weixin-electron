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
        let datas = {
            ...data
        }
        let _url = url + '?ck=' + encodeURIComponent(localStorage.getItem('ck') || '')
        return _ajax.post(_url, datas)
            .then(res => {
                if (res.data.success) {
                    return res.data
                } else {
                    return Promise.reject(new Error(res.data.message))
                }
            })
            .catch(err => {
                alert(err.message)
                return Promise.reject(new Error(err.message))
            })
    },
    postform (url, data) {
        let config = {
            "headers": {'Content-Type': 'multipart/form-data'}
        }
        let _url = url + '?ck=' + encodeURIComponent(localStorage.getItem('ck') || '')
        return _ajax.post(_url, data, config)
            .then(res => {
                if (res.data.success) {
                    return res.data
                } else {
                    return Promise.reject(new Error(res.data.message))
                }
            })
            .catch(err => {
                alert(err.message)
                return Promise.reject(new Error(err.message))
            })
    }
}

export default ajax
