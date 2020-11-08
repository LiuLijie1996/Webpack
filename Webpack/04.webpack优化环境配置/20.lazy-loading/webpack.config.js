let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",//入口文件
  // 输出
  output: {
    filename: "js/index.js",//输出后的文件名
    path: path.resolve(__dirname, "build"),
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",//输出后的文件名
      template: "./src/index.html",//模板文件
    }),
  ],

  mode: "development",//打包模式
}