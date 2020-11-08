let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",//单入口

  // 输出
  output: {
    //设置打包后的js文件存放的文件夹和名字
    //这里的js文件名不能是规定好的名字，必须使用类似于 [name] 的占位符
    //因为打包后会生成多个js文件，如果名字都一样肯定是不行的
    filename: "js/[name].[contenthash:10].js",//输出后的js文件名称

    //打包后的输出地址
    path: path.resolve(__dirname, "dist"),
  },

  // 插件配置
  plugins: [
    //使用多少次HtmlWebpackPlugin插件就会生成多少个html文件
    new HtmlWebpackPlugin({
      //模板文件
      template: "./src/index.html",
      //打包后文件的名字
      filename: "index.html",

      minify: {
        collapseWhitespace: true,//移除空格
        removeComments: true,//移除注释
      },
    }),
  ],

  /*
    1、可以将 node_modules 中代码单独打包一个chunk最终输出
    2、自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },

  mode: "production",
}