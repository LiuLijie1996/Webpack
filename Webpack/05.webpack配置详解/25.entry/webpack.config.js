let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");


/*
  entry  入口起点
    1、string  -->  "./src/index.js"
      打包形成一个chunk，输出一个bundle文件
      打包输出后chunk的名称默认是main
      
    2、array  -->  ["./src/index.js", "./src/add.js"]
      多入口
      所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
        只有在HMR功能中让html热更新失效

    3、object
      多入口
      有几个入口文件就形成几个chunk，输出几个bundle文件
      此时chunk的名称是 key
      
*/


module.exports = {
  // 入口文件
  // entry: "./src/index.js",

  // entry: ["./src/index.js", "./src/add.js"],

  entry: {
    // key值是文件输出后的文件名，value值是入口文件地址
    index: ["./src/index.js", "./src/count.js"],//两个入口文件只会形成一个chunk
    add: "./src/add.js",
  },

  // 输出
  output: {
    filename: "[name].js",//输出后的文件名称,默认是main
    path: path.resolve(__dirname, "build"),//项目的输出目录
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin(),
  ],

  mode: "development",
}
