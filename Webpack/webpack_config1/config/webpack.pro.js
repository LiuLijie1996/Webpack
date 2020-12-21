//引入webpack-merge， 用来合并配置的
const {merge} = require('webpack-merge');
const CopyWebpackPlugin = require("copy-webpack-plugin");
//引入公共配置
const baseConfig = require("./webpack.base");

const proConfig = {
    mode: "production",

    plugins: [
        // 拷贝文件
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../static'), //需要打包的静态资源地址
                to: path.resolve(__dirname, "../build"), //将静态资源打包到build下面
            }]
        }),
    ],
}

//合并配置并导出
module.exports = merge(baseConfig, proConfig);