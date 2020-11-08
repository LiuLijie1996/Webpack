let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
  // 入口文件
  entry: "./src/index.js",

  // 输出
  output: {
    // 文件名称（目录+指定名称）
    filename: "js/[name].js",
    // 输出文件目录（将来所有资源输出的公共目录）
    path: path.resolve(__dirname, "build"),
  },

  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: [
          'style-loader',
          'css-loader',
        ]
      },

      {
        test: /\.js$/,
        // 排除node_modules的js文件
        exclude: /node_modules/,
        // 只检测src下的js文件
        include: path.resolve(__dirname, "src"),
        // pre优先执行；post延后执行
        enforce: 'pre',
        // 单个loader直接用loader
        loader: "eslint-loader",
        // 配置
        options: {}
      },

      {
        // 以下配置只会生效一个
        oneOf: [
          //...
        ]
      },
    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin(),
  ],

  mode: "development",
}
