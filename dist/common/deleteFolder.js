"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var consola = require('consola');
exports.default = (function (name, path, url) {
    var files = [];
    // const u = path.join(__dirname, '../' + p)
    // const models = u + '/../models'
    var model = path.join(__dirname, '../../../../src/models/' + name + '.ts');
    if (fs.existsSync(model)) {
        fs.unlinkSync(model);
        consola.success('🆗 已删除model,请手动去index.ts移除model的引入.下一个版本上');
    }
    if (fs.existsSync(url)) {
        if (url.indexOf('.tsx') === -1 && url.indexOf('.scss') === -1) {
            files = fs.readdirSync(url);
            files.forEach(function (file, index) {
                var u = url + '/' + file;
                if (fs.statSync(u).isDirectory()) {
                    // recurse
                    deleteFolder(u);
                }
                else {
                    // delete file
                    fs.unlinkSync(u);
                }
            });
            fs.rmdirSync(url);
        }
        else {
            fs.unlinkSync(url);
        }
    }
});
