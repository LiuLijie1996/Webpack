let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 设置node环境变量
// process.env.NODE_ENV = "development";//开发环境

module.exports = {
  entry: "./src/js/index.js",//入口文件

  // 输出
  output: {
    filename: "js/index.js",//输出后的文件名
    path: path.resolve(__dirname, "build"),//输出目录
  },

  // loader配置
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          // 将css代码从js文件中分离处理
          MiniCssExtractPlugin.loader,
          "css-loader",//将css代码放进js中

          // 使用 postcss-loader 默认配置
          // "postcss-loader",

          /*
            自定义 postcss-loader 配置
            帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
          */
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")(),
              ]
            }
          },
          "sass-loader",
        ]
      },
    ]
  },

  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",//html模板文件地址
      filename: "index.html",//输出后的文件名
    }),
    // css插件，将js文件中的css代码单独放在一个css文件中
    new MiniCssExtractPlugin({
      filename: "css/index.css",//输出后的文件名
    }),
  ],

  mode: "development",
}