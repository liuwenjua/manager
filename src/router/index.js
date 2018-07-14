import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import Layout from '@/views/layout/layout'

const _import = require(`./_import_${process.env.NODE_ENV}`).default

Vue.use(Router)

let bundles = [
    {
        path: 'dashboard',
        component: _import('dashboard'),
        meta: {
            name: '首页',
            level: 0
        }
    }
]

// bundles = bundles.concat()

/**
 * meta: {
 *   auth: false,  // authentication required or not, default true
 *   name: '',     // name show in breadcrumb
 *   level: 1      // breadcrumb level, default 1
 * }
 **/
export const routes = [
    {
        path: '/login',
        component: _import('login'),
        meta: {
            auth: false
        }
    },
    {
        path: '/404',
        component: _import('common/404'),
        meta: {
            auth: false
        }
    },
    {
        path: '/401',
        component: _import('common/401'),
        meta: {
            auth: false
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: bundles
    },
    {
        path: '/*',
        redirect: '/404'
    }
]

const router = new Router({
    mode: 'history',
    // base: '/wq-mis/',
    routes: routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    const { auth = true } = to.meta
    if (auth) {
        const isLogin = Boolean(store.state.user.token)
        if (!isLogin) {
            NProgress.done()
            return next({
                path: '/login',
                query: {
                    from: to.fullPath
                }
            })
        }
    }
    to.meta.from = from.fullPath
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
