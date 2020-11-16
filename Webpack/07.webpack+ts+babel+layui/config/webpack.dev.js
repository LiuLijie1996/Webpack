// 开发环境配置

const path = require("path");
//引入webpack-merge， 用来合并配置的
const { merge } = require('webpack-merge');
//引入公共配置
const baseConfig = require("./webpack.base");

//设置开发环境的配置
let devConfig = {
    mode: "development",

    watchOptions: {
        poll: 1000 // 每秒检查一次变动
    },

    // 本地服务
    // devServer: {
    //     contentBase: path.resolve(__dirname, "../build"),
    //     compress: true,
    //     port: 3000,
    //     hot: true,
    //     // useLocalIp: true,
    //     // watchContentBase: true,
    //     // 服务器代理 -->  解决开发环境跨域问题
    //     proxy: {
    //         "/dist": {
    //             target: "http://localhost",
    //             // 发送请求时，请求路径重写，将 /api/xxx  -->  /xxx (去掉/layui)
    //             pathRewrite: {
    //                 "^/dist": "",
    //             },
    //         }
    //     },
    //     open:true,
    // }
};
//合并配置并导出
module.exports = merge(baseConfig, devConfig);
