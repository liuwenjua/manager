var pkg = require('./package.json');

module.exports = {
    name: pkg.name,
    version: pkg.version,
    remoteDir: '/usr/share/nginx/html/web/' + pkg.name,
    ssh: {
        host: '39.105.83.86',
        port: 22,
        username: 'root',
        password: 'Wanqxdw123!+'
    },
    commands: [
        'rm -rf /usr/share/nginx/html/web/' + pkg.name + '/static/',
        'rm -f /usr/share/nginx/html/web/' + pkg.name + '/index.html'
    ]
};
