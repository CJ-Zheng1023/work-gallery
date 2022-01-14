const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
  productionSourceMap: false,
  chainWebpack(config) {
    config.resolve.alias.set('@', resolve('src'))
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 5566
  }
}
