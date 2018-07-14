import Vue from 'vue'

export const isServer = Vue.prototype.$isServer
export const bus = new Vue()

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
export const throttle = function(func, wait, options) {
    let context, args, result
    let timeout = null
    let previous = 0
    if (!options) options = {}
    let later = function() {
        previous = options.leading === false ? 0 : +new Date()
        timeout = null
        result = func.apply(context, args)
        if (!timeout) context = args = null
    }
    return function() {
        let now = +new Date()
        if (!previous && options.leading === false) previous = now
        let remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            result = func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining)
        }
        return result
    }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export const debounce = function(func, wait, immediate) {
    let timeout, args, context, timestamp, result
    let later = function() {
        let last = +new Date() - timestamp

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }
    return function() {
        context = this
        args = arguments
        timestamp = +new Date()
        let callNow = immediate && !timeout
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }
        return result
    }
}

/**
 * 清除对象中值为空的属性
 *
 * @param {Object} 需要清理的对象
 * @returns {Object} 清理后的对象
 */
export const cleanParams = data => {
    const p = {}
    Object.keys(data).forEach(key => {
        const obj = data[key]
        if (obj !== '') {
            p[key] = obj
        }
    })
    return p
}

/**
 * 格式化日期时间字符串
 *
 * @param {Object} d Date对象
 * @param {String} format 格式pattern，默认为'yyyy-MM-dd'，常用格式比如：'yyyy-MM-dd hh:mm:ss'
 * @returns {String} 格式化后的字符串
 */
export const formatDateStr = (d, format = 'yyyy-MM-dd') => {
    if (!d || !d.getTime) return '';
    const o = {
        'M+': d.getMonth() + 1, // month
        'd+': d.getDate(), // day
        'h+': d.getHours(), // hour
        'm+': d.getMinutes(), // minute
        's+': d.getSeconds(), // second
        'q+': Math.floor((d.getMonth() + 3) / 3), // quarter
        S: d.getMilliseconds() // millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (d.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    Object.keys(o).forEach(k => {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    });
    return format;
};

/**
 * 生成随机字符串
 *
 * @param {Number} 字符串长度，默认32
 * @returns {String}
 */
export const randomString = len => {
    len = len || 32
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const res = []
    for (let i = 0; i < len; i++) {
        res.push(chars.charAt(Math.floor(Math.random() * chars.length)))
    }
    return res.join('')
}
