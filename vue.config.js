const path = require('path')
// import path from 'path'
const lessPath = path.join(__dirname, './src/style/theme.less')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${lessPath}";`
          }
        }
      }
    }
  },
  outputDir: 'wangyiyun',
  publicPath: process.env.NODE_ENV === 'production' ? '/wangyiyun/' : '/'
})
