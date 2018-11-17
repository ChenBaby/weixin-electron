import Bus from './bus.js'
import Message from '@/plugin/message'

var websock = null
var websockPromise = null
var interval = null
function initWebSocket () {
    websockPromise = new Promise((resolve, reject) => {
        websock = new WebSocket('ws://richole.cn:9091')
        websock.onopen = (evt) => {
            resolve(websock)
            websocketOpen()
        }
        websock.onmessage = (evt) => {
            websocketonmessage(evt)
        }
        websock.onclose = (evt) => {
            websocketclose(evt)
        }
        websock.onerror = (evt) => {
            Message.$error('WebSocket连接发生错误')
            reject(new Error('WebSocket连接发生错误'))
        }
    })
}

// 数据接收
function websocketonmessage (e) {
    let data = JSON.parse(e.data)
    if (!data.success) {
        if (data.errorId === 20001) { // 验证身份失效，需要重新登录
            Message.$error(data.message)
        }
    }
    if (data.type === 'logout') {
        Bus.$emit('sockonlogout', data)
    }
    Bus.$emit('onmessage', data)
}

// 数据发送
function websocketsend (data) {
    websock.send(JSON.stringify(data))
}

// 关闭
function websocketclose (e) {
    console.log("connection closed (" + e.code + ")")
    clearInterval(interval)
}

function websocketOpen (e) {
    console.log("连接成功")
    interval = setInterval(() => {
        sendSocket({
            "type": "ping"
        }, () => {})
    }, 30000)
}

export function sendSocket (data, callback) {
    // 测试回调的一些作用域问题（这里{a:1, b:2}是假设为websocket响应的聊天数据）
    websockPromise
        .then(() => {
            websocketsend(data)
        })
        .catch(err => {
            Message.$error(err.message)
        })
}

initWebSocket()
