const Koa = require('koa')
const mongoose = require('mongoose')
const routes = require('./routes')
const { db } = require('./config')
const app = new Koa()

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('数据库连接成功')
})
mongoose.connection.on('error', console.error)

routes(app)

app.listen(3001, () => {
  console.log('程序启动：http://localhost:3001')
})
