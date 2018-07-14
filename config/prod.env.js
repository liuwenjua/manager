'use strict'
const path = process.argv[2]
module.exports = {
    NODE_ENV: '"production"',
    API_HOST: '""',
    SYSTEM_NAME: '"wq-mis"',
    VERSION_TAG: '"' + process.env.npm_package_version + '"',
    APP_DOMAIN: `"http://39.105.83.86${path}"`
}
