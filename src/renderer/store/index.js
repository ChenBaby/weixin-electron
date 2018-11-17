import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import user from './user.js'

Vue.use(Vuex)

export default new Vuex.Store({
    ...user,
    modules,
    strict: process.env.NODE_ENV !== 'production'
})
