const path = require("path");
const fs = require("fs");
let tsPath = path.resolve(__dirname, "../src/ts");

let files = fs.readdirSync(tsPath);
let entry = {};
files.forEach(file => {
    var stat = fs.statSync(path.resolve(tsPath, file));
    if (stat.isFile()) {
        let fileName = file.split(".ts")[0];
        entry[fileName] = "./src/ts/" + file;
    }
})

module.exports = entry;