<template>
    <div class="err-page-container">
        <div class="err-block">
            <el-button @click="back" icon="arrow-left" class="cool-btn primary-btn">返回</el-button>
            <el-row>
                <el-col :span="12">
                    <h1 class="text-lg">Sorry!</h1>
                    <h2>您没有权限访问该页面</h2>
                    <h6>如有任何疑问请联系系统管理员</h6>
                </el-col>
                <el-col :span="12">
                    <img :src="pic" width="313" height="428" alt="401">
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import pic from '@/assets/images/401.gif'

export default {
    data() {
        return {
            pic: pic + '?' + +new Date()
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bg {}

.err-page-container {
    background: #fff;
    height: 100%;
    padding-top: 100px;
    .err-block {
        width: 800px;
        margin: 0 auto;
        color: #484848;
        .text-lg {
            font-size: 60px;
            font-weight: 700;
        }
    }
}
</style>
