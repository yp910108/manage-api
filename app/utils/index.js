function processPage(ctx) {
  let { page, per_page } = ctx.query
  page = +page > 1 ? +page : 1
  per_page = +per_page ? +per_page : 10
  return { page, per_page }
}

module.exports = {
  processPage
}
