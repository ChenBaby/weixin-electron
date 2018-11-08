<template>
    <div class="infomation-edit-page">
        <router-link :to="{path: '/weixin'}" class="back-text"><i class="icon icon-prev"></i>返回</router-link>
        <div class="image-pabel text-center">
            <a href="javascript:void(0)">
                <img :src="user.image" alt="user-img">
            </a>
        </div>
        <form>
            <p>
                <label>昵称</label>
                <input type="text" v-model="user.name"/>
            </p>
            <p>
                <label>性别</label>
                <input type="text" v-model="user.sex"/>
            </p>
            <p>
                <label>所在地</label>
                <input type="text" v-model="user.address"/>
            </p>
            <p class="text-center">
                <a href="javascript:void(0)" class="btn btn-save" @click="save">保存</a>
            </p>
        </form>
    </div>
</template>
<script>
export default {
    "data" () {
        return {
            "user": {
                "name": 'ChenShuilian',
                "sex": '男',
                "address": '深圳福田',
                "image": require('../assets/images/user.png')
            }
        }
    },
    "methods": {
        save () {

        }
    }
}
</script>
<style lang="less" scoped>
    .infomation-edit-page {
        background-color: #fff;
        padding: 50px;
        .back-text {
            font-size: 16px;
            display: inline-block;
            padding: 5px;
            background-color: #e57373;
            border-radius: 3px;
            color: #fff;
            .icon-prev {
                font-size: 16px;
                margin-right: 5px;
                color: #fff;
            }
        }
        form {
            width: 460px;
            height: 440px;
            margin: 0 auto;
            margin-top: 100px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            input {
                width: 90%;
                padding: 8px;
                border: solid 1px #ccc;
                border-radius: 3px;
            }
            p label {
                margin-bottom: 5px;
                display: block;
            }
        }
        .image-pabel {
            img {
                width: 120px;
                height: 120px;
                border-radius: 50%;
            }
        }
        .btn-save {
            display: inline-block;
            width: 60px;
            padding: 10px;
            border-radius: 3px;
            background-color: #eee;
            border: 1px solid #ddd;
            color: inherit;
        }
    }
</style>

