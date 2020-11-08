let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let WorkboxWebpackPlugin = require("workbox-webpack-plugin");

/*
  PWA：渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin
*/

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


    new WorkboxWebpackPlugin.GenerateSW({
      /*
        生成一个 serviceworker 配置文件
      */
      skipWaiting: true, // 强制等待中的 Service Worker 被激活
      clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
    })
  ],
}