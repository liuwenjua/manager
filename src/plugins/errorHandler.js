export default function(handler) {
    if (typeof handler !== 'function') throw new TypeError('parameter handler is not a function')
    return {
        install: (vue, options) => {
            vue.mixin({
                beforeCreate() {
                    const methods = this.$options.methods || {}
                    Object.keys(methods).forEach(key => {
                        const fn = methods[key]
                        this.$options.methods[key] = function(...args) {
                            const ret = fn.apply(this, args)
                            if (ret && typeof ret.catch === 'function') {
                                return ret.catch(handler)
                            } else {
                                return ret
                            }
                        }
                    })
                }
            })
        }
    }
}
