const path = require("path")
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
let viewsPath = path.resolve(__dirname, "../src/views");
let files = fs.readdirSync(viewsPath);

let htmlAll = [];
files.forEach(file => {
    htmlAll.push(
        new HtmlWebpackPlugin({
            template: "./src/views/" + file,
            filename: file, //输出后的html文件名称
            chunks: [file.split(".html")[0]]
        })
    );
});

module.exports = htmlAll;