export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const INIT_SIDEBAR_MENUS = 'INIT_SIDEBAR_MENUS'
export const INIT_BREADCRUMB = 'INIT_BREADCRUMB'
export const ACTIVE_TOP_NAV = 'ACTIVE_TOP_NAV'

const key = {}
const sk = ['sidebar', 'menus', 'breadcrumbs', 'activeTopNav']
sk.forEach(k => {
    key[k] = `${process.env.SYSTEM_NAME}-${k}`
})

const initMenus = [
    {
        code: '1000',
        name: '会员系统',
        url: '/member',
        parentCode: '0',
        icon: '',
        children: [
            {
                code: '1010',
                name: '会员列表',
                url: '/member/list',
                parentCode: '1000',
                icon: ''
            }
        ]
    },
    {
        code: '1100',
        name: '商品系统',
        url: '/biz',
        parentCode: '0',
        icon: '',
        children: [
            {
                code: '1110',
                name: '商品管理',
                url: '/biz/commodity',
                parentCode: '1100',
                icon: '',
                children: [
                    {
                        code: '1111',
                        name: '商品列表',
                        url: '/biz/commodity/list',
                        parentCode: '1110',
                        icon: ''
                    },
                    {
                        code: '1112',
                        name: '商品添加',
                        url: '/biz/commodity/add',
                        parentCode: '1110',
                        icon: ''
                    },
                    {
                        code: '1113',
                        name: '回收站',
                        url: '/biz/commodity/recyclebin',
                        parentCode: '1110',
                        icon: ''
                    }
                ]
            },
            {
                code: '1120',
                name: '商品分类',
                url: '/biz/clazz',
                parentCode: '1100',
                icon: '',
                children: [
                    {
                        code: '1121',
                        name: '分类列表',
                        url: '/biz/clazz/list',
                        parentCode: '1120',
                        icon: ''
                    },
                    {
                        code: '1122',
                        name: '分类添加',
                        url: '/biz/clazz/add',
                        parentCode: '1120',
                        icon: ''
                    }
                ]
            },
            {
                code: '1130',
                name: '品牌管理',
                url: '/biz/brand',
                parentCode: '1100',
                icon: '',
                children: [
                    {
                        code: '1131',
                        name: '品牌列表',
                        url: '/biz/brand/list',
                        parentCode: '1130',
                        icon: ''
                    },
                    {
                        code: '1132',
                        name: '品牌添加',
                        url: '/biz/brand/add',
                        parentCode: '1130',
                        icon: ''
                    }
                ]
            },
            {
                code: '1140',
                name: '规格管理',
                url: '/biz/spec',
                parentCode: '1100',
                icon: '',
                children: [
                    {
                        code: '1141',
                        name: '规格列表',
                        url: '/biz/spec/list',
                        parentCode: '1140',
                        icon: ''
                    },
                    {
                        code: '1142',
                        name: '规格添加',
                        url: '/biz/spec/add',
                        parentCode: '1140',
                        icon: ''
                    }
                ]
            },
            {
                code: '1150',
                name: '供应商管理',
                url: '/biz/supplier',
                parentCode: '1100',
                icon: '',
                children: [
                    {
                        code: '1151',
                        name: '供应商列表',
                        url: '/biz/supplier/list',
                        parentCode: '1150',
                        icon: ''
                    },
                    {
                        code: '1152',
                        name: '供应商添加',
                        url: '/biz/supplier/add',
                        parentCode: '1150',
                        icon: ''
                    },
                    {
                        code: '1153',
                        name: '管理师列表',
                        url: '/biz/supplier/manager/list',
                        parentCode: '1150',
                        icon: ''
                    },
                    {
                        code: '1154',
                        name: '管理师添加',
                        url: '/biz/supplier/manager/add',
                        parentCode: '1150',
                        icon: ''
                    },
                    {
                        code: '1155',
                        name: '管理员列表',
                        url: '/biz/supplier/clerk/list',
                        parentCode: '1150',
                        icon: ''
                    },
                    {
                        code: '1156',
                        name: '管理员添加',
                        url: '/biz/supplier/clerk/add',
                        parentCode: '1150',
                        icon: ''
                    }
                ]
            }
        ]
    },
    {
        code: '1200',
        name: '订单系统',
        url: '/order',
        parentCode: '0',
        icon: '',
        children: [{
            code: '1210',
            name: '订单管理',
            url: '/order/orderManager',
            parentCode: '1200',
            icon: '',
            children: [{
                code: '1211',
                name: '订单列表',
                url: '/order/orderManager/list',
                parentCode: '1210',
                icon: ''
            }, {
                code: '1212',
                name: '订单设置',
                url: '/order/orderManager/setting',
                parentCode: '1210',
                icon: ''
            }, {
                code: '1213',
                name: '发货预警',
                url: '/order/orderManager/warning',
                parentCode: '1210',
                icon: ''
            }]
        }, {
            code: '1220',
            name: '单据管理',
            url: '/order/docket',
            parentCode: '1200',
            icon: '',
            children: [{
                code: '1221',
                name: '收款单列表',
                url: '/order/docket/collection/list',
                parentCode: '1210',
                icon: ''
            }, {
                code: '1222',
                name: '发货单列表',
                url: '/order/docket/deliveries/list',
                parentCode: '1210',
                icon: ''
            }]
        }, {
            code: '1230',
            name: '配送管理',
            url: '/order/distribution',
            parentCode: '1200',
            icon: '',
            children: [{
                code: '1231',
                name: '快递公司',
                url: '/order/distribution/express/list',
                parentCode: '1230',
                icon: ''
            }, {
                code: '1232',
                name: '运费设置',
                url: '/order/distribution/freight/setting',
                parentCode: '1230',
                icon: ''
            }]
        }, {
            code: '1240',
            name: '售后管理',
            url: '/order/afterSale',
            parentCode: '1200',
            icon: '',
            children: [{
                code: '1241',
                name: '退款申请单',
                url: '/order/afterSale/moneyBack',
                parentCode: '1240',
                icon: ''
            }, {
                code: '1242',
                name: '退货申请单',
                url: '/order/afterSale/goodsBack',
                parentCode: '1240',
                icon: ''
            }, {
                code: '1243',
                name: '换货申请单',
                url: '/order/afterSale/goodsExchange',
                parentCode: '1240',
                icon: ''
            }, {
                code: '1244',
                name: '退换货/取消原因',
                url: '/order/afterSale/reason',
                parentCode: '1240',
                icon: ''
            }]

        }]

    },
    {
        code: '1300',
        name: '财务与统计',
        url: '/finance',
        parentCode: '0',
        icon: ''
    },
    {
        code: '1400',
        name: '大电商',
        url: '/eshop',
        parentCode: '0',
        icon: ''
    },
    {
        code: '1500',
        name: '服务中心',
        url: '/service',
        parentCode: '0',
        icon: '',
        children: [
            {
                code: '1510',
                name: '审核管理',
                url: '/service/review',
                parentCode: '1500',
                icon: '',
                children: [
                    {
                        code: '1511',
                        name: '审核列表',
                        url: '/service/review/list',
                        parentCode: '1510',
                        icon: ''
                    }
                ]
            }
        ]
    },
    {
        code: '1600',
        name: '系统管理',
        url: '/setting',
        parentCode: '0',
        icon: '',
        children: [
            {
                code: '1610',
                name: '网站管理',
                url: '/setting/site',
                parentCode: '1600',
                icon: '',
                children: [
                    {
                        code: '1611',
                        name: '导航设置',
                        url: '/setting/site/nav',
                        parentCode: '1610',
                        icon: ''
                    },
                    {
                        code: '1612',
                        name: '幻灯片设置',
                        url: '/setting/site/banner',
                        parentCode: '1610',
                        icon: ''
                    }
                ]
            },
            {
                code: '1620',
                name: '权限管理',
                url: '/setting/auth',
                parentCode: '1600',
                icon: '',
                children: [
                    {
                        code: '1621',
                        name: '管理员列表',
                        url: '/setting/auth/admin/list',
                        parentCode: '1620',
                        icon: ''
                    },
                    {
                        code: '1623',
                        name: '角色列表',
                        url: '/setting/auth/role/list',
                        parentCode: '1620',
                        icon: ''
                    },
                    {
                        code: '1624',
                        name: '角色添加',
                        url: '/setting/auth/role/add',
                        parentCode: '1620',
                        icon: ''
                    }
                ]
            },
            {
                code: '1630',
                name: '秒杀管理',
                url: '/setting/seckill',
                parentCode: '1600',
                icon: '',
                children: [
                    {
                        code: '1631',
                        name: '秒杀列表',
                        url: '/setting/seckill/list',
                        parentCode: '1630',
                        icon: ''
                    },
                    {
                        code: '1632',
                        name: '添加秒杀',
                        url: '/setting/seckill/add',
                        parentCode: '1630',
                        icon: ''
                    },
                    {
                        code: '1633',
                        name: '秒杀统计',
                        url: '/setting/seckill/stat',
                        parentCode: '1630',
                        icon: ''
                    }
                ]
            },
            {
                code: '1640',
                name: '关键字管理',
                url: '/setting/keywords',
                parentCode: '1600',
                icon: '',
                children: [
                    {
                        code: '1641',
                        name: '关键字列表',
                        url: '/setting/keywords/list',
                        parentCode: '1640',
                        icon: ''
                    },
                    {
                        code: '1642',
                        name: '关键字添加',
                        url: '/setting/keywords/add',
                        parentCode: '1640',
                        icon: ''
                    },
                    {
                        code: '1643',
                        name: '关键字统计',
                        url: '/setting/keywords/stat',
                        parentCode: '1640',
                        icon: ''
                    }
                ]
            }
        ]
    }
]

export default {
    state: {
        sidebar: {
            opened: !+localStorage.getItem(key.sidebar),
            topNav: initMenus,
            activeTopNav: localStorage.getItem(key.activeTopNav),
            menus: JSON.parse(localStorage.getItem(key.menus)) || []
        },
        breadcrumbs: JSON.parse(sessionStorage.getItem(key.breadcrumbs)) || []
    },
    mutations: {
        [TOGGLE_SIDEBAR](state) {
            state.sidebar.opened = !state.sidebar.opened
            localStorage.setItem(key.sidebar, state.sidebar.opened ? 1 : 0)
        },
        [INIT_SIDEBAR_MENUS](state, list) {
            state.sidebar.menus = list
            localStorage.setItem(key.menus, JSON.stringify(list))
        },
        [INIT_BREADCRUMB](state, list) {
            state.breadcrumbs = list
            sessionStorage.setItem(key.breadcrumbs, JSON.stringify(list))
        },
        [ACTIVE_TOP_NAV](state, index) {
            state.sidebar.activeTopNav = index
            localStorage.setItem(key.activeTopNav, index)
        }
    },
    actions: {
        [TOGGLE_SIDEBAR]({ commit }) {
            commit(TOGGLE_SIDEBAR)
        },
        [INIT_SIDEBAR_MENUS]({ commit }, list) {
            commit(INIT_SIDEBAR_MENUS, list)
        },
        [INIT_BREADCRUMB]({ commit }, list) {
            commit(INIT_BREADCRUMB, list)
        },
        [ACTIVE_TOP_NAV]({ commit }, index) {
            commit(ACTIVE_TOP_NAV, index)
        }
    }
}
