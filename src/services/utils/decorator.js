// npm install ajv babel-plugin-transform-decorators-legacy --save-dev
// add to .babelrc: "plugins": ["transform-decorators-legacy"]

export default function buried(include = []) {
    return function(target, name, descriptor) {
        if (target.methods) {
            for (let name in target.methods) {
                if (include.indexOf(name) < 0) {
                    continue
                }
                const fn = target.methods[name]
                target.methods[name] = function() {
                    const result = fn.apply(this, arguments)
                    console.log(target.name, name)
                    return result
                }
            }
        }
    }
}
