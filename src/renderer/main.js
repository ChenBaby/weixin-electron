import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import Bus from '@/common/bus'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$EventBus = Bus
Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
    "components": { App },
    router,
    store,
    "template": '<App/>'
}).$mount('#app')
