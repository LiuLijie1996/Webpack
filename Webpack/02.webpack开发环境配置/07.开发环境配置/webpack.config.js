let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",//入口文件
  output: {
    filename: "js/index.js",//输出后的文件名
    path: path.resolve(__dirname, "build"),//输出地址
  },

  // loader的配置
  module: {
    rules: [
      // 样式loader
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      },

      // 图片的loader
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,//8kb之内的图片可以被编译成base64的格式
          // 关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          name: "[hash:10].[ext]",//图片名称
          outputPath: "images",//图片的存放目录
        }
      },

      {
        test: /\.html$/,
        // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
        loader: "html-loader",
      },

      // 其他文件编译
      {
        exclude: /\.(html|css|scss|js|jpg|jpeg|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",//文件名称
          outputPath: "font",//文件存放目录
        }
      },
    ]
  },
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",//html模板文件地址
    }),

    new CleanWebpackPlugin(),
  ],

  mode: "development",

  // 开启本地服务
  devServer: {
    // 需要运行的项目目录（项目构建后的路径）
    contentBase: path.resolve(__dirname, "build"),
    compress: true,//是否启动压缩
    port: 3000,//端口号
    open: true,//是否自动打开浏览器
  }
}