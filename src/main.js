// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters'
import components from './components'

import { axios, errorHandler } from './plugins'

import './assets/styles/reset.css'
import 'nprogress/nprogress.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'flex.css'
// import './assets/iconfont/iconfont.css'
import './assets/styles/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(axios)
Vue.use(errorHandler(err => {
    console.error('Global Error: ', err, window.location.href)
}))

Object.keys(components).forEach((key) => { // 注册公共组件，组件名首字母大写后以v开头，使用时<v-xxx></v-xxx>
    const name = key.replace(/(\w)/, (v) => v.toUpperCase())
    Vue.component(`v${name}`, components[key])
})

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// if (process.env.NODE_ENV === 'production') {
//     Vue.config.errorHandler = function(err, vm) {
//         console.log(err, window.location.href)
//     }
// }

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
