import {HTTP} from '../utils/http.js'
class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        callback(res);
        this._setLatestIndex(res.index)
      }
    })
  }

  getNextOrPrev(index, nextOrPrev, callback) {
    this.request({
      url: `classic/${index}/${nextOrPrev}`,
      success: (res) => {
        callback(res)
      }
    })
  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return index === latestIndex ? true : false;
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index;
  }
}

export { ClassicModel } 