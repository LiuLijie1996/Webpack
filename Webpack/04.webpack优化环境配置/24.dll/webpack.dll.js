/*
  使用 dll 技术，对第三方库进行单独打包
    当运行 webpack 时,默认查找 webpack.config.js 配置文件
    需求: 需要 webpack.dll.js 文件
      webpack --config webpack.dll.js

*/
let path = require('path');
let webpack = require("webpack");

module.exports = {
  // 入口文件
  entry: {
    // 最终打包生成的 [name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery'],
  },

  // 输出
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dll"),
    library: '[name]_[hash]',// 打包的库里面向外暴漏出去的内容叫什么名字
  },

  plugins: [
    // 打包生成一个 manifest.json 文件,提供和jquery映射
    new webpack.DllPlugin({
      name: "[name]_[hash]",//映射库的暴漏的内容名称
      path: path.resolve(__dirname, "dll/manifest.json"),//输出文件路径
    }),
  ],

  mode: "production"
}