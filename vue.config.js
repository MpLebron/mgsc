const { defineConfig } = require('@vue/cli-service')
var webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ],
    //chunks: ['manifest', 'vendor', 'app'],
    resolve: {
      alias: {
        jquery: "jquery/src/jquery",
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8087/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  }
})
