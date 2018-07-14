import axios from 'axios'
import store from '@/store'
// import {
//     USER_SIGNOUT
// } from '../../store/modules/user'
// import router from '@/router'

const instance = axios.create({
    baseURL: process.env.API_HOST,
    timeout: 10000
})

instance.interceptors.request.use(
    config => {
        config.headers = config.headers || {}
        if (store.state.user.token) {
            config.headers['authToken'] = store.state.user.token
        }
        return config
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            const {
                status
            } = error.response
            switch (status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    // store.dispatch(USER_SIGNOUT)
                    // router.replace({
                    //     path: '/login',
                    //     query: {
                    //         from: router.currentRoute.fullPath.startsWith('/login') ? undefined : router.currentRoute.fullPath
                    //     }
                    // })
                    // throw new Error('会话已过期，请重新登录')
                    break
                case 500:
                case 502:
                case 503:
                case 504:
                    throw new Error('服务器开了个小差，请稍后再试！')
            }
        }
        return Promise.reject(error)
    }
)

/**
 * function httpClient(config) // axios实例封装
 * config: {
 *  method: 'get', // 默认get
 *  url: string,
 *  data: object,  // params in req.body
 *  params: object // params in req.query
 *  responseType: string // default is 'json', or 'blob' for file downloading.
 * }
 * return instance
 **/
export const httpClient = function({
    method = 'get',
    url,
    data,
    params,
    responseType = 'json',
    headers
}) {
    return instance({
        method,
        url,
        data,
        params,
        responseType,
        headers
    })
}

export default {
    install(vue) {
        if (!vue.$http) {
            vue.$http = httpClient
        }

        vue.mixin({
            created: function() {
                this.$http = vue.$http
            }
        })
    }
}
