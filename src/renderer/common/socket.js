import Bus from './bus.js'
import Message from '@/common/message'

var websock = null
var globalCallback = null
var interval = null
var $message = Message.install
function initWebSocket () {
    websock = new WebSocket('ws://richole.cn:9091')
    websock.onopen = (evt) => {
        websocketOpen()
    }
    websock.onmessage = (evt) => {
        websocketonmessage(evt)
    }
    websock.onclose = (evt) => {
        websocketclose(evt)
    }
    websock.onerror = (evt) => {
        $message({
            "message": 'WebSocket连接发生错误',
            "type": 'error'
        })
    }
}

// 数据接收
function websocketonmessage (e) {
    let data = JSON.parse(e.data)
    let type = data.type || (data.data && data.data.type)
    if (!data.success) {
        console.log(data)
        if (data.errorId === 20001) { // 验证身份失效，需要重新登录
            $message({
                "message": data.message,
                "type": 'error'
            })
        }
    }
    if (data.type === 'logout') {
        Bus.$emit('sockonlogout', data)
    }
    if (type === 'login' || type === 'send_message' || type === 'send_message') { // 有执行发送socket的才执行它带过来的回调
        globalCallback(data)
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
    interval = setInterval(sendSocket({
        "type": "ping"
    }, (res) => {
        if (res.type === 'pong') {
            console.log(res.message)
        }
    }), 30000)
}

export function sendSocket (data, callback) {
    // 测试回调的一些作用域问题（这里{a:1, b:2}是假设为websocket响应的聊天数据）
    globalCallback = callback
    if (websock.readyState === websock.OPEN) {
        // 若是ws开启状态
        websocketsend(data)
    } else if (websock.readyState === websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
            websocketsend(data, callback)
        }, 1000)
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            websocketsend(data, callback)
        }, 1000)
    }
}

initWebSocket()
