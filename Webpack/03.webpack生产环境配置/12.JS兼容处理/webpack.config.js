let path = require("path");
let HtmlWebapckPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/index.js",//入口文件
  output: {
    filename: "js/index.js",//输出后的js文件名称
    path: path.resolve(__dirname, "build"),//项目输出路径
  },

  // loader配置
  module: {
    rules: [
      {
        test: /\.(css|scss)/,
        use: [
          MiniCssExtractPlugin.loader,//将css代码从js中抽离
          "css-loader",//将css添加到js中
          {
            loader: "postcss-loader",//配置css兼容前缀
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

      /*
        js兼容性处理：npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack --save-dev
          1、基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，高级语法不能转换
          2、全部js兼容性处理 --> @babel/polyfill
            问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
          3、需要做兼容性处理的再做：按需加载  --> core-js
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // 按需加载
                  useBuiltIns: "usage",
                  // 指定core-js版本
                  corejs: {
                    version: 3,
                  },
                  // 指定兼容性做到哪个版本浏览器
                  targets: {
                    chrome: "60",
                    firefox: "60",
                    ie: "9",
                    safari: "10",
                    edge: "17",
                  }
                }
              ]
            ],
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebapckPlugin({
      template: "./src/index.html",//模板文件路径
      filename: "index.html",//输出后的文件名称
    }),

    // 处理css兼容
    new MiniCssExtractPlugin({
      filename: "css/index.css",//输出后的css文件名
    }),
  ],
  mode: "development",
}