<template>
    <div style="background: #f0f2f5;margin-top: -20px;">
        <div class="wscn-http404">
            <div class="pic-404">
                <img class="pic-404__parent" :src="pic404" alt="404">
                <img class="pic-404__child left" :src="pic404cloud" alt="404">
                <img class="pic-404__child mid" :src="pic404cloud" alt="404">
                <img class="pic-404__child right" :src="pic404cloud" alt="404">
            </div>
            <div class="bullshit">
                <div class="bullshit__sorry">Sorry!</div>
                <div class="bullshit__message">{{ message }}</div>
                <el-button @click="back" icon="arrow-left" class="cool-btn primary-btn bullshit__return-home">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import pic404 from '@/assets/images/404.png'
import pic404cloud from '@/assets/images/404_cloud.png'

export default {
    data() {
        return {
            pic404: pic404,
            pic404cloud: pic404cloud
        }
    },
    computed: {
        message() {
            return '您所访问的页面正在建设中'
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
.wscn-http404 {
    position: relative;
    width: 1200px;
    margin: 20px auto 60px;
    padding: 0 100px;
    overflow: hidden;
    .pic-404 {
        position: relative;
        float: left;
        width: 600px;
        padding: 150px 0;
        overflow: hidden;
        &__parent {
            width: 100%;
        }
        &__child {
            position: absolute;
            &.left {
                width: 80px;
                top: 17px;
                left: 220px;
                opacity: 0;
                animation-name: cloudLeft;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-delay: 1s;
            }
            &.mid {
                width: 46px;
                top: 10px;
                left: 420px;
                opacity: 0;
                animation-name: cloudMid;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-delay: 1.2s;
            }
            &.right {
                width: 62px;
                top: 100px;
                left: 500px;
                opacity: 0;
                animation-name: cloudRight;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-delay: 1s;
            }
            @keyframes cloudLeft {
                0% {
                    top: 17px;
                    left: 220px;
                    opacity: 0;
                }
                20% {
                    top: 33px;
                    left: 188px;
                    opacity: 1;
                }
                80% {
                    top: 81px;
                    left: 92px;
                    opacity: 1;
                }
                100% {
                    top: 97px;
                    left: 60px;
                    opacity: 0;
                }
            }
            @keyframes cloudMid {
                0% {
                    top: 10px;
                    left: 420px;
                    opacity: 0;
                }
                20% {
                    top: 40px;
                    left: 360px;
                    opacity: 1;
                }
                70% {
                    top: 130px;
                    left: 180px;
                    opacity: 1;
                }
                100% {
                    top: 160px;
                    left: 120px;
                    opacity: 0;
                }
            }
            @keyframes cloudRight {
                0% {
                    top: 100px;
                    left: 500px;
                    opacity: 0;
                }
                20% {
                    top: 120px;
                    left: 460px;
                    opacity: 1;
                }
                80% {
                    top: 180px;
                    left: 340px;
                    opacity: 1;
                }
                100% {
                    top: 200px;
                    left: 300px;
                    opacity: 0;
                }
            }
        }
    }
    .bullshit {
        position: relative;
        float: left;
        width: 300px;
        padding: 250px 0 0;
        overflow: hidden;
        &__sorry {
            font-size: 32px;
            font-weight: bold;
            line-height: 40px;
            color: #1482f0;
            opacity: 0;
            margin-bottom: 20px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }
        &__message {
            font-size: 20px;
            line-height: 24px;
            color: #1482f0;
            opacity: 0;
            margin-bottom: 10px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.1s;
            animation-fill-mode: forwards;
        }
        &__return-home {
            margin-top: 15px;
            opacity: 0;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.3s;
            animation-fill-mode: forwards;
        }
        @keyframes slideUp {
            0% {
                transform: translateY(60px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    }
}
</style>
