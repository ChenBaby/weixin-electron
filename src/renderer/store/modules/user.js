import ajax from '@/common/ajax.js'
const state = {
    "user": {},
    "isLogged": false
}

const mutations = {
    setGlobalUser (state, data) {
        if (JSON.stringify(data) === '{}') {
            state.user = {}
            state.isLogged = false
            // localStorage.setItem('isLogged', false)
            // localStorage.setItem('user', '{}')
        } else {
            state.user = {...data}
            state.isLogged = true
        }
    }
}

const actions = {
    getUserInfo () {
        return ajax.get('/user')
    },
    signIn ({commit}, data) {
        return ajax.get('/user/login', data).then((res) => {
            commit.setGlobalUser(res.data)
            return res
        })
    },
    signUp (data) {
        return ajax.post('/user/signup', data)
    },
    signOut () {
        return ajax.post('/user/signout')
    }
}

var getters = {}

export default {state, mutations, actions, getters, "namespaced": true}
