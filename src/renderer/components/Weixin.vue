<template>
    <div class="wechat-page" @click="closeInfoPanel">
        <div class="main-box">
            <div class="navbar">
                <div class="navbar-top">
                    <ul>
                        <li>
                            <a href="javascript:void(0)" @click.stop="infoPopuped = true">
                                <img :src="currentUser.image" alt="user-img">
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="popper-link" v-show="!chatclicked" @click="active('chat')">
                                <i class="icon icon-chat-o"></i>
                                <label class="popper">聊天</label>
                            </a>
                            <a href="javascript:void(0)" class="popper-link" v-show="chatclicked">
                                <i class="icon icon-chat"></i>
                                <label class="popper">聊天</label>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="popper-link" v-show="!listclicked" @click="active('list')">
                                <i class="icon icon-user-list-o"></i>
                                <label class="popper">通讯录</label>
                            </a>
                            <a href="javascript:void(0)" class="popper-link" v-show="listclicked">
                                <i class="icon icon-user-list"></i>
                                <label class="popper">通讯录</label>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" class="popper-link" v-show="!collectclicked" @click="active('collect')">
                                <i class="icon icon-collect-o"></i>
                                <label class="popper">收藏</label>
                            </a>
                            <a href="javascript:void(0)" class="popper-link" v-show="collectclicked">
                                <i class="icon icon-collect"></i>
                                <label class="popper">收藏</label>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="navbar-bottom">
                    <a href="javascript:void(0)" class="popper-link setting-link">
                        <i class="icon icon-setting"></i>
                        <label class="popper">更多</label>
                    </a>
                </div>
                <div class="info-popup" :class="{show: infoPopuped}" ref="userInfo">
                    <div class="popup-head">
                        <div class="name-box text-left">
                            <span>{{currentUser.name}}<i class="icon icon-girl"></i></span>
                            <span><label>微信号:</label>{{currentUser.id}}</span>
                        </div>
                        <div class="img-box">
                            <img src="../assets/user.png" alt="user-img">
                        </div>
                    </div>
                    <p class="text-left address-panel">
                        <span>
                            <label class="address-label">地区</label>
                            <label class="address-value">广东惠州</label>
                        </span>
                    </p>
                    <p class="popup-icons clearfix">
                        <span class="float-left"><a href="/info">编辑信息</a></span>
                        <span class="float-right">
                            <a href="javascript:void(0)"><i class="icon icon-share"></i></a>
                            <a href="javascript:void(0)"><i class="icon icon-chat-o"></i></a>
                        </span>
                    </p>
                </div>
            </div>
            <div class="contact-box">
                <div class="contact-header">
                    <span class="contact-search" :class="{'input-focus': searchfocused}">
                        <label class="icon-label"><i class="icon icon-search"></i></label>
                        <input type="text" placeholder="搜索" @focus="searchfocused = true" @blur="searchfocused = false">
                        <label class="close-label" v-show="searchfocused" @click="searchfocused = false"><i class="icon icon-close"></i></label>
                    </span>
                    <a href="javascript:void(0)" class="contact-plus">
                        <i class="icon icon-plus"></i>
                    </a>
                </div>
                <div class="contact-list">
                    <ul>
                        <li @click="openChatBox(currentUser)">
                            <div class="li-img">
                                <img :src="currentUser.image" alt="chat-list-img">
                            </div>
                            <div class="li-text">
                                <span class="name"><label>{{currentUser.name}}</label><label class="time">18/10/10</label></span>
                                <span class="text">亲爱的，你洗好澡了吗？</span>
                            </div>
                        </li>
                        <li @click="openChatBox(currentUser)">
                            <div class="li-img">
                                <img :src="currentUser.image" alt="chat-list-img">
                            </div>
                            <div class="li-text">
                                <span class="name"><label>{{currentUser.name}}</label><label class="time">22:45</label></span>
                                <span class="text">亲爱的，你洗好澡了吗？</span>
                            </div>
                        </li>
                        <li @click="openChatBox(currentUser)">
                            <div class="li-img">
                                <img :src="currentUser.image" alt="chat-list-img">
                            </div>
                            <div class="li-text">
                                <span class="name"><label>{{currentUser.name}}</label><label class="time">21:45</label></span>
                                <span class="text">亲爱的，你洗好澡了吗？</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="chat-box">
                <div class="chat-header">
                    <p class="toolbar">
                        <a href="javascript:void(0)" class="popper-link">
                            <i class="icon icon-zhiding"></i>
                            <label class="popper">置顶</label>
                        </a>
                        <a href="javascript:void(0)" class="popper-link">
                            <i class="icon icon-minimize"></i>
                            <label class="popper">最小化</label>
                        </a>
                        <a href="javascript:void(0)" class="popper-link">
                            <i class="icon icon-maximize"></i>
                            <label class="popper">最大化</label>
                        </a>
                        <a href="javascript:void(0)" class="popper-link">
                            <i class="icon icon-close"></i>
                            <label class="popper">关闭</label>
                        </a>
                    </p>
                    <p class="namebar">
                        <label class="name">{{currentUser.name}}</label>
                        <a href="javascript:void(0)" class="more-link"><i class="icon icon-more"></i></a>
                    </p>
                </div>
                <div class="chat-content">
                    <div class="content-box">
                        <div v-for="(content, index) in contents" :key="index">
                            <p class="text-left" v-if="content.user.id != currentUser.id">
                                <span><img :src="content.user.image" alt="user-img" class="user-img"></span>
                                <span class="content content-left">{{content.message}}</span>
                            </p>
                            <p class="text-right" v-else>  
                                <span class="content content-right">{{content.message}}</span>
                                <span><img :src="currentUser.image" alt="user-img" class="user-img"></span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="chat-send">
                    <div class="toolbar">
                        <p class="toolbar-left">
                            <a href="javascript:void(0)" class="popper-link">
                                <i class="icon icon-xiaolian"></i>
                                <label class="popper">表情</label>
                            </a>
                            <a href="javascript:void(0)" class="popper-link">
                                <i class="icon icon-wenjianjia"></i>
                                <label class="popper">发送文件</label>
                            </a>
                            <a href="javascript:void(0)" class="popper-link">
                                <i class="icon icon-jianqie"></i>
                                <label class="popper">截图</label>
                            </a>
                            <a href="javascript:void(0)" class="popper-link liaotianjilu">
                                <i class="icon icon-liaotianjilu"></i>
                                <label class="popper">聊天记录</label>
                            </a>
                        </p>
                        <p class="toolbar-right">
                            <a href="javascript:void(0)" class="popper-link">
                                <i class="icon icon-dianhua"></i>
                                <label class="popper">语音聊天</label>
                            </a>
                            <a href="javascript:void(0)" class="popper-link">
                                <i class="icon icon-shipin"></i>
                                <label class="popper">视频聊天</label>
                            </a>
                        </p>
                    </div>
                    <textarea name="chatcontent" id="chatcontent" rows="5" v-model="chatcontent" @keyup.enter="send"></textarea>
                    <p class="text-right">
                        <a href="javascript:void(0)" class="send-btn" @click="send">发送(S)</a>
                        </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Weixin',
  mounted () {
  },
  data: function () {
    return {
      listclicked: false,
      chatclicked: true,
      collectclicked: false,
      searchfocused: false,
      chatcontent: '',
      infoPopuped: false,
      currentUser: {
        id: 2,
        name: 'Chen',
        image: require('../assets/user.png')
      },
      contents: [
        {
          user: {
            id: 1,
            name: 'Richole',
            image: require('../assets/user1.png')
          },
          message: '亲爱的，我下班了'
        },
        {
          user: {
            id: 2,
            name: 'Chen',
            image: require('../assets/user.png')
          },
          message: '好，吃饭了吗？'
        },
        {
          user: {
            id: 1,
            name: 'Richole',
            image: require('../assets/user1.png')
          },
          message: '吃了，你呢'
        }
      ]
    }
  },
  methods: {
    closeInfoPanel (event) {
      var infoBox = this.$refs.userInfo
      if (infoBox) {
        if (!infoBox.contains(event.target)) {
          this.infoPopuped = false
        }
      }
    },
    active (el) {
      switch (el) {
        case 'chat':
          this.listclicked = false
          this.collectclicked = false
          this.chatclicked = true
          break
        case 'list':
          this.chatclicked = false
          this.collectclicked = false
          this.listclicked = true
          break
        case 'collect':
          this.chatclicked = false
          this.listclicked = false
          this.collectclicked = true
          break
      }
    },
    openChatBox (user) {
      console.log('打开某人的聊天窗口')
    },
    send () {
      this.contents.push({
        user: this.currentUser,
        message: this.chatcontent
      })
      this.chatcontent = ''
    }
  }
}
</script>
<style lang="less" scoped>
    .main-box {
        width: 100%;
        height: 100%;
        display: flex;
        align-content: center;
        border-top: solid 1px #ccc;
        border-bottom: solid 1px #ccc;
    }
    .popper-link {
        position: relative;
        .popper {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            font-size: 12px;
            white-space: nowrap;
            text-align: center;
            background-color: #fff;
            padding: 2px;
            border: solid 1px #666;
            box-shadow: rgba(153, 153, 153, 0.4) 2px 2px;
            color: #555;
        }
        &:hover {
            .popper {
                display: block;
            }
        }
    }
    .navbar {
        background-color:#28282b;
        color: #fff;
        width: 6%;
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
        .icon-chat {
            color: #09BB07;
        }
        .icon-user-list {
            color: #09BB07;
        }
        .icon-collect {
            color: #09BB07;
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
            display: none;
            &.show {
                display: block;
            }
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
            .popup-icons {
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
    }
    .contact-box {
        width: 31%;
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
                width: 82%;
                background: none;
                border: none;
                position: relative;
                &::-webkit-input-placeholder{
                    position: relative;
                    top: 1px;
                }
                &:-moz-placeholder{
                    position: relative;
                    top: 1px;
                }
                &::-moz-placeholder{
                    position: relative;
                    top: 1px;
                }
                &:-ms-input-placeholder{
                    position: relative;
                    top: 1px;
                }
                &:focus {
                    background-color: #fff;
                    border: none;
                    left: 2px;
                }
            }
            .icon-label {
                width: 5%;
            }
            .close-label {
                width: 18px;
                height: 18px;
                line-height: 18px;
                background-color: #ddd;
                border-radius: 50%;
                .icon-close {
                    font-size: 18px;
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
        .contact-list {
            li {
                display: flex;
                align-content: center;
                height: 60px;
                padding: 10px 20px;
                box-sizing: border-box;
                &:hover {
                    background-color: #D7D5D4;
                }
                &:nth-child(1) {
                    background-color: #BCBDBD;
                }
            }
            .li-img {
                img {
                    width: 40px;
                    height: 40px;
                    vertical-align: middle;
                }
            }
            .li-text {
                padding-left: 10px;
                width: 100%;
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
        }
    }
    .chat-box {
        width: 63%;
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
            }
        }
        .toolbar {
            text-align: right;
            padding-top: 3px;
            box-sizing: border-box;
            height: 20px;
            .icon {
                margin: 0 6px;
            }
            .icon-maximize {
                font-size: 16px;
                position: relative;
                top: -1px;
            }
        }
        .namebar {
            height: 40px;
            line-height: 40px;
            padding: 0 15px 0 30px;
            .name {
                font-size: 22px;
                float: left;
            }
            .more-link {
                float: right;
            }
        }
        .chat-content {
            padding: 5px 30px 0;
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
            box-sizing: border-box;
            .toolbar {
                height: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            textarea {
                width: 100%;
                box-sizing: border-box;
                border: none;
                resize: none;
                font-size: 16px;
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
        }
    }
    @media (min-width: 1280) {
        .contact-box .contact-search {
            width: 86%;
        }
    }
    @media (max-width: 768px) {
        .contact-box .contact-header {
            padding: 0 10px;
        }
        .contact-box .contact-list li {
            padding: 10px;
        }
    }
</style>
