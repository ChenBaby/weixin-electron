<template>
    <transition name="fade">
        <div class="message-popup" :class="'is' + type" v-if="visible">
            <i class="icon" :class="'icon-' + type"></i>
            <span>{{message}}</span>
            <i class="icon icon-close" @click="close" v-if="hasClose"></i>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'message',
    data: function () {
        return {
            type: 'info',
            message: '',
            visible: false,
            hasClose: false
        }
    },
    mounted () {
        this.close()
    },
    methods: {
        close () {
            setTimeout(() => {
                this.visible = false
            }, 3000)
        }
    }
}
</script>
<style lang="less" scoped>
    .message-popup {
        height: 40px;
        position: fixed;
        top: 30px;
        left: 50%;
        margin-left: -150px;
        border-radius: 4px;
        background-color: transparent;
        padding: 0px 20px;
        line-height: 40px;
        span {
            vertical-align: top;
            font-size: 14px;
        }
        .icon-close {
            color: #2c3e50;
            margin-left: 40px;
            position: relative;
            top: -1px;
            cursor: pointer;
        }
        &.isinfo {
            background-color: #edf2fc;
            &::before {
                content: '';
                background-color: #798498;
                width: 3px;
                height: 40px;
                position: absolute;
                top: 0;
                left: 0;
            }
            .icon, span {
                color: #909399;
            }
        }
        &.iswarning {
            background-color: #fdf6ec;
            &::before {
                content: '';
                background-color: #f0a73f;
                width: 3px;
                height: 40px;
                position: absolute;
                top: 0;
                left: 0;
            }
            .icon, span {
                color: #e6a23c;
            }
        }
        &.issuccess {
            background-color: #f0f9eb;
            &::before {
                content: '';
                background-color: #649b43;
                width: 3px;
                height: 40px;
                position: absolute;
                top: 0;
                left: 0;
            }
            .icon, span {
                color: #67c23a;
            }
        }
        &.iserror {
            background-color: #fef0f0;
            &::before {
                content: '';
                background-color: #da5858;
                width: 3px;
                height: 40px;
                position: absolute;
                top: 0;
                left: 0;
            }
            .icon, span {
                color: #f56c6c;
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: all 0.2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(-30px);
    }
</style>


