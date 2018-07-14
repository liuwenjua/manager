<template>
    <el-card class="portlet-box" :class="{ 'portlet-box--bordered': border }">
        <div class="portlet-box__header" v-show="title !== ''">
            <div class="portlet-box__title">
                <i :class="icon"></i> {{title}}</div>
            <div class="portlet-box__actions" :style="actionStyle">
                <slot name="actions"></slot>
            </div>
        </div>
        <div class="portlet-box__body">
            <slot></slot>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'portlet',
    props: {
        title: {
            type: String,
            default: ''
        },
        actionStyle: {
            type: Object
        },
        icon: {
            type: String,
            default: ''
        },
        border: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/assets/styles/color.scss';

.portlet-box {
    margin: 15px;
    box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.03);
    border: none;
    border-radius: 2px;
    &--bordered {
        border: 1px solid #ccc;
    }
    &__header {
        margin-bottom: 15px;
        padding: 0 15px 15px 15px;
        border-bottom: 1px solid #ccc;
        position: relative;
        .portlet-box__title {
            font-size: 1.2em;
            color: $text;
        }
        .portlet-box__actions {
            position: absolute;
            top: -3px;
            right: 15px;
        }
    }
}
</style>
