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
    classicObj: {},
    first: false,
    latest: true,
    isLike: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      console.log(res)
      this.setData({
        classicObj: res,
        isLike: res.like_status,
        likeCount: res.fav_nums
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
  },
  onNext(event) {
    // console.log(event)
    this._updateClassic('next')
  },
  onPrevious(event) {
    // console.log(event)
    this._updateClassic('previous');
  },
  _updateClassic(nextOrPrev) {
    let index = this.data.classicObj.index;
    classicModel.getNextOrPrev(index, nextOrPrev, (res) => {
      console.log(res);
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classicObj: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    });
  },
  //获取点赞信息
  _getLikeStatus(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, (res) => {
      this.setData({
        isLike: res.like_status,
        likeCount: res.fav_nums
      })
    });
  }
})