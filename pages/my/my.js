// pages/my/my.js
import {BookModel} from '../../models/book.js'
import {ClassicModel} from '../../models/classic.js'

const bookModel = new BookModel()
const classicModel = new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    authorized: false,
    likedBooks: 0,
    classicFavorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorrize();
    bookModel.getLikedBooks((res) => {
      this.setData({
        likedBooks: res.count
      })
    })
    //获取喜欢期刊
    classicModel.getMyFavorPeriodical((res) => {
      console.log(res);
      this.setData({
        classicFavorList: res
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onGetUserInfo(e) {
    console.log(e.detail)
    this.userAuthorrize()

  },
  //判断用户是否已经授权
  userAuthorrize() {
    wx.getSetting({
      success: (res) => {
        // console.log(res)
        //如果授权过
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              // console.log(res)
              this.setData({
                userInfo: res.userInfo,
                authorized: true
              })
            }
          })
        }
      }
    })
  },
  onJumpToDetail(event) {
    const cid = event.detail.cid;
    const type = event.detail.type;
    wx.navigateTo({
      url: `/pages/classic-detail/index?cid=${cid}&type=${type}`
    })
  }
})