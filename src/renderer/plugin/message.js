import Vue from 'vue'
import Message from '../common/Message'

const MessageBox = Vue.extend(Message)

let MyPlugin = {}
MyPlugin.install = function (Vue) {
    Vue.prototype.$message = Vue.prototype.$info = MyPlugin.$info = function (message, type = 'info') {
        let instance = new MessageBox({
            data: { message, type }
        }).$mount()

        document.body.appendChild(instance.$el)

        Vue.nextTick(() => {
            instance.visible = true
        })
    }

    Vue.prototype.$warning = MyPlugin.$warning = (message, type = 'warning') => {
        Vue.prototype.$message(message, type)
    }

    Vue.prototype.$error = MyPlugin.$error = (message, type = 'error') => {
        Vue.prototype.$message(message, type)
    }

    Vue.prototype.$success = MyPlugin.$success = (message, type = 'success') => {
        Vue.prototype.$message(message, type)
    }
}
export default MyPlugin
