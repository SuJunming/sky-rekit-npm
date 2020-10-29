"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
exports.default = (function (path) {
    var files = [];
    if (fs.existsSync(path)) {
        if (path.indexOf('.tsx') === -1 && path.indexOf('.scss') === -1) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var u = path + '/' + file;
                if (fs.statSync(u).isDirectory()) {
                    // recurse
                    deleteFolder(u);
                }
                else {
                    // delete file
                    fs.unlinkSync(u);
                }
            });
            fs.rmdirSync(path);
        }
        else {
            fs.unlinkSync(path);
        }
    }
});
