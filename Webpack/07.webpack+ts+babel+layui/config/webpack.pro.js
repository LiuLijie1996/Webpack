// 生产环境配置

const path = require("path");

//引入webpack-merge， 用来合并配置的
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require("copy-webpack-plugin");

//引入公共配置
const baseConfig = require("./webpack.base");

//设置生产环境的配置
const proConfig = {
    //生产环境
    mode: "production",

    plugins: [
        // 拷贝文件
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../static'), //打包的静态资源目录地址
                to: path.resolve(__dirname, "../build/dist"), //打包到build下面的dist
            }]
        }),
    ],
};
//合并配置并导出
module.exports = merge(baseConfig, proConfig);