let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.scss/,
        // 要使用多个loader处理，用use
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        // 问题：默认处理不了html中的img图片
        // 处理图片资源
        test: /\.(jpg|png|gif)/,
        // 使用一个loader
        loader: "url-loader",
        options: {
          /*
            图片小于8kb，就会被base64处理
              优点：减少请求数量（减轻服务器压力）
              缺点：图片体积会更大（文件请求速度更慢）
          */
          limit: 13 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析，并在output中添加 publicPath:'./'
          esModule: false,
          // 给图片进行重命名
          name: "[hash:10].[ext]",

          /*
          * [name]  使用原始的文件名
          * [ext]  使用原始的后缀
          * [path]  资源相对于 context的路径
          * [hash]  内容的哈希值; [hash:10]取图片的hash的前10位
          * [N]  当前文件名按照查询参数 regExp 匹配后获得到第 N 个匹配结果
          * */
          /*
            file-loader 使用解析：
              https://www.webpackjs.com/loaders/file-loader/#%E7%94%A8%E6%B3%95
          
            url-loader 使用解析：
              https://www.webpackjs.com/loaders/url-loader/
          */
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）,
        loader: "html-loader",
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new CleanWebpackPlugin(),
  ],

  mode: "development",
}