/*
  source-map 是一种提供源代码到构建后代码映射技术，如果构建后代码出错了，通过映射可以追踪源代码错误

  devtool:
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map  外部
      错误代码准确信息 和 源代码的错误位置

    inline-source-map  内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置

    hidden-source-map  外部
      错误代码，错误原因，但是没有错误位置
      不能追踪到源代码错误，只能提示到构建后代码的错误位置

    eval-source-map  内联
      1、每一个文件都生成对应的source-map，都在eval

    nosources-source-map  外部
      错误代码准确信息,但是没有任何源代码信息

    cheap-source-map  外部
      错误代码准确信息 和 源代码的错误位置
      只能精确到行

    cheap-module-source-map  外部
      错误代码准确信息 和 源代码的错误位置
      module会将loader的source map加入

    内联 和 外部的区别：
      1、外部生成了文件，内联没有
      2、内联构建速度更快

  开发环境：速度要快，调试要友好
    速度快：
      eval-cheap-souce-map
      eval-souce-map

    调试友好：
      souce-map
      cheap-module-souce-map
      cheap-souce-map

    最终：eval-source-map / eval-cheap-module-souce-map

  生产环境：源代码要不要隐藏？调试要不要更友好
    内联会让代码体积变大，所以在生产环境不用内联
    nosources-source-map  全部隐藏
    hidden-source-map  只隐藏源代码，会提示构建后代码错误信息

    最终：source-map  /  cheap-module-souce-map
*/

let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",//打包模式

  devtool: "source-map",

  entry: "./src/js/index.js",//入口文件
  // 输出
  output: {
    filename: "js/index.js",//输出后的文件名
    path: path.resolve(__dirname, "build"),
  },

  // loader配置
  module: {
    rules: [
      {
        test: /\.(css|scss)/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")(),
              ]
            }
          },
          "sass-loader",//将scss代码解析成css
        ]
      },

      // 解析图片文件
      {
        test: /\.(jpg|png|gif)/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          esModule: false,//关闭es6模块化
          name: "[hash:10].[ext]",
          publicPath: "/images",
          outputPath: "images",//输出目录
        }
      },

      // 处理html中的图片
      {
        test: /\.html/,
        loader: "html-loader",
      },

      // js兼容
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
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
            ]
          }
        },
      },
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",//输出后的文件名
      template: "./src/index.html",//模板文件
    }),

    new MiniCssExtractPlugin({
      filename: "css/index.css",//输出后的文件名
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  }
}