/*
  运行指令：
    开发环境(代码不会被压缩)：webpack ./src/index.js -o ./build --mode=development
    生成环境(代码会被压缩)：webpack ./src/index.js -o ./build --mode=production
      webpack会以 ./src/index.js 为入口文件，将文件打包到 ./build 文件中

  结论：
    webpack能处理 js/json，不能处理 css/img等其他资源
    生产环境和开发环境，将es6模块化编译成浏览器能识别的模块化
    生产环境比开发环境多一个压缩js代码
*/

import log from "./index2.js";

function add(a, b) {
  return a + b;
}
log();
console.log(add(1, 2))