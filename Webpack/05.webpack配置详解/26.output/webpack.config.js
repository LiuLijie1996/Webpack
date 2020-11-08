let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口文件
  entry: "./src/index.js",

  // 输出
  output: {
    // 文件名称（目录+指定名称）
    filename: "js/[name].js",
    // 输出文件目录（将来所有资源输出的公共目录）
    path: path.resolve(__dirname, "build"),
    // 所有资源引入公共路径前缀 -->  'images/a.jpg'  -->  '/images/a.jpg'
    pulicPath: "/",
    // 将非入口chunk进行重命名
    chunkFilename: "[name]_chunk.js",

    // 将整个库向外暴漏一个变量名，外部可以直接使用
    library: "[name]",

    // 变量名添加到window上（客户端）
    // libraryTarget: "window",

    // 变量名添加到global上（服务端node）
    // libraryTarget: "global",

    // 可以用commonjs引用
    libraryTarget: "commonjs",
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin(),
  ],

  mode: "development",
}
