// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      console.log(res)
      this.setData({
        classicObj: res
      })
    })
  },

  onLike(event) {
    // console.log(event)
    let behavior = event.detail.behavior;
    let classicObj = this.data.classicObj
    //调用点赞接口
    likeModel.like(behavior, classicObj.id, classicObj.type,(res)=> {
      console.log(res)
    })
  }
})