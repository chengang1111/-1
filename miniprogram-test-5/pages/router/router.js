// pages/router/router.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  routerOne() {
    wx.navigateBack({
      delta: 2
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    routerOne() {
      wx.navigateBack({
        delta: 2
      })
    },
  }
})
