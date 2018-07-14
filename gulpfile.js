var gulp = require('gulp'),
    plugins = require('gulp-load-plugins'),
    $ = plugins(),
    argv = require('minimist')(process.argv.slice(2), {
        string: ['env', 'hash'],
        default: {
            env: 'dev',
            hash: 'no-hash'
        }
    }),
    config = require('./gulp.config.' + argv.env + '.js'),
    zipName = [config.name, '@', config.version, '-[', argv.hash, '].zip'].join(''),
    SSH = new $.ssh({
        ignoreErrors: false,
        sshConfig: config.ssh
    })

gulp.task('clean', function() {
    return gulp
        .src('dist/' + zipName, {
            read: false
        })
        .pipe($.rimraf({
            force: true
        }))
})

gulp.task('zip', ['clean'], function() {
    return gulp
        .src(['dist/**', '!dist/*.zip'])
        .pipe($.plumber())
        .pipe($.zip(zipName))
        .pipe(gulp.dest('dist'))
})

gulp.task('upload', function() {
    return gulp
        .src(['dist/**', '!dist/*.zip'])
        .pipe($.plumber())
        .pipe($.zip(zipName))
        .pipe(SSH.dest(config.remoteDir))
})

gulp.task('shell', function() {
    console.log('删除服务器上现有文件...')
    return SSH.shell(config.commands)
})

gulp.task('deploy', ['shell'], function() {
    return gulp
        .src(['dist/**', '!dist/*.zip'])
        .pipe($.plumber())
        .pipe(SSH.dest(config.remoteDir))
})

// gulp.task('default', $.sequence('zip', 'upload'))
gulp.task('default', ['upload'])
// how to use?
// gulp --env prod --hash xxxxxx
// gulp deploy
