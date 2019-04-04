import {HTTP} from '../utils/http.js'

class BookModel extends HTTP {
  //获取热门书籍
  getHotList(callback) {
    this.request({
      url: 'book/hot_list',
      success: (res) => {
        callback(res)
      }
    })
  }
  // 获取书籍详细信息
  getBookDetail(bookId, callback) {
    this.request({
      url: `book/${bookId}/detail`,
      success: (res) => {
        callback(res)
      } 
    })
  }
  // 获取书籍短评
  getBookShortComment(bookId, callback) {
    this.request({
      url: `book/${bookId}/short_comment`,
      success: (res) => {
        callback(res);
      }
    })
  }
  // 获取书籍点赞情况
  getBookFavor(bookId, callback) {
    this.request({
      url: `book/${bookId}/favor`,
      success: (res) => {
        callback(res);
      }
    })
  }
  // 新增短评
  addShortComment(book_id, content, callback) {
    this.request({
      url: `book/add/short_comment`,
      method: 'POST',
      data: {
        book_id,
        content
      },
      success: (res) => {
        callback(res);
      }
    })
  }
}

export {BookModel}