import { httpClient } from '@/plugins/axios'

const API = {
    login: '/wq-backend/auth/v1/loginByName',
    editPwd: '/wq-backend/api/identity/v1/editPwd'
}

export const submitLogin = data =>
    httpClient({
        method: 'post',
        url: API.login,
        data
    })

export const editPwd = data =>
    httpClient({
        method: 'put',
        url: API.editPwd,
        params: data
    })
