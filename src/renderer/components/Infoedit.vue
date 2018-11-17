<template>
    <div class="infomation-edit-page">
        <router-link :to="{path: '/weixin'}" class="back-text"><i class="icon icon-prev"></i>返回</router-link>
        <div class="image-panel text-center">
            <a href="javascript:void(0)"  class="image-box">
                <img :src="user.image" alt="user-img">
                <label for="userimage-upload" class="input-label">更换</label>
                <input type="file" name="userimage" id="userimage-upload" accept="image/png,image/gif,image/jpeg" ref="imgupload" @change="uploadImage">
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
    data () {
        return {}
    },
    methods: {
        save () {
            if (this.user.name && this.user.sex) {
                this.user.sex = this.user.sex === '女' ? 'female' : 'male'
                this.$store.dispatch('saveUserInfo', {
                    ...this.user
                })
            }
        },
        uploadImage (e) {
            console.log('上传头像')
            let file = this.$refs.imgupload.files[0]
            let param = new FormData() // 创建form对象
            param.append('head_img', file, file.name)// 通过append向form对象添加数据
            console.log(param.get('head_img')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            this.$refs.imgupload.value = ''
            this.$store.dispatch('uploadUserImage', param)
                .then(response => {
                    console.log(response.data)
                })
        }
    },
    watch: {
        user () {}
    },
    computed: {
        "user" () {
            return {
                ...this.$store.state.user,
                sex: this.$store.state.user.sex === 'male' ? '男' : '女'
            }
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
        .image-panel {
            img {
                width: 120px;
                height: 120px;
                border-radius: 50%;
            }
            .image-box {
                position: relative;
                display: inline-block;
                height: 120px;
                .input-label {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    text-align: center;
                    line-height: 120px;
                    background-color: rgba(0,0,0,0.35);
                    color: #fff;
                    border-radius: 50%;
                    display: none;
                }
                input {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    opacity: 0;
                }
                &:hover {
                    .input-label {
                        display: block;
                    }
                }
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

