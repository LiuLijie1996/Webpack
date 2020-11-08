/*
  HMR：hot module replacement 热模块替换 / 模块热替换
    作用：一个模块化发生变化，只会重新打包这一个模块，而不是打包所有

    样式文件：可以使用HMR功能：因为style-loader内部实现了
    js文件：默认不能使用HMR功能,需要修改js代码
    html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新了
      解决：修改entry入口，将html文件引入
*/


let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
  entry: "./src/js/index.js",//入口文件
  // 输出
  output: {
    filename: "js/index.js",//输出后的文件名
    path: path.resolve(__dirname, "build"),//输出的地址
  },

  // loader配置
  module: {
    rules: [
      // css解析器
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",//在html文件的head中生产style标签
          "css-loader",//将css代码插入js中
          // css兼容
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

      // js语法检查
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,//自动修复
        }
      },

      // js语法兼容
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          // 预设
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
                // 指定兼容性做到哪个版本的浏览器
                targets: {
                  chrome: "60",
                  firefox: "50",
                }
              }
            ]
          ]
        }
      },

      // 图片解析器
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,//小于该大小时，将图片改成base64格式
          name: "[hash:10].[ext]",//图片名称
          outputPath: "images",//输出后存放的目录
          esModule: false,//关闭url-loader的es6的模块化
          publicPath: "/images",//公共路径
        }
      },
      // html中的图片解析器
      {
        test: /\.html$/,
        loader: "html-loader",
      },

      // 其他文件解析器
      {
        exclude: /\.(js|css|scss|html|jpg|jpeg|png|gif)$/,
        loader: "file-loader",
        options: {
          outputPath: "media",//输出后存放的目录
        }
      }
    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",//模板文件
      filename: "index.html",//输出后的文件名称
    }),

    // 压缩css代码
    new OptimizeCssAssetsWebpackPlugin(),
  ],

  // 模式
  mode: "development",

  // 开启本地服务
  devServer: {
    //需要运行的项目地址
    contentBase: path.resolve(__dirname, "build"),
    //端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 压缩代码
    compress: true,
    hot: true,
  }
}