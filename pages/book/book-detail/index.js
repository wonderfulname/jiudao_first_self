// pages/book/book-detail/index.js
import {BookModel} from '../../../models/book.js'
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  }
})