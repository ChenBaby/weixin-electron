<template>
    <div class="wechat-page" @click="closePopupPanel">
        <div class="main-box">
            <div class="navbar">
                <div class="navbar-top">
                    <ul class="navbar-list">
                        <li>
                            <a href="javascript:void(0)" @click.stop="infoPopuped = true;settingPopuped = false;">
                                <img :src="currentUser.image" alt="user-img">
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="popper-link" @click="index = 0" title="聊天">
                                <i class="icon" :class="[index === 0 ? 'wechat-green icon-chat' : 'icon-chat-o']"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="popper-link" @click="index = 1" title="通讯录">
                                <i class="icon" :class="[index === 1 ? 'wechat-green icon-user-list' : 'icon-user-list-o']"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="popper-link" @click="index = 2" title="收藏">
                                <i class="icon" :class="[index === 2 ? 'wechat-green icon-collect' : 'icon-collect-o']"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="navbar-bottom">
                    <a href="javascript:void(0)" class="popper-link setting-link" @click.stop="settingPopuped = true;infoPopuped = false;" title="更多">
                        <i class="icon icon-setting"></i>
                    </a>
                </div>
                <div class="info-popup" v-show="infoPopuped" ref="userInfo">
                    <div class="popup-head">
                        <div class="name-box text-left">
                            <span>{{currentUser.name}}
                                <i class="icon" :class="[currentUser.sex === 'female' ? 'icon-girl' :'icon-boy']"></i>
                            </span>
                            <span class="email-label"><label>邮箱:</label>{{currentUser.email}}</span>
                        </div>
                        <div class="img-box">
                            <img :src="currentUser.image" alt="user-img">
                        </div>
                    </div>
                    <p class="text-left address-panel">
                        <span>
                            <label class="address-label">地区</label>
                            <label class="address-value">{{currentUser.address}}</label>
                        </span>
                    </p>
                    <p class="popup-bottom clearfix">
                        <span class="float-left">
                            <router-link :to="{path: '/info'}">编辑信息</router-link>
                        </span>
                        <span class="float-right">
                            <a href="javascript:void(0)"><i class="icon icon-share"></i></a>
                            <a href="javascript:void(0)"><i class="icon icon-chat-o"></i></a>
                        </span>
                    </p>
                </div>
                <div class="setting-popup" v-show="settingPopuped" ref="setting">
                    <ul>
                        <li><a href="javascript:void(0)">关于</a></li>
                        <li><a href="javascript:void(0)" @click="logout">退出登录</a></li>
                    </ul>
                </div>
            </div>
            <div class="contact-box">
                <div class="contact-header">
                    <span class="contact-search" :class="{'input-focus': searchfocused}">
                        <label class="icon-label"><i class="icon icon-search"></i></label>
                        <input type="text" placeholder="搜索" @focus="searchfocused = true;textareafocused=false" @blur="searchfocused = false;textareafocused=true">
                        <label class="close-label" :class="{show: searchfocused}" @click="searchfocused = false"><i class="icon icon-close"></i></label>
                    </span>
                    <a href="javascript:void(0)" class="contact-plus">
                        <i class="icon icon-plus"></i>
                    </a>
                </div>
                <div class="search-list list" v-if="searchfocused">
                    <div class="search-header">
                        <label>更多</label>
                    </div>
                    <ul>
                        <li>
                            <div class="li-img li-icon-search">
                                <a href="javascript:void(0)"><i class="icon icon-search-right"></i></a>
                            </div>
                            <div class="li-text">
                                <span class="name"><label>搜聊天记录</label></span>
                                <span class="text">查找本地聊天记录</span>
                            </div>
                        </li>
                        <li>
                            <div class="li-img li-icon-flower">
                                <a href="javascript:void(0)"><i class="icon icon-flower"></i></a>
                            </div>
                            <div class="li-text">
                                <span class="name"><label>搜一搜</label></span>
                                <span class="text">搜索文章资讯</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="contact-container full-height" v-else>
                    <div class="recordlist list scrolling full-height" v-show="index == 0">
                        <ul>
                            <li v-for="(user, i) in rangRecordList" :key="i" :class="{ active: activeIndex === i }" @click="openChatBox(user, i)">
                                <div class="li-img">
                                    <img :src="user.image" alt="chat-list-img" :class="user.isLogin ? '' : 'gray'">
                                    <label class="mark-unread" v-show="user.unreads">{{user.unreads}}</label>
                                </div>
                                <div class="li-text">
                                    <span class="name"><label>{{user.name}}</label>
                                    <label class="time">{{user.lastRecordTime | formatDate}}</label></span>
                                    <span class="text">{{user.lastrecord}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="contactlist list scrolling full-height" v-show="index == 1">
                        <ul>
                            <li v-for="(people, index) in contactlists" :key="index" @dblclick="pushToRecord(people)">
                                <div class="li-img">
                                    <img :src="people.image" alt="chat-list-img" :class="people.isLogin ? '' : 'gray'">
                                </div>
                                <div class="li-name">
                                    <span class="name"><label>{{people.name}}</label></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="collectlist" v-show="index == 2">
                        <span>收藏列表</span>
                    </div>
                </div>
            </div>
            <div class="chat-box">
                <div class="chat-header">
                    <p class="toolbar">
                        <a href="javascript:void(0)" class="popper-link" title="置顶" @click="placeTop">
                            <i class="icon icon-zhiding" :class="{sticked: sticked}"></i>
                        </a>
                        <a href="javascript:void(0)" class="popper-link" title="最小化" @click="minimize">
                            <i class="icon icon-minimize"></i>
                        </a>
                        <a href="javascript:void(0)" class="popper-link max-link" title="最大化" @click="maximize">
                            <i class="icon" :class="maximized ? 'icon-unmaximize' : 'icon-maximize'"></i>
                        </a>
                        <a href="javascript:void(0)" class="popper-link close-link" title="关闭" @click="close">
                            <i class="icon icon-close"></i>
                        </a>
                    </p>
                    <p class="namebar">
                        <label class="name">{{chattingUser.name}}</label>
                        <a href="javascript:void(0)" class="more-link"><i class="icon icon-more"></i></a>
                    </p>
                </div>
                <div class="chat-body">
                    <div class="chat-content scrolling" ref="chatcontentbox">
                        <div class="content-box">
                            <div v-for="(content, index) in chattingUser.contents" :key="index">
                                <p class="text-left" v-if="content.user_id != currentUser._id">
                                    <span><img :src="chattingUser.image" alt="user-img" class="user-img"></span>
                                    <span class="content content-left" v-html="content.message"></span>
                                </p>
                                <p class="text-right" v-else>
                                    <span class="content content-right" v-html="content.message"></span>
                                    <span><img :src="currentUser.image" alt="user-img" class="user-img"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="chat-send">
                        <div class="toolbar">
                            <p class="toolbar-left">
                                <a href="javascript:void(0)" class="popper-link" title="表情">
                                    <i class="icon icon-xiaolian"></i>
                                </a>
                                <a href="javascript:void(0)" class="popper-link" title="发送文件">
                                    <i class="icon icon-wenjianjia"></i>
                                </a>
                                <a href="javascript:void(0)" class="popper-link" title="截图">
                                    <i class="icon icon-jianqie"></i>
                                </a>
                                <a href="javascript:void(0)" class="popper-link liaotianjilu" title="聊天记录">
                                    <i class="icon icon-liaotianjilu"></i>
                                </a>
                            </p>
                            <p class="toolbar-right">
                                <a href="javascript:void(0)" class="popper-link" title="语音聊天">
                                    <i class="icon icon-dianhua"></i>
                                </a>
                                <a href="javascript:void(0)" class="popper-link" title="视频聊天">
                                    <i class="icon icon-shipin"></i>
                                </a>
                            </p>
                        </div>
                        <textarea name="chatcontent" id="chatcontent" rows="5" :disabled="!chattingUser || !chattingUser.isLogin"
                        v-model="chatcontent" ref="chatcontent" v-focus="textareafocused"
                         @keydown="keyDown"></textarea>
                        <p class="commit-panel text-right">
                            <a href="javascript:void(0)" class="send-btn" @click="send">发送(S)</a>
                            <label class="errmsg" v-show="errmsgShow">不能发送空白信息</label>
                            <label class="errmsg" v-show="!chattingUser">请选择好友发起聊天</label>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {sendSocket} from '@/common/socket.js'
import log from '@/common/fs.js'
const {"ipcRenderer": ipc} = require('electron')
export default {
    created () {
        log.readdir('log/' + this.currentUser._id, (files) => {
            files.forEach(file => {
                log.read('log/' + this.currentUser._id + '/' + file, (data) => {
                    this.recordlists.push(data)
                })
            })
        })
    },
    mounted () {
        this.getContactlist()
        this.scrollToBottom()
        this.$EventBus.$on('onmessage', (data) => {
            if (data.type === 'login') {
                this.setIsLogin(data, true)
            }
            if (data.type === 'message') {
                let record = this.recordlists.filter(item => item._id === data.user_id)[0]
                let recordIndex = record ? this.recordlists.indexOf(record) : 0
                let messageData = {
                    message: data.message,
                    user_id: data.user_id,
                    time: Date.now()
                }
                if (!record) {
                    record = this.contactlists.filter(item => item._id === data.user_id)[0]
                    record.contents = []
                    this.recordlists.unshift(record)
                }
                record.lastrecord = data.message
                record.lastRecordTime = messageData.time
                record.contents.push(messageData)
                if (this.chattingUser && data.user_id !== this.chattingUser._id) { // 不是正在聊天的窗口，不默认打开聊天框
                    record.unreads = record.unreads + 1 || 1
                } else {
                    this.activeIndex = recordIndex
                    this.chattingUser = record
                }
                this.index = 0
                this.scrollToBottom()
            }
        })
        this.$EventBus.$on('sockonlogout', (data) => {
            this.setIsLogin(data, false)
        })
    },
    beforeDestroy () {
        this.$EventBus.$off('onmessage')
        this.$EventBus.$off('sockonlogout')
        this.write()
    },
    data () {
        return {
            index: 0,
            searchfocused: false,
            textareafocused: true,
            chatcontent: '',
            errmsgShow: false,
            infoPopuped: false,
            settingPopuped: false,
            recordlists: [],
            contactlists: [],
            chattingUser: '',
            activeIndex: null,
            maximized: false,
            sticked: false
        }
    },
    filters: {
        formatDate (value, format = 'YYYY-MM-DD') { // 用法 DOM元素过滤 | formatDate('YYYY-MM-DD hh:mm')
            let getDate = new Date(value)
            let obj = {
                'Y+': getDate.getFullYear(),
                'M+': getDate.getMonth() + 1,
                'D+': getDate.getDate() < 10 ? `0${getDate.getDate()}` : getDate.getDate(),
                'h+': getDate.getHours() < 10 ? `0${getDate.getHours()}` : getDate.getHours(),
                'm+': getDate.getMinutes() < 10 ? `0${getDate.getMinutes()}` : getDate.getMinutes()
            }
            for (let k in obj) {
                let reg = new RegExp('(' + k + ')')
                let matches = format.match(reg)
                if (matches) {
                    format = format.replace(matches[1], obj[k])
                }
            }
            return format
        }
    },
    methods: {
        closePopupPanel (event) {
            var infoBox = this.$refs.userInfo
            var settingBox = this.$refs.setting
            if (infoBox) {
                if (!infoBox.contains(event.target)) {
                    this.infoPopuped = false
                }
            }
            // mustFixed 关闭打开基本信息弹窗 这样写得不好，我暂时也没想到好方法，不过要换种写法
            // 基本信息弹窗样式效果不好，仔细看微信的样式怎么实现
            if (settingBox) {
                if (!settingBox.contains(event.target)) {
                    this.settingPopuped = false
                }
            }
        },
        keyDown () { // 处理发送框textarea的事件
            if (event.keyCode === 13 && event.shiftKey) {
                this.chatcontent += '\n'
            } else if (event.keyCode === 13) {
                event.preventDefault()
                this.send()
            } else if (event.keyCode === 83 && event.altKey) {
                this.send()
            }
        },
        send () {
            if (!this.chattingUser.isLogin) {
                this.$warning('该用户是离线状态，不能发送消息')
            } else {
                if (this.chatcontent) {
                    var content = this.chatcontent.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
                    var data = {
                        user_id: this.chattingUser._id,
                        message: content,
                        type: 'send'
                    }
                    sendSocket(data)
                    let messageData = {
                        message: content,
                        user_id: this.currentUser._id,
                        time: Date.now()
                    }
                    this.chattingUser.contents.push(messageData)
                    this.chattingUser.lastrecord = this.chatcontent.replace(/(\n || \s+$)/g, '')
                    this.chattingUser.lastRecordTime = messageData.time
                    this.chatcontent = ''
                    this.scrollToBottom()
                } else {
                // 不能发送空消息
                    this.errmsgShow = true
                    setTimeout(() => {
                        this.errmsgShow = false
                    }, 2000)
                }
            }
        },
        scrollToBottom () {
            this.$nextTick(() => {
                var container = this.$refs.chatcontentbox
                container.scrollTop = container.scrollHeight
            })
        },
        logout () {
            this.$store.dispatch('signOut').then(res => {
                if (res.success) {
                    this.$router.push({
                        path: '/'
                    })
                }
            })
        },
        getContactlist () { // 获取联系人列表
            this.$store.dispatch('getUsers').then(res => {
                this.contactlists = res.data
                this.checkIsLogin()
            })
        },
        openChatBox (user, index) { // isopen 是否切换至正在聊天
            this.activeIndex = index
            this.chattingUser = user
            user.unreads = 0
            this.scrollToBottom()
        },
        pushToRecord (user) { // 聊天记录栏新增一条未读消息记录
            if (user._id === this.currentUser._id) {
                return
            }
            let record = this.recordlists.filter(item => item._id === user._id)[0]
            if (record) {
                record.lastRecordTime = Date.now()
            } else {
                record = {
                    ...user,
                    lastRecordTime: Date.now(),
                    contents: []
                }
                this.recordlists.push(record)
            }
            this.index = 0
            this.openChatBox(record, 0)
        },
        placeTop () {
            ipc.send('top')
            this.sticked = !this.sticked
        },
        maximize () {
            ipc.send('max')
            this.maximized = !this.maximized
        },
        minimize () {
            ipc.send('min')
        },
        close () {
            this.write()
            ipc.send('close')
        },
        setIsLogin (data, is) {
            this.recordlists.forEach(item => {
                if (item._id === data.user_id) {
                    item.isLogin = is
                }
            })
            this.contactlists.forEach(item => {
                if (item._id === data.user_id) {
                    item.isLogin = is
                }
            })
        },
        checkIsLogin () {
            this.recordlists.forEach(recorditem => {
                for (let i = 0;i < this.contactlists.length; i++) {
                    if (recorditem._id === this.contactlists[i]._id) {
                        recorditem.isLogin = this.contactlists[i].isLogin
                        break
                    }
                }
            })
        },
        write () {
            this.recordlists.forEach(item => {
                var path = 'log/' + this.currentUser._id + '/' + item._id + '.log'
                log.write(path, {
                    ...item
                })
            })
        }
    },
    directives: {
        focus: {
            inserted: function (el, {value}) {
                if (value) {
                    el.focus()
                }
            },
            componentUpdated: function (el, {value}) {
                if (value) {
                    el.focus()
                }
            }
        }
    },
    watch: {
        currentUser () {},
        chattingUser: {
            handler (newValue, oldValue) {},
            deep: true
        },
        recordlists: {
            handler (newValue, oldValue) {},
            deep: true
        },
        rangRecordList () {}
    },
    computed: {
        currentUser () {
            return {
                ...this.$store.state.user,
                address: this.$store.state.user.address || '中国'
            }
        },
        rangRecordList () {
            let lists = this.recordlists.sort((a, b) => b.lastRecordTime - a.lastRecordTime)
            lists.forEach((item, index) => {
                if (item._id === this.chattingUser._id) {
                    this.activeIndex = index
                }
            })
            return lists
        }
    }
}
</script>
<style lang="less" scoped>
    .wechat-green {
        color: #09BB07 !important;
    }
    .main-box {
        width: 100%;
        height: 100%;
        display: flex;
        align-content: center;
        position: relative;
    }
    .navbar {
        background-color:#28282b;
        color: #fff;
        width: 60px;
        height: 100%;
        position: relative;
        text-align: center;
        a {
            display: inline-block;
        }
        li {
            margin-top: 24px;
        }
        .navbar-top img {
            width: 50%;
        }
        .icon {
            font-size: 26px;
            color: #666;
        }
        .navbar-top .icon-chat-o {
            font-weight: 600;
        }
        .navbar-bottom {
            position: absolute;
            left: 50%;
            bottom: 0;
            padding-bottom: 24px;
            transform: translate(-50%);
        }
        .info-popup {
            width: 300px;
            height: 228px;
            position: absolute;
            top: 40px;
            left: 30px;
            background-color: #fff;
            color: initial;
            padding: 24px;
            box-sizing: border-box;
            z-index: 100;
            border-radius: 3px;
            box-shadow: 1px 1px 6px #aaa;
            .popup-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 60px;
                padding-bottom: 20px;
                border-bottom: solid 1px #eee;
            }
            .name-box {
                span {
                    height: 30px;
                    line-height: 30px;
                    display: block;
                }
                label {
                    margin-right: 5px;
                }
                .email-label {
                    font-size: 12px;
                }
            }
            .img-box {
                height: 60px;
                img {
                    width: 60px;
                }
            }
            .icon-girl {
                color: pink;
                font-size: 14px;
                margin-left: 5px;
            }
            .icon-boy {
                color: skyblue;
                font-size: 14px;
                margin-left: 5px;
            }
            .address-panel {
                margin: 25px 0;
            }
            .address-label {
                color: #999;
                margin-right: 20px;
            }
            .popup-bottom {
                line-height: 28.8px;
                .icon {
                    margin: 0 10px;
                }
                .float-left {
                    float: left;
                    font-size: 12px;
                    color: #e84949;
                }
                .float-right {
                    float: right;
                }
            }
        }
        .setting-link {
            &:after {
                content: '';
                width: 8px;
                height: 8px;
                background-color: red;
                position: absolute;
                top: 3px;
                left: 23px;
                border-radius: 50%;
            }

        }
        .setting-popup {
            width: 100px;
            position: absolute;
            left: 60px;
            bottom: 30px;
            background-color: rgba(0,0,0,0.75);
            color: #aaa;
            li {
                margin-top: 0;
                height: 40px;
                line-height: 40px;
            }
        }
    }
    .contact-box {
        width: 280px;
        height: 100%;
        background-color: #EDEAE8;
        .contact-header {
            padding: 0px 20px;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .contact-search {
            width: 82%;
            background-color: #DBD9D8;
            display: inline-block;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: space-around;
            padding: 4px;
            border: solid 1px #DBD9D8;
            &.input-focus {
                background-color: #fff;
            }
            .icon-search {
                font-size: 14px;
            }
            input {
                width: 80%;
                background: none;
                border: none;
                margin-left: 10px;
                &::-webkit-input-placeholder{
                    position: relative;
                    top: 2px;
                }
                &:-moz-placeholder{
                    position: relative;
                    top: 2px;
                }
                &::-moz-placeholder{
                    position: relative;
                    top: 2px;
                }
                &:-ms-input-placeholder{
                    position: relative;
                    top: 2px;
                }
                &:focus {
                    background-color: #fff;
                    border: none;
                }
            }
            .icon-label {
                width: 5%;
                height: 20px;
                line-height: 20px;
            }
            .close-label {
                width: 18px;
                height: 18px;
                line-height: 18px;
                background-color: #ddd;
                border-radius: 50%;
                opacity: 0;
                .icon-close {
                    font-size: 18px;
                }
                &.show {
                    opacity: 1;
                }
            }
        }
        .contact-plus {
            padding: 4px;
            background-color: #DBD9D8;
            border-radius: 4px;
            .icon-plus {
                font-size: 16px;
            }
        }
        .recordlist .li-img {
            position: relative;
            .mark-unread {
                position: absolute;
                right: -6px;
                top: -6px;
                display: block;
                width: 16px;
                height: 16px;
                background-color: #ff3b30;
                border-radius: 50%;
                font-size: 13px;
                text-align: center;
                line-height: 16px;
                color: #fff;
            }
        }
        .recordlist li:nth-child(1) {
            // background-color: #BCBDBD;
        }
        .recordlist .li-img, .contactlist .li-img {
            .gray {
                -webkit-filter: grayscale(100%);
                -moz-filter: grayscale(100%);
                -ms-filter: grayscale(100%);
                -o-filter: grayscale(100%);
                filter: grayscale(100%);
                filter: gray;
            }
        }
        .list {
            li {
                display: flex;
                align-content: center;
                height: 60px;
                padding: 10px 20px;
                box-sizing: border-box;
                user-select: none;
                cursor: pointer;
                &:hover {
                    background-color: #D7D5D4;
                }
                &.active {
                    background-color: #BCBDBD;
                }
            }
            .li-img {
                img {
                    width: 40px;
                    height: 40px;
                    vertical-align: middle;
                }
                a {
                    display: inline-flex;
                    width: 40px;
                    height: 40px;
                    justify-content: center;
                    align-items: center;
                    background-color: #1aad19;
                }
                &.li-icon-flower {
                    a {
                        background-color: #fff;
                    }
                    .icon {
                        color: pink;
                    }
                }
            }
            .li-text {
                padding-left: 10px;
                width: calc(100% - 50px);
                span {
                    display: block;
                    height: 20px;
                    line-height: 20px;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .text {
                    font-size: 12px;
                    color: #777;
                }
                .time {
                    float: right;
                    font-size: 12px;
                    color: #999;
                }
            }
            .li-name {
                line-height: 40px;
                padding-left: 10px;
            }
        }
        .search-header {
            height: 30px;
            line-height: 30px;
            color: #666;
            background-color: #dedede;
            padding-left: 20px;
            font-size: 12px;
        }
    }
    .chat-box {
        width: calc(100% - 340px);
        height: 100%;
        background: #F5F5F5;
        position: relative;
        .chat-header {
            height: 60px;
            display: flex;
            flex-direction: column;
            border-bottom: solid 1px #ccc;
            a {
                display: inline-block;
                overflow: hidden;
            }
            .popper-link {
                width: 33px;
                height: 26px;
                line-height: 26px;
                &:hover {
                    background-color: #e7e7e7;
                }
            }
        }
        .toolbar {
            text-align: right;
            box-sizing: border-box;
            height: 26px;
            .icon {
                margin: 0 6px;
            }
            .icon-zhiding.sticked {
                background-color: #eee;
            }
            .icon-maximize {
                font-size: 16px;
                position: relative;
                top: 1px;
                left: -2px;
            }
            .icon-unmaximize {
                font-size: 18px;
                position: relative;
                top: 1px;
                left: -2px;
            }
            .close-link:hover {
                background-color: #c9302c;
                .icon {
                    color: #fff;
                }
            }
        }
        .namebar {
            height: 34px;
            line-height: 34px;
            padding: 0 15px 0 30px;
            .name {
                font-size: 22px;
                float: left;
            }
            .more-link {
                float: right;
            }
        }
        .chat-body {
            height: calc(100% - 61px);
            position: relative;
        }
        .chat-content {
            padding: 5px 30px 20px;
            height: 73.4%;
            box-sizing: border-box;

            &:hover {
                &::-webkit-scrollbar-thumb {
                    background-color: #ccc;
                }
            }
            &::-webkit-scrollbar-thumb {
                background-color: transparent;
            }

            p {
                min-height: 60px;
                margin-top: 20px;
            }
            .user-img {
                width: 40px;
                vertical-align: top;
            }
            .content {
                margin: 0 15px;
                background-color: #fff;
                padding: 12px;
                font-size: 14px;
                vertical-align: middle;
                position: relative;
                display: inline-block;
                max-width: 280px;
                border-radius: 3px;
            }
            .content-left:before {
                position: absolute;
                top: 11px;
                left: -18px;
                content: '';
                display: block;
                width: 0;
                height: 0;
                border: 0 solid transparent;
                border-right-color: #fff;
                border-width: 9px;
            }
            .content-right{
                background-color: #8CEA6A;
                &:after {
                position: absolute;
                top: 11px;
                right: -18px;
                content: '';
                display: block;
                width: 0;
                height: 0;
                border: 0 solid transparent;
                border-left-color: #8CEA6A;
                border-width: 9px;
            }
            }
        }
        .chat-send {
            width: 100%;
            position: absolute;
            bottom: 0;
            padding: 10px 30px;
            background-color: #fff;
            width: 100%;
            height: 26.6%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            .toolbar {
                height: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            .icon {
                color: #666;
                &:hover {
                    color: #000;
                }
            }
            textarea {
                width: 100%;
                box-sizing: border-box;
                border: none;
                resize: none;
                font-size: 16px;
                &:disabled {
                    background: none;
                }
            }
            .send-btn {
                display: inline-block;
                width: 60px;
                height: 20px;
                padding: 5px;
                background-color: #eee;
                text-align: center;
                line-height: 20px;
                border: solid 1px #ddd;
            }
            .icon-xiaolian {
                margin-left: 0px;
            }
            .liaotianjilu {
                vertical-align: top;
                display: inline-block;
            }
            .icon-liaotianjilu {
                font-size: 17px;
            }
            .commit-panel {
                position: relative;
                .errmsg {
                    font-size: 12px;
                    color: #000;
                    padding: 10px;
                    position: absolute;
                    right: -10px;
                    bottom: 44px;
                    background-color: #fff;
                    border: solid 1px #ddd;
                    box-shadow: 0px 2px 6px rgba(0,0,0,0.12), 0px 0px 1px rgba(0,0,0,0.24);
                    border-radius: 3px;
                    &::before {
                        content: '';
                        display: block;
                        width: 0;
                        height: 0;
                        border: 0 solid transparent;
                        border-top-color: #fff;
                        border-width: 10px;
                        position: absolute;
                        right: 7px;
                        bottom: -18px;
                        z-index: 2;
                    }
                    &::after {
                        content: '';
                        display: block;
                        width: 0;
                        height: 0;
                        border: 0 solid transparent;
                        border-top-color: #ddd;
                        border-width: 10px;
                        position: absolute;
                        right: 7px;
                        bottom: -20px;
                    }
                }
            }
        }
    }
    @media (max-width: 992px) {
        .chat-box .chat-content .content {
            max-width: 200px;
        }
    }
    @media (max-width: 768px) {
        .contact-box .contact-header {
            padding: 0 10px;
        }
        .contact-box .list li {
            padding: 10px;
        }
    }
</style>
