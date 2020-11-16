const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
let fileLog = require("./fileLog.json") || [];

/*-------webpack--------*/
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const config = require("./config/webpack.dev.js");//导入webpack的配置
const compiler = webpack(config);//将配置传入webpack中,返回编译器
app.use(middleware(compiler));//使用中间件, 将编译器放入middleware中进行解析
/*-------END--------*/

// 开放静态目录
app.use(express.static("./static"));
// 监听端口
app.listen(8080, function () {
    console.log('server is running');
});


/*------------路径变量------------*/
//模板目录路径
let viewsPath = path.resolve(__dirname, "src/views");
//ts目录路径
let tsPath = path.resolve(__dirname, "src/ts");
//scss目录路径
let scssPath = path.resolve(__dirname, "src/scss");
//创建文件的日志 的文件路径
let fileLogPath = path.resolve(__dirname, "fileLog.json");
/*-------END--------*/


//获取模板目录中的所有文件名
let preFiles = fs.readdirSync(viewsPath);


//监听模板目录的变化
let time = 0;
fs.watch(viewsPath, function (event, filename) {
    if (new Date().getTime() - time > 1000) {
        // 如果该文件不存在之前的模板目录中，说明是新建的
        if (!preFiles.includes(filename)) {
            // 创建和html相同名称的scss和ts文件
            let fileName = filename.split(".html")[0];
            // 创建和html相同名称的scss和ts文件
            CreateFile(fileName);
            //记录本次创建文件的信息
            writeCreateInfo(filename);
        }

        //如果本次改动的文件不在views目录中说明是删除了
        if (!fs.readdirSync(viewsPath).includes(filename)) {
            //记录本次删除文件的信息
            writeDeleteInfo(filename);
        }

        // 更新上次记录的html文件数组
        preFiles = fs.readdirSync(viewsPath);

        //更新时间
        time = new Date().getTime();
    }
});

// 创建和html相同名称的scss和ts文件
function CreateFile(filename) {
    /*新建ts文件*/
    fs.writeFileSync(tsPath + `/${filename}.ts`, '');
    /*新建scss文件*/
    fs.writeFileSync(scssPath + `/${filename}.scss`, '');
}

//记录本次创建文件的信息
function writeCreateInfo(filename) {
    //添加一条数据
    fileLog.push({
        filename,
        date: new Date().getTime(),
        type: "create",
    });

    //写入内容
    fs.writeFileSync(fileLogPath, JSON.stringify(fileLog));
}

//记录本次删除文件的信息
function writeDeleteInfo(filename) {
    //添加一条数据
    fileLog.push({
        filename,
        date: new Date().getTime(),
        type: "delete",
    });

    //写入内容
    fs.writeFileSync(fileLogPath, JSON.stringify(fileLog));
}
