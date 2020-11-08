let path = require("path")
let HtmlWebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
//将css代码装在文件中
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩打包后的css代码
let OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js"
    , path: path.resolve(__dirname, "build"),
  },

  // loader的配置
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      }
    ]
  },

  //插件的配置
  plugins: [
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所以资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 ./src/index.html 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: "./src/index.html",
      // 打包后文件的名字
      filename: "index.html",
    }),

    // 打包之前删除目标目录下的文件
    new CleanWebpackPlugin(),
  ],

  // 模式
  mode: "development",
}