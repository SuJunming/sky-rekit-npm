const readline = require('readline')
const fs = require('fs')

export const success = (
  data?:
    | { children: any[]; name: string; type: number; path: string }[]
    | undefined,
) => {
  return {
    code: 1,
    status: 'done',
    data: data || null,
  }
}

export const handleUrl = (url: string) => {
  const uIndex = url.indexOf('/src')
  return '..' + url.substring(uIndex)
}

export const toLowerLine = (str: string) => {
  var temp = str.replace(/[A-Z]/g, function (match: string) {
    return '-' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '-') {
    //如果首字母是大写，执行replace时会多一个-，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}

export const readFileToArr = (fReadName: any, callback: any) => {
  var fRead = fs.createReadStream(fReadName)
  var objReadline = readline.createInterface({
    input: fRead,
  })
  var arr = new Array()
  objReadline.on('line', function (line: any) {
    arr.push(line)
    //console.log('line:'+ line);
  })
  objReadline.on('close', function () {
    // console.log(arr);
    callback(arr)
  })
}
