<template>
    <div class="wechat-page">
        <div class="main-box">
            <div class="navbar">
                <div class="navbar-top">
                    <ul>
                        <li><a href="javascript:void(0)"><img :src="user.image" alt="user-img"></a></li>
                        <li>
                            <a href="javascript:void(0)" v-show="!chatclicked" @click="active('chat')">
                                <i class="icon icon-chat-o"></i>
                            </a>
                            <a href="javascript:void(0)" v-show="chatclicked">
                                <i class="icon icon-chat"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" v-show="!listclicked" @click="active('list')">
                                <i class="icon icon-user-list-o"></i>
                            </a>
                            <a href="javascript:void(0)" v-show="listclicked">
                                <i class="icon icon-user-list"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)" v-show="!collectclicked" @click="active('collect')">
                                <i class="icon icon-collect-o"></i>
                            </a>
                            <a href="javascript:void(0)" v-show="collectclicked">
                                <i class="icon icon-collect"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="navbar-bottom">
                    <a href="javascript:void(0)">
                        <i class="icon icon-setting"></i>
                    </a>
                </div>
            </div>
            <div class="contact-box">
                <div class="contact-header">
                    <span class="contact-search" :class="{'input-focus': searchfocused}">
                        <label><i class="icon icon-search"></i></label>
                        <input type="text" placeholder="搜索" @focus="searchfocused = true" @blur="searchfocused = false">
                        <label class="close-label" v-show="searchfocused" @click="searchfocused = false"><i class="icon icon-close"></i></label>
                    </span>
                    <a href="javascript:void(0)" class="contact-plus">
                        <i class="icon icon-plus"></i>
                    </a>
                </div>
                <div class="contact-list">
                    <ul>
                        <li @click="openChatBox(user)">
                            <div class="li-img">
                                <img :src="user.image" alt="chat-list-img">
                            </div>
                            <div class="li-text">
                                <span class="name"><label>{{user.name}}</label><label class="time">18/10/10</label></span>
                                <span class="text">亲爱的，你洗好澡了吗？</span>
                            </div>
                        </li>
                        <li @click="openChatBox(user)">
                            <div class="li-img">
                                <img :src="user.image" alt="chat-list-img">
                            </div>
                            <div class="li-text">
                                <span class="name"><label>{{user.name}}</label><label class="time">22:45</label></span>
                                <span class="text">亲爱的，你洗好澡了吗？</span>
                            </div>
                        </li>
                        <li @click="openChatBox(user)">
                            <div class="li-img">
                                <img :src="user.image" alt="chat-list-img">
                            </div>
                            <div class="li-text">
                                <span class="name"><label>{{user.name}}</label><label class="time">21:45</label></span>
                                <span class="text">亲爱的，你洗好澡了吗？</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="chat-box">
                <div class="chat-header">
                    <p class="toolbar">
                        <a href="javascript:void(0)"><i class="icon icon-zhiding"></i></a>
                        <a href="javascript:void(0)"><i class="icon icon-minimize"></i></a>
                        <a href="javascript:void(0)"><i class="icon icon-maximize"></i></a>
                        <a href="javascript:void(0)"><i class="icon icon-close"></i></a>
                    </p>
                    <p class="namebar">
                        <label class="name">{{user.name}}</label>
                        <a href="javascript:void(0)" class="more-link"><i class="icon icon-more"></i></a>
                    </p>
                </div>
                <div class="chat-content">
                    <div>
                        <p class="text-left">
                            <span><img :src="user1.image" alt="user-img" class="user-img"></span>
                            <span class="content content-left">你吃饭了吗？我下班了</span>
                        </p>
                        <p class="text-right">
                            <span class="content content-right">你吃饭了吗？我下班了</span>
                            <span><img :src="user.image" alt="user-img" class="user-img"></span>
                        </p>
                        <p class="text-left">
                            <span><img :src="user1.image" alt="user-img" class="user-img"></span>
                            <span class="content content-left">你吃饭了吗？我下班了，准备坐地铁，你做饭了吗？今晚吃什么啊，亲爱的工作辛不辛苦，我好心疼</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Weixin',
  data: function () {
    return {
      listclicked: false,
      chatclicked: true,
      collectclicked: false,
      searchfocused: false,
      user: {
        name: 'Richole',
        image: require('../assets/user.png')
      },
      user1: {
        name: 'Chen',
        image: require('../assets/user1.png')
      }
    }
  },
  methods: {
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
    }
  }
}
</script>
<style lang="less" scoped>
    .main-box {
        width: 100%;
        height: 640px;
        display: flex;
        align-content: center;
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
        img {
            width: 50%;
        }
        .icon {
            font-size: 26px;
            color: #666;
        }
        .icon-chat-o {
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
    }
    .contact-box {
        width: 31%;
        height: 100%;
        background-color: #EDEAE8;
        .contact-header {
            padding: 0px 20px;
            height: 60px;
            line-height: 60px;
            position: relative;
        }
        .contact-search {
            width: 86%;
            height: 24px;
            background-color: #DBD9D8;
            display: inline-block;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            padding: 4px;
            border: solid 1px #DBD9D8;
            &.input-focus {
                background-color: #fff;
            }
            .icon-search {
                font-size: 14px;
                vertical-align: middle;
                position: relative;
                left: 3px;
            }
            input {
                width: 180px;
                position: relative;
                left: 10px;
                background: none;
                border: none;
                &:focus {
                    background-color: #fff;
                    border: none;
                }
            }
            .close-label {
                position: relative;
                left: 12px;
                width: 18px;
                height: 18px;
                background-color: #ddd;
                border-radius: 50%;
                line-height: 18px;
                .icon-close {
                    font-size: 18px;
                }
            }
        }
        .contact-plus {
            padding: 4px;
            background-color: #DBD9D8;
            border-radius: 4px;
            position: absolute;
            top: 17px;
            right: 20px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            box-sizing: border-box;
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
                span {
                    display: block;
                    height: 20px;
                    line-height: 20px;
                    text-align: left;
                    width: 230px;
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
    }
</style>
