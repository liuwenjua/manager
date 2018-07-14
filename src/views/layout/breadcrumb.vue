<template>
    <el-breadcrumb>
        <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { INIT_BREADCRUMB } from '@/store/modules/layout'

export default {
    created() {
        this.refreshBreadcrumb()
    },
    computed: mapState({
        breadcrumbs: state => state.layout.breadcrumbs
    }),
    methods: {
        ...mapActions([INIT_BREADCRUMB]),
        refreshBreadcrumb() {
            const list = [...this.breadcrumbs]
            let level = this.$route.meta.level
            if (level === undefined) {
                // 首页level=0
                level = 1
            }
            list.splice(level, list.length - level, {
                name: this.$route.name,
                path: this.$route.path
            })
            if (list[0].name !== '首页') {
                list.unshift({
                    name: '首页',
                    path: '/dashboard'
                })
            }
            this.INIT_BREADCRUMB(list)
        }
    },
    watch: {
        $route() {
            this.refreshBreadcrumb()
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-breadcrumb {
    display: inline-block;
    margin-left: 10px;
}
</style>
