"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var fs = require('fs');
var consola = require('consola');
var readFileToArr = require('./utils').readFileToArr;
exports.default = (function (name, p, str, styleStr, modelStr, res, next, style, model) {
    var u = path.join(__dirname, '../' + p);
    var models = u + '/../models';
    fs.mkdir(u + "/" + name, function (error) {
        if (error) {
            next(error);
            return;
        }
        else {
            consola.success('🆗 创建目录成功');
            fs.writeFile(u + "/" + name + "/index.tsx", str, 'utf8', function (error) {
                if (error) {
                    next(error);
                    return;
                }
                consola.success('🆗 写入组件');
            });
            if (style) {
                fs.writeFile(u + "/" + name + "/index.scss", styleStr, 'utf8', function (error) {
                    if (error) {
                        next(error);
                        return;
                    }
                    consola.success('🆗 写入样式');
                });
            }
            if (model) {
                fs.writeFile(models + "/" + name + ".ts", modelStr, 'utf8', function (error) {
                    if (error) {
                        next(error);
                        return;
                    }
                    consola.success('🆗 写入model');
                    // readFileToArr(`${models}/index.ts`, (data: any) => {
                    //   data.unshift(`import { ${name} } from './${name}'`)
                    //   const index = data.findIndex(
                    //     (item: string) => item.indexOf('export {') !== -1,
                    //   )
                    //   data[index] = data[index].replace('{', `{ ${name},`)
                    //   fs.writeFile(
                    //     `${models}/index.ts`,
                    //     data.join('\n'),
                    //     'utf8',
                    //     (error: any) => {
                    //       if (error) {
                    //         next(error)
                    //         return
                    //       }
                    //       consola.success('🆗 写入model')
                    //     },
                    //   )
                    // })
                });
            }
        }
    });
});
