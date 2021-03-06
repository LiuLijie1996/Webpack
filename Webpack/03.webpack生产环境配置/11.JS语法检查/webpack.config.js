let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/index.js",//入口文件
  // 输出
  output: {
    filename: "js/index.js",//输出后的js文件名称
    path: path.resolve(__dirname, "build"),//输出的文件地址
  },

  // loader配置
  module: {
    rules: [
      {
        test: /\.(css|scss)/,
        use: [
          // 将css从js文件中抽离出来
          MiniCssExtractPlugin.loader,
          "css-loader",//将css添加到js中
          {
            // 配置css兼容前缀
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")(),
              ]
            }
          },
          "sass-loader",//将scss代码改成css
        ]
      },

      /*
        语法检查：
          下载：eslint-loader eslint
          注意：只检测自己写的代码，第三方的库不用检查
          下载airbnb语法规则：eslint-config-airbnb-base eslint-plugin-import
          设置检查规则：package.json中找到eslintConfig中设置
              "eslintConfig":{
                "extends":"airbnb-base"
              }
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,//排除node_modules中的语法检查
        loader: "eslint-loader",
        options: {
          // 自动修复
          fix: true,
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",//模板文件地址
      filename: "index.html",//输出后的html文件名
    }),

    new MiniCssExtractPlugin({
      filename: "css/index.css",//输出后的css文件名称
    }),
  ],
  mode: "development",
}