/*
  1、eslint不认识 window、navigator全局变量
    解决：需要修改 package.json 中 eslinkConfig 配置
      "eslintConfig": {
        "extends": "airbnb-base",
        "env":{
          "browser": true //支持浏览器全局变量
        }
      }
    
  2、SW代码必须运行在服务器上
      npm install serve -g
        serve -s build 启动本地服务器，将build目录下的所有资源作为静态资源暴露出去
*/

// 注册 serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register("/service-worker.js").then(registration => {
      console.log('sw注册成功了');
    }).catch(registrationError => {
      console.log('sw注册失败了');
    })
  })
}