const request = require('request')
const cheerio = require('cheerio')
esports.main = async (event = {}) => {
  let category = event.category || 'dianmaoshuma'
  return new Promise((resolve, reject) => {
    request.get(`https://m.smzdm.com/fenlei/${category}/`, (e, req, body) => {
      if (!e && req.statusCode === 200) {
        const $ = cheerio.load(body)
        const result = []
        $('.card-group-list').each((i, v) => {
          let $v = $(v)
          let title = $v.find('.zm-card-title').text().trim()
          let image = $v.find('.zm-card-media img').attr('src')
          let mall = $v.find('.card-mall').text().trim()
          result.push({
            title,
            image,
            mall
          })
        })
        resolve(result)
      }
    })
  })
}