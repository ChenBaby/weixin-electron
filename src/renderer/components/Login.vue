<template>
    <div class="login-page">
        <div class="bg-wrap">
        </div>
        <div class="login-wrap">
            <form>
                <p>
                    <label for="name">邮箱名</label>
                    <input type="text" id="name" v-model="user.email">
                    <!-- mustFixed id 去掉 -->
                </p>
                <p>
                    <label for="password">密码</label>
                    <input type="password" id="password" v-model="user.password">
                    <!-- mustFixed id 去掉 -->
                </p>
                <p class="text-center">
                    <a href="javascript:void(0)" class="btn btn-login" @click="signIn">登录</a>
                    <router-link :to="{path: '/regist'}" class="regist-link">或新注册</router-link>
                </p>
            </form>
        </div>

    </div>
</template>
<script>
export default {
    "name": 'Login',
    // mustFixed name 去掉
    "data": function () {
        return {
            "user": {
                "email": '',
                "password": ''
            }
        }
    },
    "mounted": function () {
        if (localStorage.getItem('isLogged')) {
            this.$router.push({
                "path": '/weixin'
            })
        }
    },
    "methods": {
        signIn () {
            this.$store.dispatch('user/signIn', {
                ...this.user
            })
                .then(res => {
                    console.log(res.data.message)
                    if (res.success) {
                        this.$router.push({
                            "path": '/weixin'
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                // mustFixed 错误提示在ajax.js封装一下，只要服务端传回success false，默认显示通用报错 alert 出来 message
        }
    }
}
</script>
<style lang="less" scoped>
    .login-page {
        .bg-wrap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-image: url('~@/assets/images/bg.jpg');
            background-size: cover;
            background-position: center;
        }
        .login-wrap {
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0,0,0,.3);
            width: 100%;
            height: 100%;
        }
        form {
            width: 460px;
            height: 440px;
            margin: 0 auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            border-radius: 5px;
            padding: 50px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p {
                label {
                    display: block;
                    margin-bottom: 5px;
                }
                input {
                    padding: 8px;
                    width: 90%;
                    border-radius: 3px;
                    border: 1px solid #ccc;
                    font-size: 14px;
                }
            }
        }
        .btn-login {
            display: inline-block;
            width: 60px;
            padding: 10px;
            border-radius: 3px;
            background-color: #009688;
            border: 1px solid #038075;
            color: #fff;
        }
        .regist-link {
            display: block;
            margin-top: 10px;
            color: inherit;
        }
    }
</style>

