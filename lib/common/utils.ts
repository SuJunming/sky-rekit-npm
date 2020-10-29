export const success=(data?: { children: any[]; name: string; type: number; path: string }[] | undefined) => {
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