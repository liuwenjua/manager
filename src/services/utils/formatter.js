/**
 * 重新用来格式化element-ui table row>column 后台返回的object类型数据为string再显示在页面
 * @param {Object} 需要改造的对象
 * @returns {String} 改造后的字符串
 */
export const getFormats = (row, column) => {
    let str = ''
    if (row.specification.attr) {
        for (let key in row.specification.attr) {
            str += `${row.specification.attr[key]} `
        }
    }
    if (row.attr) {
        for (let key in row.attr) {
            str += `${row.attr[key]} `
        }
    }
    return str
}
export const getNames = (row, column) => {
    let str = ''
    if (row.specification.attr) {
        for (let key in row.specification.attr) {
            str += `${row.specification.attr[key]} `
        }
    }
    if (row.attr) {
        for (let key in row.attr) {
            str += `${row.attr[key]} `
        }
    }
    return `${row.specification.name} ${str}`
}
