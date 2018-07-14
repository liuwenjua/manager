<template>
    <div class="app-wrapper" :class="{ hideSidebar: !layout.sidebar.opened }">
        <div class="sidebar-wrapper">
            <sidebar class="sidebar-container"></sidebar>
        </div>
        <div class="main-container">
            <navbar></navbar>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { USER_SIGNOUT } from '@/store/modules/user'
import { navbar, sidebar, appMain } from '@/views/layout'

function _onstorage(key, callback) {
    let oldValue = window.localStorage[key]
    return function(e) {
        setTimeout(() => {
            e = e || window.storageEvent
            let k = e.key
            let newValue = e.newValue
            if (!k) {
                const nv = window.localStorage[key]
                if (nv !== oldValue) {
                    k = key
                    newValue = nv
                }
            }
            if (k === key) {
                if (callback) callback(newValue)
                oldValue = newValue
            }
        }, 0)
    }
}

export default {
    name: 'layout',
    components: {
        navbar,
        sidebar,
        appMain
    },
    data() {
        return {
            cb: null
        }
    },
    computed: mapState({
        layout: state => state.layout
    }),
    mounted() {
        this.cb = _onstorage(`${process.env.SYSTEM_NAME}-user`, v => {
            if (!v) {
                this.USER_SIGNOUT()
                this.$router.push('/login')
            }
        })
        if (document.attachEvent) {
            document.attachEvent('onstorage', this.cb)
        } else {
            window.addEventListener('storage', this.cb, false)
        }
    },
    beforeDestroy() {
        if (document.detachEvent) {
            document.detachEvent('onstorage', this.cb)
        } else {
            window.removeEventListener('storage', this.cb, false)
        }
    },
    methods: mapActions([USER_SIGNOUT])
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/assets/styles/mixin.scss';

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
        .sidebar-wrapper {
            transform: translate(-140px, 0);
            overflow-y: hidden;
            .sidebar-container {
                transform: translate(132px, 0);
            }
            &:hover {
                transform: translate(0, 0);
                overflow-y: auto;
                .sidebar-container {
                    transform: translate(0, 0);
                }
            }
        }
        .main-container {
            margin-left: 40px;
        }
    }
    .sidebar-wrapper {
        width: 180px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow-x: hidden;
        transition: all 0.28s ease-out;
        @include scrollBar;
    }
    .sidebar-container {
        transition: all 0.28s ease-out;
    }
    .main-container {
        min-height: 100%;
        transition: all 0.28s ease-out;
        margin-left: 180px;
    }
}
</style>
