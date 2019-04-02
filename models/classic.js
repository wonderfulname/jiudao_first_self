import {HTTP} from '../utils/http.js'
class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        callback(res);
        this._setLatestIndex(res.index);
        let key = this._getKey(res.index);
        wx;wx.setStorageSync(key, res);
      }
    })
  }

  getNextOrPrev(index, nextOrPrev, callback) {
    //缓存中寻找 or 请求API 写入到缓存中
    let key = this._getKey(nextOrPrev === 'next' ? index + 1 : index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrev}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res);
          callback(res)
        }
      })
    } else {
      callback(classic)
    }
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

  _getKey(index) {
    let key = `classic-${index}`;
    return key;
  }
}

export { ClassicModel } 