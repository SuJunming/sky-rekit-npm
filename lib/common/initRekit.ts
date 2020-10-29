const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const consola = require('consola')
const fallback = require('express-history-api-fallback')

export default (port: any) => {
  consola.start('💪 Rekit Studio...')
  const app = express()
  const server = http.createServer(app)
  const root = path.join(__dirname, '../build')
  app.use(express.static(root))
  app.use(fallback('index.html', { root }))
  app.use(bodyParser.json({ limit: '5MB' }))
  app.use(bodyParser.urlencoded({ extended: true }))
  server.listen(port, (error: any) => {
    app.use(
      (
        err: { message: any },
        req: any,
        res: {
          status: (
            arg0: number,
          ) => {
            (): any
            new (): any
            send: { (arg0: { error: any }): void; new (): any }
          }
        },
        next: any,
      ) => {
        res.status(500).send({ error: err.message })
      },
    )
    consola.success(
      `🆗 Sky Rekit Studio is running at http://localhost:${port}/ `,
    )
  })
  return app
}
