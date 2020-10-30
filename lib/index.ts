const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const ENV = process.env.NODE_ENV === 'DEV'
const {
  initRekit,
  deleteFolder,
  success,
  handleUrl,
  toLowerLine,
  createComponent,
} = require('./common')
const pathUrl = ENV ? '../' : '../../../'

function startRekitStudio(port: any) {
  return new Promise((resolve: () => void, reject: any) => {
    const app = initRekit(port)
    app.post(
      '/skyApi/addComponent',
      (
        req: {
          body: {
            name: any
            model: any
            p: any
            componentPath: any
            style: any
          }
        },
        res: {
          send: (arg0: { code: number; status: string; data: any }) => void
        },
        next: any,
      ) => {
        const { name, model, p, componentPath, style } = req.body
        const styleName = toLowerLine(name)

        const componentStr = ejs.render(
          fs.readFileSync(path.join(__dirname, componentPath), 'utf-8'),
          { name, styleName, model, style },
        )
        const styleStr = ejs.render(
          fs.readFileSync(
            path.join(__dirname, './template/Style.ejs'),
            'utf-8',
          ),
          { name, styleName },
        )
        const modelStr = ejs.render(
          fs.readFileSync(
            path.join(__dirname, './template/Model.ejs'),
            'utf-8',
          ),
          { name },
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
      },
    )

    app.post(
      '/skyApi/getFiles',
      (
        req: any,
        res: {
          send: (arg0: { code: number; status: string; data: any }) => void
        },
        next: any,
      ) => {
        //递归取出当前src下的列表
        const deepFileJson: any = (p: string, i: undefined) => {
          let components: {
            name: any
            type: number
            path: string
            children?: any
          }[] = []
          const files = fs.readdirSync(p)
          files.forEach(function (item: string, index: any) {
            const pchild = p + '/' + item
            let stat = fs.lstatSync(pchild)
            if (stat.isDirectory() === true) {
              const filesChildren = fs.readdirSync(pchild)
              const isFile = filesChildren.some(
                (item: string) =>
                  fs.lstatSync(pchild + '/' + item).isDirectory() === true,
              )
              components.push({
                name: item,
                type: 1,
                path: handleUrl(pchild),
                children: isFile
                  ? deepFileJson(pchild)
                  : filesChildren.map((o: string) => {
                      const opchild = pchild + '/' + o
                      let ostat = fs.lstatSync(opchild)
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
        const components = deepFileJson(
          path.join(__dirname, pathUrl + 'src/pages'),
        )
        const callbackArray = [
          {
            children: [...components],
            name: 'Features',
            type: 1,
            path: pathUrl + 'src/pages',
          },
        ]
        res.send(success(callbackArray))
      },
    )
    app.post(
      '/skyApi/getTemplates',
      (
        req: {
          body: {
            name: any
            model: any
            p: any
            componentType: any
            style: any
          }
        },
        res: {
          send: (arg0: { code: number; status: string; data: any }) => void
        },
        next: any,
      ) => {
        const templates = path.join(__dirname, pathUrl + 'templates')
        let list: any = [
          { name: 'Component.ejs', path: './template/Component.ejs' },
          { name: 'HooksComponent.ejs', path: './template/HooksComponent.ejs' },
          { name: 'TableComponent.ejs', path: './template/TableComponent.ejs' },
        ]
        if (fs.existsSync(templates)) {
          const files = fs.readdirSync(templates)
          files.forEach((item: any) => {
            list.push({
              name: item,
              path: pathUrl + 'templates' +'/'+ item,
            })
          })
        }
        res.send(success(list))
      },
    )
    app.post(
      '/skyApi/delete',
      (
        req: { body: { item: { path: any; name: string } } },
        res: {
          send: (arg0: { code: number; status: string; data: any }) => void
        },
        next: any,
      ) => {
        const url = path.join(__dirname, req.body.item.path)
        deleteFolder(req.body.item.name, url)
        res.send(success())
      },
    )
  })
}
if (ENV) {
  startRekitStudio(3001)
}
module.exports = startRekitStudio
