const path = require('path')
const fs = require('fs')
const consola = require('consola')
const { readFileToArr } = require('./utils')
export default (
  name: any,
  p: any,
  str: any,
  styleStr: any,
  modelStr: any,
  res: any,
  next: (arg0: any) => void,
  style: any,
  model: any,
) => {
  const u = path.join(__dirname, '../' + p)
  const models = u + '/../models'
  fs.mkdir(`${u}/${name}`, (error: any) => {
    if (error) {
      next(error)
      return
    } else {
      consola.success('🆗 创建目录成功')
      fs.writeFile(`${u}/${name}/index.tsx`, str, 'utf8', (error: any) => {
        if (error) {
          next(error)
          return
        }
        consola.success('🆗 写入组件')
      })
      if (style) {
        fs.writeFile(
          `${u}/${name}/index.scss`,
          styleStr,
          'utf8',
          (error: any) => {
            if (error) {
              next(error)
              return
            }
            consola.success('🆗 写入样式')
          },
        )
      }
      if (model) {
        fs.writeFile(`${models}/${name}.ts`, modelStr, 'utf8', (error: any) => {
          if (error) {
            next(error)
            return
          }
          readFileToArr(`${models}/index.ts`, (data: any) => {
            data.unshift(`import { ${name} } from './${name}'`)
            const index = data.findIndex(
              (item: string) => item.indexOf('export {') !== -1,
            )
            data.splice(index + 1, 0, name + ',')
            fs.writeFile(
              `${models}/index.ts`,
              data.join('\n'),
              'utf8',
              (error: any) => {
                if (error) {
                  next(error)
                  return
                }
                consola.success('🆗 写入model')
              },
            )
          })
        })
      }
    }
  })
}
