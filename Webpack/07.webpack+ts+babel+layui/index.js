const express = require("express");
const app = express();

// 开放静态目录
app.use(express.static("./static"));
// 监听端口
app.listen(80, function() {
    console.log('server is running');
})