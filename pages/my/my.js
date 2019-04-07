// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    authorized: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorrize()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onGetUserInfo(e) {
    // console.log(e)
    this.userAuthorrize()

  },
  //判断用户是否已经授权
  userAuthorrize() {
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            }
          })
        } else {
          console.log('error')
        }
      }
    })
  }
})