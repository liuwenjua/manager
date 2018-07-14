/**
 * 格式化时间
 *
 * @param {String} str
 * @returns {String} 格式化后的时间
 */
export const formatDate = (str) => {
    if (!str) return ''
    // ios下date.parse可能不起作用
    const s = str.split(/\D/)
    if (s.length < 6) {
        return str
    }
    const date = new Date()
    date.setFullYear(s[0])
    date.setMonth(parseInt(s[1], 10) - 1)
    date.setDate(s[2])
    date.setHours(s[3])
    date.setMinutes(s[4])
    date.setSeconds(s[5])
    const time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return ''
    } else if (time / 1000 < 30) {
        return '刚刚'
    } else if (time / 1000 < 60) {
        return parseInt(time / 1000, 10) + '秒前'
    } else if (time / 60000 < 60) {
        return parseInt(time / 60000, 10) + '分钟前'
    } else if (time / 3600000 < 24) {
        return parseInt(time / 3600000, 10) + '小时前'
    } else if (time / 86400000 < 31) {
        return parseInt(time / 86400000, 10) + '天前'
    } else if (time / 2592000000 < 12) {
        return parseInt(time / 2592000000, 10) + '个月前'
    } else {
        return parseInt(time / 31536000000, 10) + '年前'
    }
}

/**
 * 格式化日期时间字符串
 *
 * @param {Object} d Date对象
 * @param {String} format 格式pattern，默认为'yyyy-MM-dd'，常用格式比如：'yyyy-MM-dd hh:mm:ss'
 * @returns {String} 格式化后的字符串
 */
export const formatDateStr = (d, format = 'yyyy-MM-dd') => {
    if (!d || !d.getTime) return ''
    const o = {
        'M+': d.getMonth() + 1, // month
        'd+': d.getDate(), // day
        'h+': d.getHours(), // hour
        'm+': d.getMinutes(), // minute
        's+': d.getSeconds(), // second
        'q+': Math.floor((d.getMonth() + 3) / 3), // quarter
        'S': d.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    Object.keys(o).forEach(k => {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    })
    return format
}

/**
 * 获取文件扩展名
 *
 * @param {String} fileName 文件名
 * @returns {String} 文件扩展名
 */
export const filePostfix = function(fileName) {
    let pattern = /(.*)\.(.*)$/gi
    pattern.exec(fileName.toLowerCase())
    return RegExp.$2
}

/**
 * 按属性过滤数组中的对象
 *
 * @param {Array} items 数组
 * @param {Object} props 属性过滤条件对象
 * @param {Boolean} exactly 是否使用===判定， 默认false
 * @returns {Array} 过滤后的数组
 */
export const propsFilter = function(items, props, exactly) {
    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]'
        }
    }
    if (Array.isArray(items)) {
        const keys = Object.keys(props)
        return items.filter(function(item) {
            return keys.some(function(key) {
                if (exactly) {
                    return item[key] === props[key]
                } else {
                    const text = (props[key] + '').toLowerCase()
                    return item[key] && item[key].toString().toLowerCase().indexOf(text) > -1
                }
            })
        })
    } else {
        return items
    }
}

/**
 * String.prototype.slice 和 Array.prototype.slice 的封装
 *
 * @param {any} String or Array
 * @param {Integer} start index
 * @param {Integer} end index
 * @returns {any} String or Array
 */
export const slice = function(obj, start, end) {
    if (typeof obj.slice === 'function') {
        return obj.slice(start, end)
    }
}
