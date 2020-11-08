let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",//入口文件
  output: {
    filename: "js/index.js",//输出后的js文件名
    path: path.resolve(__dirname, "build"),
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)/,
        use: [
          MiniCssExtractPlugin.loader,//取代 style-loader 将css代码从js代码中分离出来
          "css-loader",//将css代码添加到js文件中
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")(),
              ]
            },
          },
          "sass-loader",//将scss文件中的样式代码解析成css
        ]
      }
    ]
  },
  mode: "development",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",//html模板路径
      filename: "index.html",//输出后的html文件名
    }),

    new MiniCssExtractPlugin({
      filename: "css/index.css",//输出后的css文件名称
    }),

    // 压缩css代码
    new OptimizeCssAssetsWebpackPlugin(),
  ],
}