import {HTTP} from '../utils/http.js'

class BookModel extends HTTP {
  getHotList(callback) {
    this.request({
      url: 'book/hot_list',
      success: (res) => {
        callback(res)
      }
    })
  }
}

export {BookModel}