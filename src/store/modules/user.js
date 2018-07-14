import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN' // 登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' // 退出登录

const key = {}
const sk = ['user', 'menus']
sk.forEach(k => {
    key[k] = `${process.env.SYSTEM_NAME}-${k}`
})

export default {
    state: JSON.parse(localStorage.getItem(key.user)) || {},
    mutations: {
        [USER_SIGNIN](state, user) {
            localStorage.setItem(key.user, JSON.stringify(user))
            Object.assign(state, user)
        },
        [USER_SIGNOUT](state) {
            localStorage.removeItem(key.user)
            localStorage.removeItem(key.menus)
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        [USER_SIGNIN]({ commit }, user) {
            commit(USER_SIGNIN, user)
        },
        [USER_SIGNOUT]({ commit }) {
            commit(USER_SIGNOUT)
        }
    }
}
