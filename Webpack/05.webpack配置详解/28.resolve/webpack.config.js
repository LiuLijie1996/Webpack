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

  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名：有点简写路径，缺点路径没有提示
    alias: {
      $css: path.resolve(__dirname, "src/css"),
    },

    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.css'],

    // 告诉webpack解析模块时去找哪个目录
    modules: [
      path.resolve(__dirname, "../../node_modules"),
      'node_modules'
    ],
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
    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin(),
  ],

  mode: "development",
}
