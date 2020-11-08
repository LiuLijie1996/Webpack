let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",//入口文件
  output: {
    filename: "js/index.js",//输出后的js文件名
    path: path.resolve(__dirname, "build"),//打包后的输出地址
  },

  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          // "style-loader",//创建style标签，将样式放入html中

          // 这个loader取代 style-loader，作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          "css-loader",//将css文件整合到js文件中
          "sass-loader",//将sass文件解析成css
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",//模板文件地址
      filename: "index.html",//输出后的文件名
    }),

    // 将打包的css从js中提取出来，存放在单独的css文件中
    new MiniCssExtractPlugin({
      filename: "css/index.css",//输出后的css文件名称
    }),

    // 压缩css代码
    new OptimizeCssAssetsPlugin(),
  ],
  mode: "development",

  devServer: {
    // 是否自动打开浏览器
    open: true,
    // 设置服务端口
    port: 3000,
    // 需要运行的项目目录（项目构建后的路径）
    contentBase: path.resolve(__dirname, "build"),
  }
}