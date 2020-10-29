const fs = require('fs')
export default (path: string | string[]) => {
    let files = []
    if (fs.existsSync(path)) {
      if (path.indexOf('.tsx') === -1 && path.indexOf('.scss') === -1) {
        files = fs.readdirSync(path)
        files.forEach(function (file: string, index: any) {
          const u = path + '/' + file
          if (fs.statSync(u).isDirectory()) {
            // recurse
            deleteFolder(u)
          } else {
            // delete file
            fs.unlinkSync(u)
          }
        })
        fs.rmdirSync(path)
      } else {
        fs.unlinkSync(path)
      }
    }
  }