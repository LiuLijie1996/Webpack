let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/index.js",//入口文件
  // 输出
  output: {
    filename: "js/index.js",//输出后的文件名称
    path: path.resolve(__dirname, "build"),//输出地址
  },

  // loader
  module: {
    rules: [
      // 处理css
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ]
      },
      // 图片解析
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: "[hash:10].[ext]",
          publicPath: "/images",//图片在业务代码中的路径
          outputPath: "images",//输出目录
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },

      // js兼容
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
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
          }
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",//模板文件地址
      filename: "index.html",//输出后的文件名称
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].css",//输出后的文件名
    }),
  ],

  externals: {
    // 忽略jQuery被打包进来，忽略后需要在html中自己引入一个cdn的jquery
    jquery: "jQuery",
  },

  mode: "development",
}