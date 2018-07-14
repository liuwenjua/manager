<template>
    <div>
        <el-popover ref="popover" placement="bottom-start" trigger="manual" content="点击可收缩/展开侧边栏菜单" :offset="5" popper-class="blue">
        </el-popover>
        <el-menu class="navbar" mode="horizontal">
            <v-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened" v-popover:popover></v-hamburger>
            <breadcrumb></breadcrumb>
            <div class="name-container">
                <!-- <div>{{ env.schoolName }} v{{version}}</div> -->
                <div>服务中心后端</div>
                <div>{{ user.userName }}</div>
            </div>
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <img class="user-avatar" :src="defaultAvatar">
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <el-dropdown-item>
                        <span @click="dialog = true" class="dp-block">修改密码</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <span @click="logout" class="dp-block">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu>
        <el-dialog title="修改密码" :visible.sync="dialog" size="tiny">
            <el-form :model="submitForm" :rules="rules" ref="submitForm" label-width="100px">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input type="password" v-model="submitForm.oldPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input type="password" v-model="submitForm.newPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码确认" prop="confirmPwd">
                    <el-input type="password" v-model="submitForm.confirmPwd" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <el-button type="primary" :loading="submitting" @click="save">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { USER_SIGNOUT } from '@/store/modules/user'
import { TOGGLE_SIDEBAR } from '@/store/modules/layout'
import breadcrumb from './breadcrumb'
import avatar from '@/assets/images/avatar.png'
import md5 from 'blueimp-md5'
import { editPwd } from '@/services/auth'

export default {
    components: {
        breadcrumb
    },
    data() {
        return {
            version: process.env.VERSION_TAG,
            submitForm: {
                oldPwd: '',
                newPwd: '',
                confirmPwd: ''
            },
            rules: {
                oldPwd: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPwd: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur'
                    },
                    {
                        pattern: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/,
                        message: '数字、字母、特殊符号至少包含两种，长度8~16位',
                        trigger: 'blur'
                    }
                ],
                confirmPwd: [
                    {
                        required: true,
                        message: '请再次输入新密码',
                        trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.submitForm.newPwd) {
                                callback(new Error('两次输入的密码不一致'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            },
            submitting: false,
            dialog: false,
            showTip: true
        }
    },
    computed: {
        ...mapState({
            env: state => state.env,
            user: state => state.user,
            sidebar: state => state.layout.sidebar
        }),
        defaultAvatar() {
            return this.user.picUrl && this.env.ossUrl
                ? `${this.env.ossUrl}${this.user.picUrl}?_=${+new Date()}`
                : avatar
        }
    },
    mounted() {
        this.$refs['popover'].doShow()
        setTimeout(() => {
            this.closePopover()
        }, 10000)
    },
    methods: {
        ...mapActions([USER_SIGNOUT, TOGGLE_SIDEBAR]),
        closePopover() {
            const popover = this.$refs['popover']
            if (popover) popover.doClose()
        },
        toggleSideBar() {
            this.closePopover()
            this.TOGGLE_SIDEBAR()
        },
        logout() {
            this.USER_SIGNOUT()
            this.$router.push('/login')
        },
        save() {
            this.$refs['submitForm'].validate(valid => {
                if (valid) {
                    this.submitting = true
                    const p = {
                        loginId: this.$store.state.user.account,
                        oldPwd: md5(this.submitForm.oldPwd),
                        newPwd: md5(this.submitForm.newPwd)
                    }
                    editPwd(p)
                        .then(({ data }) => {
                            if (data.resultCode !== 0) {
                                this.$message.error(data.resultDesc)
                                return
                            }
                            this.$message.success('保存成功')
                            this.$refs['submitForm'].resetFields()
                            this.dialog = false
                        })
                        .catch(err => {
                            console.dir(err)
                            this.$message.error(err.message || '保存失败')
                        })
                        .finally(() => {
                            this.submitting = false
                        })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    line-height: 54px;
    border-radius: 0px !important;
    background: #fff;
    box-shadow: 0 1px 10px 0 rgba(50, 50, 50, 0.2);
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .name-container {
        line-height: 20px;
        height: 50px;
        float: right;
        padding: 8px 90px 0 0;
        font-size: 13px;
        color: #48576a;
        text-align: center;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            margin-top: 7px;
            position: relative;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>
