let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");


/*
  缓存：
    babel缓存
      cacheDirectory:true
        让第二次打包构建速度更快
    
    文件资源缓存：
      hash：每次webpack构建时会生成一个唯一的hash值
        问题：因为js和css同时使用一个hash值，如果重新打包，会导致所有缓存失效（我可能只改了一个文件）
      
      chunkhash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样
        问题：js和css的hash值还是一样的，因为css是在js中被引入的，所以同属于一个chunk

      contenthash：根据文件的内容生成hash值，不同文件hash值一定不一样
*/


module.exports = {
  entry: "./src/js/index.js",//入口文件
  // 输出
  output: {
    filename: "js/index.[contenthash:10].js",//输出后的js文件名称
    path: path.resolve(__dirname, "dist"),//输出地址
  },

  // loader配置
  module: {
    rules: [
      /*
        正常来讲，一个文件只能被一个loader处理，
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
          先执行eslint在执行babel
      */
      // 配置js语法检查
      {
        test: /\.js$/,
        exclude: /node_modules/,//排除node_modules中的文件
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,//自动修复
        }
      },

      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种文件
        oneOf: [
          {
            test: /\.(css|scss)$/,
            use: [
              MiniCssExtractPlugin.loader,//将css从js文件中抽离出来
              "css-loader",//将css代码插入js文件中
              {
                // 配置css兼容
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: () => [
                    require("postcss-preset-env")(),
                  ]
                }
              },
              // 将scss代码解析成css代码
              "sass-loader",
            ]
          },

          // js语法兼容
          {
            test: /\.js$/,
            exclude: /node_modules/,
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
                    // 指定兼容性做到哪个版本的浏览器
                    targets: {
                      chrome: "60",
                      firefox: "50",
                    }
                  }
                ]
              ],

              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true,
            }
          },

          // 解析图片
          {
            test: /\.(jpg|jpeg|png|gif)$/,
            loader: "url-loader",
            options: {
              limit: 8 * 1024,//小于这个大小时将图片转成base64
              name: "[hash:10].[ext]",//图片名称
              outputPath: "images",//输出目录
              esModule: false,//关闭url-loader的es6模块化，使用commonjs解析
              publicPath: "/images",//公共路径
            }
          },

          // 解析html文件中的图片
          {
            test: /\.html$/,
            loader: "html-loader"
          },

          // 解析其他文件
          {
            exclude: /\.(jpg|jpeg|png|gif|js|css|html|scss)$/,
            loader: "file-loader",
            options: {
              outputPath: "media",//输出目录
            }
          },
        ]
      }
    ],

  },
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",//模板文件地址
      filename: "index.html",//输出后的文件名称
      minify: {
        collapseWhitespace: true,//移除空格
        removeComments: true,//移除注释
      },
    }),

    // 压缩css代码
    new OptimizeCssAssetsWebpackPlugin(),

    // 配置css文件
    new MiniCssExtractPlugin({
      filename: "css/index.[contenthash:10].css",//输出后的文件名称
    }),
  ],

  // 生产模式
  mode: "production",

  // 开启本地服务：npx webpack-dev-server
  devServer: {
    // 需要运行的项目目录（项目构建后的路径）
    contentBase: path.resolve(__dirname, "dist"),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  }
}