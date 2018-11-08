import ajax from '@/common/ajax.js'
const state = {
    "username": '',
    "isLogged": false
}

const mutations = {
    setUsername (state, name) {
        if (name) {
            state.username = name
            state.isLogged = true
            localStorage.setItem('isLogged', true)
            localStorage.setItem('username', name)
        } else {
            state.username = null
            state.isLogged = false
            localStorage.setItem('isLogged', false)
            localStorage.setItem('username', '')
        }
    },
    setCK (state, data) {
        localStorage.setItem('ck', data)
    }
}

const actions = {
    getUserInfo () {
        return ajax.get('/user')
    },
    signIn ({commit}, data) {
        return ajax.post('/chat/user/sign_in', data).then((res) => {
            if (res.success) {
                console.log(res.data.message)
                commit('setUsername', res.data.name)
                commit('setCK', res.data.ck)
            }
            return res
        })
    },
    signUp (store, data) {
        return ajax.post('/chat/user/sign_up', data)
    },
    signOut ({commit}) {
        return ajax.post('/chat/user/sign_out')
            .then((res) => {
                if (res.success) {
                    commit('setUsername', null)
                    commit('setCK', '')
                }
                return res
            })
    }
}

var getters = {}

export default {state, mutations, actions, getters, "namespaced": true}
