<template>
    <el-menu :unique-opened="true" mode="vertical" router theme="dark" :default-active="$route.path">
        <template v-for="(item,index) in menus">
            <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.url || item.authCode" :key="index">
                <i :class="item.icon || 'el-icon-menu'"></i> {{item.authName}}
            </el-menu-item>
            <el-submenu v-else :index="item.url || item.authCode" :class="{ 'is-active': isActive(item) }" :key="index">
                <template slot="title">
                    <i :class="item.icon || 'el-icon-menu'"></i> {{item.authName}}
                </template>
                <el-menu-item v-for="(child, i) in item.children" :key="i" :index="child.url || child.authCode" class="title-link" :class="{ 'is-active': isActive(child) }">
                    {{child.authName}}
                </el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            menus: state => state.layout.sidebar.menus
        })
    },
    methods: {
        // handleSelect(index, path) {
        //     console.log(index, path)
        //     this.$router.push({ path: index })
        // },
        isActive(item) {
            const path = this.$route.path
            if (!item.url) {
                return item.children.some(child => {
                    return (
                        path !== child.url && path.startsWith(child.url + '/')
                    )
                })
            } else {
                return path !== item.url && path.startsWith(item.url + '/')
            }
        }
    }
}
</script>

<style scoped>
.el-menu {
    min-height: 100%;
    border-radius: 0;
}

.title-link {
    display: block;
    text-indent: 10px;
}
</style>
