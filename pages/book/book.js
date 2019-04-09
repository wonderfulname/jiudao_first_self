// pages/book/book.js
import {BookModel} from '../../models/book.js'
const bookModel = new BookModel
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: {},
    isSearching: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取书籍列表
    bookModel.getHotList((res) => {
      console.log(res);
      this.setData({
        bookList: res
      })
    })
  },
  getBookId(event) {
    console.log(event);
    let bookId = event.detail.bookId;
    wx.navigateTo({
      url: `../../pages/book/book-detail/index?bookId=${bookId}`,
    })
  },
  search(event) {
    this.setData({
      isSearching: true
    })
  },
  onCancel(event) {
    this.setData({
      isSearching: false
    })
  },
  lower(event) {
    console.log(event);
  }
})