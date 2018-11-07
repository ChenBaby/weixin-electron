<template>
    <div class="regist-page">
        <div class="bg-wrap">
        </div>
        <div class="regist-wrap">
            <form>
                <p>
                    <label for="name">昵称</label>
                    <input type="text" id="name" v-model="user.name">
                    <!-- mustFixed id在这里没有作用，如果要修改样式请用class -->
                </p>
                <p>
                    <label for="email">邮箱</label>
                    <input type="text" id="email" v-model="user.email">
                    <!-- mustFixed id在这里没有作用，如果要修改样式请用class -->
                </p>
                <p>
                    <label for="password">密码</label>
                    <input type="password" id="password" v-model="user.password">
                    <!-- mustFixed id在这里没有作用，如果要修改样式请用class -->
                </p>
                <p class="text-center">
                    <a href="javascript:void(0)" class="btn btn-regist" @click="signUp">注册</a>
                    <router-link :to="{path: '/'}" class="regist-link">已有账户？登录</router-link>
                </p>
            </form>
        </div>

    </div>
</template>
<script>
export default {
    "name": 'regist',
    // mustFixed data () {} 上面的name去掉
    "data": function () {
        return {
            "user": {
                "name": '',
                "password": '',
                "email": ''
            }
        }
    },
    "methods": {
        signUp () {
            console.log(this.user)
            this.$store.dispatch('user/signUp', {
                ...this.user
            })
                .then(res => {
                    console.log(res.data.message)
                    if (res.success) {
                        this.$router.push({
                            "path": '/'
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                // mustFixed 错误提示在ajax.js封装一下，只要服务端传回success false，默认显示通用报错 alert 出来 message
        }
    }
}
</script>
<style lang="less" scoped>
    .regist-page {
        .bg-wrap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-image: url('~@/assets/images/bg.jpg');
            background-size: cover;
            background-position: center;
        }
        .regist-wrap {
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
        .btn-regist {
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

