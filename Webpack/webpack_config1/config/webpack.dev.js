const path = require("path");
//引入webpack-merge， 用来合并配置的
const {merge} = require('webpack-merge');
//引入公共配置
const baseConfig = require("./webpack.base");

const devConfig = {
    mode: "development",
}

//合并配置并导出
module.exports = merge(baseConfig, devConfig);