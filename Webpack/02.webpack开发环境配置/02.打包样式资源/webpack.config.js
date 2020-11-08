/*
  webpack.config.js   webpack的配置文件
    作用：指示webpack干哪些活
*/
let path = require("path");

module.exports = {
  // 入口起点
  entry: "./src/index.js",

  // 输出
  output: {
    // 输出的文件名
    filename: "built.js",
    // 输出的路径
    path: path.resolve(__dirname, "build")
  },

  // loader的配置
  module: {
    rules: [
      // 详细的loader配置
      // 不同文件必须配置不同loader处理

      {
        // 匹配哪些文件
        test: /\.css/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序，从下到上依次执行
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        // 匹配哪些文件
        test: /\.less/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序，从下到上依次执行
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader',
          // 将less文件编译成css文件,需要下载 less-loader 和 less
          'less-loader',
        ]
      },
      {
        // 匹配哪些文件
        test: /\.scss/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序，从下到上依次执行
          // 创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader',
          // 将scss文件编译成css文件,需要下载 sass-loader 和 node-sass
          'sass-loader',
        ]
      }
    ]
  },

  // plugins的配置
  plugins: [
    // 详细的plugins的配置
  ],

  // 打包模式
  mode: "development",
}