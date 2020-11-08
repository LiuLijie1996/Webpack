let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: "[hash:10].[ext]",
          publicPath: "./",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // 打包其他资源
      {
        exclude: /\.(html|css|scss|js)$/,
        loader: "file-loader",
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    // new CleanWebpackPlugin(),
  ],
  mode: "development",


  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包不会有任何输出
  // 安装：webpack-dev-server
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 需要运行的项目目录（项目构建后的路径）
    contentBase: path.resolve(__dirname, "build"),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  }
}