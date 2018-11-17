import ajax from '@/common/ajax.js'
const state = {
    user: {},
    isLogged: false
}

const mutations = {
    setUser (state, data) {
        if (data && JSON.stringify(data) !== '{}') {
            state.user = {...data}
            localStorage.setItem('username', data.name)
        } else {
            state.user = {}
            localStorage.setItem('username', '')
        }
    },
    setIsLogged (state, booldata) {
        if (booldata) {
            state.isLogged = true
            localStorage.setItem('isLogged', true)
        } else {
            state.isLogged = false
            localStorage.setItem('isLogged', false)
        }
    },
    setUserImage (state, url) {
        state.user.image = url
    },
    setCK (state, data) {
        localStorage.setItem('ck', data)
    }
}

const actions = {
    getUserInfo (store) {
        return ajax.get('/chat/user/get_user_info', {}, true).then(res => {
            store.commit('setUser', {
                ...res.data
            })
            return res
        })
    },
    saveUserInfo (store, data) {
        return ajax.post('/chat/user/save_info', data).then(res => {
            alert('保存成功')
            store.commit('setUser', {
                ...res.data.userInfo
            })
            return res
        })
    },
    signIn ({commit}, data) {
        return ajax.post('/chat/user/sign_in', data).then((res) => {
            console.log(res.data.message)
            commit('setUser', {
                ...res.data.userInfo
            })
            commit('setIsLogged', true)
            commit('setCK', res.data.ck)
            return res
        })
    },
    signUp (store, data) {
        return ajax.post('/chat/user/sign_up', data)
    },
    signOut ({commit}) {
        return ajax.post('/chat/user/sign_out')
            .then((res) => {
                commit('setUser', null)
                commit('setIsLogged', false)
                commit('setCK', '')
                return res
            })
    },
    uploadUserImage (store, data) {
        return ajax.postform('/chat/user/upload_head_img', data).then(res => {
            alert(res.data.message)
            store.commit('setUserImage', res.data.src)
        })
    },
    getUsers () {
        return ajax.get('/chat/user/get_users')
    }
}

var getters = {}

export default {state, mutations, actions, getters}
