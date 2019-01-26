// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let {a, b} = event
  return new Promise((resolve, reject) => {
    resolve({result: parseInt(a) + parseInt(b)})
  })
}