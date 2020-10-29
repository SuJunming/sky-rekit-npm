'use strict'
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j]
    return r
  }
var path = require('path')
var ejs = require('ejs')
var fs = require('fs')
var ENV = process.env.NODE_ENV === 'DEV'
var _a = require('./common'),
  initRekit = _a.initRekit,
  deleteFolder = _a.deleteFolder,
  success = _a.success,
  handleUrl = _a.handleUrl,
  toLowerLine = _a.toLowerLine,
  createComponent = _a.createComponent
function startRekitStudio(port) {
  return new Promise(function (resolve, reject) {
    var app = initRekit(port)
    app.post('/skyApi/addComponent', function (req, res, next) {
      var _a = req.body,
        name = _a.name,
        model = _a.model,
        p = _a.p,
        componentType = _a.componentType,
        style = _a.style
      var styleName = toLowerLine(name)
      var cTp = {
        1: 'Component',
        2: 'HooksComponent',
        3: 'TableComponent',
      }
      var componentStr = ejs.render(
        fs.readFileSync(
          path.join(__dirname, './template/' + cTp[componentType] + '.ejs'),
          'utf-8',
        ),
        { name: name, styleName: styleName, model: model, style: style },
      )
      var styleStr = ejs.render(
        fs.readFileSync(path.join(__dirname, './template/Style.ejs'), 'utf-8'),
        { name: name, styleName: styleName },
      )
      var modelStr = ejs.render(
        fs.readFileSync(path.join(__dirname, './template/Model.ejs'), 'utf-8'),
        { name: name },
      )
      createComponent(
        name,
        p,
        componentStr,
        styleStr,
        modelStr,
        res,
        next,
        style,
        model,
      )
      res.send(success())
      resolve()
    })
    app.post('/skyApi/getFiles', function (req, res, next) {
      //递归取出当前src下的列表
      var deepFileJson = function (p, i) {
        var components = []
        var files = fs.readdirSync(p)
        files.forEach(function (item, index) {
          var pchild = p + '/' + item
          var stat = fs.lstatSync(pchild)
          if (stat.isDirectory() === true) {
            var filesChildren = fs.readdirSync(pchild)
            var isFile = filesChildren.some(function (item) {
              return fs.lstatSync(pchild + '/' + item).isDirectory() === true
            })
            components.push({
              name: item,
              type: 1,
              path: handleUrl(pchild),
              children: isFile
                ? deepFileJson(pchild)
                : filesChildren.map(function (o) {
                    var opchild = pchild + '/' + o
                    var ostat = fs.lstatSync(opchild)
                    if (ostat.isDirectory() === false) {
                      return {
                        name: o,
                        type: 0,
                        path: handleUrl(opchild),
                      }
                    }
                  }),
            })
          } else {
            components.push({
              name: item,
              type: 0,
              path: handleUrl(pchild),
            })
          }
        })
        return components
      }
      var pathUrl = '../../../src/pages'
      if (ENV) {
        pathUrl = '../src/pages'
      }
      var components = deepFileJson(path.join(__dirname, pathUrl))
      var callbackArray = [
        {
          children: __spreadArrays(components),
          name: 'Features',
          type: 1,
          path: pathUrl,
        },
      ]
      res.send(success(callbackArray))
    })
    app.post('/skyApi/delete', function (req, res, next) {
      var url = path.join(__dirname, req.body.item.path)
      deleteFolder(url)
      res.send(success())
    })
  })
}
module.exports = startRekitStudio
