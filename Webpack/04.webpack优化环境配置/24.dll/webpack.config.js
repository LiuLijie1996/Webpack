let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
let AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",//入口文件
  // 输出
  output: {
    filename: "js/index.js",//输出后的文件名称
    path: path.resolve(__dirname, "build"),//输出地址
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",//模板文件地址
      filename: "index.html",//输出后的文件名称
    }),

    // 告诉webpack哪些库不参与打包,同时使用时的名称也得改
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll/manifest.json'),
    }),

    // 将某个文件打包输出去,并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "dll/jquery.js"),
    }),
  ],

  mode: "production",
}