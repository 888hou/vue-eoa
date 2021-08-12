module.exports = {
  configureWebpack: {
    resolve: {
      alias: { //配置别名,修改后需要重新编译才能生效
        'assets': '@/assets',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
        'utils': '@/utils'
      }
    }
  },
  css: {
    loaderOptions: {
        sass: {
            prependData: `@import "assets/scss/variable.scss";`
        }
    }
  },

  // 代理
  // devServer: {
  //   host: 'localhost',
  //   port: 8080,
  //   proxy: {
  //     '/api': {
  //       target: 'https://localhost:5001',// 后端接口域名
  //       changeOrigin: true // 是否开启跨域
  //     }
  //   }
  // }

}