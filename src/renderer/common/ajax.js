import axios from 'axios'
var options = {
    'baseURL': 'http://35.200.61.173:7001',
    'withCredentials': true
}
var _ajax = axios.create(options)

var ajax = {
    get (url, data) {
        let config = {
            "params": {
                ...data
            }
        }
        _ajax.get(url, config)
    },
    post (url, data) {
        let config = {
            ...data
        }
        _ajax.send(url, config)
    }
}

export default ajax
