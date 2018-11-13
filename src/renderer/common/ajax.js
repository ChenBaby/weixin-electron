import axios from 'axios'
import thisvue from '../main.js'
var options = {
    'baseURL': 'https://richole.cn',
    'withCredentials': true
}
var _ajax = axios.create(options)

var ajax = {
    get (url, data, noAlert = false) {
        let config = {
            "params": {
                ...data,
                "ck": encodeURIComponent(localStorage.getItem('ck') || '')
            }
        }
        return _ajax.get(url, config)
            .then(res => {
                if (res.data.success) {
                    return res.data
                } else {
                    return Promise.reject(res)
                }
            })
            .catch(err => {
                console.log(err)
                if (err.data.errorId === 999) {
                    !noAlert && alert(err.data.message)
                    thisvue.$router.push('/')
                } else {
                    !noAlert && alert(err.data.message)
                }
                return Promise.reject(err)
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
                    return Promise.reject(res)
                }
            })
            .catch(err => {
                console.log(err)
                if (err.data.errorId === 999) {
                    alert(err.data.message)
                    thisvue.$router.push('/')
                } else {
                    alert(err.data.message)
                }
                return Promise.reject(err)
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
                    return Promise.reject(res)
                }
            })
            .catch(err => {
                console.log(err)
                if (err.data.errorId === 999) {
                    alert(err.data.message)
                    thisvue.$router.push('/')
                } else {
                    alert(err.data.message)
                }
                return Promise.reject(err)
            })
    }
}

export default ajax
