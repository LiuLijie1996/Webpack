let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let TerserWebpackPlugin = require("terser-webpack-plugin");

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

  // 开发服务器
  devServer: {
    // 运行代码的目录
    contentBase: path.resolve(__dirname, "build"),
    // 监视 contentBase 目录下的所有文件,一旦文件变化就会reload
    watchContentBase: true,
    // 监听配置
    watchOptions: {
      // 忽略文件,不进行监视
      ignored: /node_modules/
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: "localhost",
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏提示
    overlay: false,
    // 服务器代理 -->  解决开发环境跨域问题
    proxy: {
      // 一旦devServer(5000)服务器接收到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      "/api": {
        target: "http://localhost:3000",
        // 发送请求时，请求路径重写，将 /api/xxx  -->  /xxx (去掉/api)
        pathRewrite: {
          "^/api": "",
        },
      }
    }
  },

  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30 * 1024,//分割的chunk最小为30kb
      maxSize: 0,//最大没有限制
      minChunks: 1,//要提取的chunk最少被引用1次
      maxAsyncRequests: 5,//按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3,//入口js文件最大并行请求数量
      automaticNameDelimiter: "~",//名称连接符
      name: true,//可以使用命名规则
      cacheGroups: {//分割chunk的组

        // node_modules 文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上的公共规则，如：大小超过30kb，至少被引用一次
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10,
        },

        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true,
        },
      }
    },

    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },

    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true,
      }),
    ]
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
