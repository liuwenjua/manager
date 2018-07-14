'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (options.usePostCSS) {
      loaders.push(postcssLoader)
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
const merge = require('webpack-merge')

const getFolderAndFile = function(path) {
  const pattern = /pages\/(.*)\/(.*)\.(.*)$/
  pattern.exec(path)
  return {
    folder: RegExp.$1,
    filename: RegExp.$2
  }
}

let entriesMap // 多页面入口配置
let htmlPluginList // 多页面输出HtmlWebpackPlugin配置

// 读取pages所有子文件夹下的js文件
exports.entries = function() {
  if (entriesMap) {
    return entriesMap
  }
  const entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  entriesMap = entryFiles.reduce((m, path) => {
    const { filename } = getFolderAndFile(path)
    if (filename !== undefined) {
      m[filename] = path
    }
    return m
  }, {})
  return entriesMap
}

// 读取pages所有子文件夹下的html文件
exports.htmlPlugin = function() {
  if (htmlPluginList) {
    return htmlPluginList
  }
  const entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  htmlPluginList = entryHtml.reduce((arr, path) => {
    const { filename } = getFolderAndFile(path)
    if (filename !== undefined) {
      let conf = {
        template: path,
        filename: filename + '.html',
        // Filtering Chunks
        chunks: ['manifest', 'vendor', filename],
        inject: true
      }
      if (process.env.NODE_ENV === 'production') {
        conf = merge(conf, {
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
      }
      return arr.concat(new HtmlWebpackPlugin(conf))
    }
    return arr
  }, [])
  return htmlPluginList
}
