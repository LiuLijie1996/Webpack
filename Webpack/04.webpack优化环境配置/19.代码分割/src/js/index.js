/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法，能将某个文件单独打包

  webpackChunkName: 'test'  给文件重命名
*/
import(/* webpackChunkName: 'test' */"./index2").then(res => {
  console.log(res);
})