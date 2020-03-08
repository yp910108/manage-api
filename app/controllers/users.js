const User = require('../models/users')
const { processPage } = require('../utils')

class UsersCtl {
  async find(ctx) {
    const { page, per_page } = processPage(ctx)
    ctx.body = await User.find()
      .limit(per_page)
      .skip((page - 1) * per_page)
  }
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }
  async create(ctx) {
    ctx.verifyParams({
      sid: { type: 'string', required: true },
      name: { type: 'string', required: true },
      sex: { type: 'string', required: true },
      age: { type: 'string', required: true }
    })
    const { sid } = ctx.request.body
    const repeatedUser = await User.findOne({ sid })
    if (repeatedUser) ctx.throw(409, '学号重复')
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      sid: { type: 'string', required: true },
      name: { type: 'string', required: true },
      sex: { type: 'string', required: true },
      age: { type: 'string', required: true }
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }
  async delete(ctx) {
    const user = await User.findByIdAndDelete(ctx.params.id)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.status = 204
  }
}

module.exports = new UsersCtl()
