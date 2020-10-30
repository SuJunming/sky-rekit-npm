"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileToArr = exports.toLowerLine = exports.handleUrl = exports.success = void 0;
var readline = require('readline');
var fs = require('fs');
exports.success = function (data) {
    return {
        code: 1,
        status: 'done',
        data: data || null,
    };
};
exports.handleUrl = function (url) {
    var uIndex = url.indexOf('/src');
    return '..' + url.substring(uIndex);
};
exports.toLowerLine = function (str) {
    var temp = str.replace(/[A-Z]/g, function (match) {
        return '-' + match.toLowerCase();
    });
    if (temp.slice(0, 1) === '-') {
        //如果首字母是大写，执行replace时会多一个-，这里需要去掉
        temp = temp.slice(1);
    }
    return temp;
};
exports.readFileToArr = function (fReadName, callback) {
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input: fRead,
    });
    var arr = new Array();
    objReadline.on('line', function (line) {
        arr.push(line);
        //console.log('line:'+ line);
    });
    objReadline.on('close', function () {
        // console.log(arr);
        callback(arr);
    });
};
