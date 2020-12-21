const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");
const app = express();

//引入webpack包，和webpack-dev-middleware包
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");

//导入webpack的配置
const config = require("./config/webpack.dev");
//将配置传入webpack中,返回编译器
const compiler = webpack(config);

//使用中间件, 将编译器放入middleware中进行解析
app.use(middleware(compiler));

//解析前端发送的post请求
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());//如果前端通过axios发送的数据，这段必须写

// 开放静态目录
app.use(express.static("./static"));

app.all("*", function(req, res) {
    let reqData = {...req.body, ...req.query};
    let options = {
        url: 'http://www.baidu.com' + req.url,
        method: req.method,
        form: reqData,
    };

    request(options, function(err, resolve, body) {
        try {
            res.send({
                code: 200,
                data: JSON.parse(body),
            })
        } catch (error) {
            res.send(body)
        }
    });
});

// 监听端口
app.listen(3000, function () {
    console.log('server is running');
});