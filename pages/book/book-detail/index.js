// pages/book/book-detail/index.js
import {BookModel} from '../../../models/book.js'
import {LikeModel} from '../../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowingDialog: false,
    bookDetail: {},
    comments: [],
    likeStatus: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bookId = options.bookId;
    //获取书籍详情
    bookModel.getBookDetail(bookId, (res) => {
      console.log(res);
      this.setData({
        bookDetail: res
      })
    });
    //获取书籍短评
    bookModel.getBookShortComment(bookId, (res) => {
      console.log(res);
      this.setData({
        comments: res.comments
      })
    });
    //获取书籍点赞情况
    bookModel.getBookFavor(bookId, (res) => {
      console.log(res);
      this.setData({
        likeStatus: res
      })
    });
  },
  //点赞/取消点赞
  onLike(event) {
    // console.log(event);
    let isLike = event.detail.behavior;
    likeModel.like(isLike, this.data.likeStatus.id, 400, (res) => {
      console.log(res);
    })
  },
  //点击‘输入短评’ 弹出弹窗
  showDialog(event) {
    this.setData({
      isShowingDialog: true
    })
  },
  closeDialog(event) {
    this.setData({
      isShowingDialog: false
    })
  }
}) 