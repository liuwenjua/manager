<template>
    <div class="login-wrap">
        <canvas id="canvas" v-circle-x="120"></canvas>
        <div class="ms-logo"></div>
        <div class="ms-title">万企消贷网后台管理系统</div>
        <div class="ms-version">v{{version}}</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="rand">
                    <el-input class="ms-login-rand" placeholder="验证码" v-model="ruleForm.rand" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <div class="ms-login-img" @click="refreshRand"><img :src="randImg"/></div>
                </el-form-item> -->
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitting">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import circleX from '@/directives/circleX'
import md5 from 'blueimp-md5'
import { mapState, mapActions } from 'vuex'
import { USER_SIGNIN } from '@/store/modules/user'
// import { submitLogin, getRand } from '@/services/auth'
import { submitLogin } from '@/services/auth'
import { INIT_SIDEBAR_MENUS } from '@/store/modules/layout';

export default {
    directives: {
        circleX
    },
    data() {
        return {
            version: process.env.VERSION_TAG,
            randImg: null,
            token: null,
            ruleForm: {
                username: '',
                password: '',
                rand: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                    // {
                    //     pattern: /[A-Za-z0-9]{6,12}$/,
                    //     message: '账号由数字或字母组成，长度6~12位',
                    //     trigger: 'blur'
                    // }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                    // {
                    //     pattern: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{6,12}$/,
                    //     message: '数字、字母、特殊符号至少包含两种，长度6~12位',
                    //     trigger: 'blur'
                    // }
                ]
                // rand: [
                //     { required: true, message: '请输入验证码', trigger: 'blur' },
                //     {
                //         pattern: /[A-Za-z0-9]{4}$/,
                //         message: '验证码由数字或字母组成，长度4位',
                //         trigger: 'blur'
                //     }
                // ]
            },
            submitting: false // true正在提交， false还没提交
        }
    },
    computed: mapState(['env']),
    mounted() {
        if (this.$route.query.from) {
            this.$message.error('会话已过期，请重新登录')
        }
        // this.refreshRand()
    },
    methods: {
        // ...mapActions([USER_SIGNIN]),
        ...mapActions([USER_SIGNIN, INIT_SIDEBAR_MENUS]),
        // async refreshRand() {
        //     try {
        //         const res = await getRand()
        //         if (!res || !res.data) {
        //             this.$message.error('验证码刷新失败!')
        //         }
        //         const URL = window.URL || window.webkitURL
        //         this.randImg = URL.createObjectURL(res.data)
        //         this.token = res.headers['x-auth-token']
        //     } catch (err) {
        //         console.dir(err)
        //         this.$message.error(err.message || '验证码刷新失败')
        //     }
        // },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    this.submitting = true
                    const p = {
                        loginName: this.ruleForm.username,
                        loginPwd: md5(this.ruleForm.password)
                        // random: this.ruleForm.rand
                    }
                    try {
                        const { data } = await submitLogin(p)
                        console.info(data)
                        if (data.resultCode === -1) {
                            this.$message.error(data.resultDesc)
                        } else {
                            const user = { ...data.data }
                            this.USER_SIGNIN(user)
                            this.INIT_SIDEBAR_MENUS(user.authInfoList);
                            this.$message.success('登录成功')
                            let path = this.$route.query.from
                            console.info(path)
                            if (!path || path.includes('/login')) {
                                path = '/'
                            }
                            this.$router.push(path)
                        }
                    } catch (err) {
                        console.dir(err)
                        let reason = err.message
                        if (err.response && err.response.data && err.response.data.reason) {
                            reason = err.response.data.reason
                        }
                        this.$message.error(reason || '登录失败')
                    }
                    // this.refreshRand()
                    this.submitting = false
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-wrap {
    width: 100%;
    height: 100%;
}

canvas {
    display: block;
    width: 100%;
    height: 100%;
}

.ms-logo {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100px;
    width: 300px;
    margin-top: -310px;
    margin-left: -150px;
    background: url(../assets/images/logo.png) center no-repeat;
}

.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -180px;
    text-align: center;
    font-size: 30px;
    color: #324057;
    font-weight: bold;
}

.ms-version {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -140px;
    text-align: center;
    font-size: 14px;
    color: #324057;
    font-weight: bold;
}

.ms-login {
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 360px;
    height: 160px;
    margin: -150px 0 0 -180px;
    padding: 40px;
    border-radius: 5px;
    &-rand {
        width: 170px;
    }
    &-img {
        display: inline-block;
        cursor: pointer;
        img {
            vertical-align: text-bottom;
        }
    }
}

.login-btn {
    text-align: center;
    button {
        width: 100%;
    }
}
</style>
