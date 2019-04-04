import { HTTP } from '../utils/http.js'

class KeywordModel extends HTTP {
  keyword = 'historyKeywords'
  maxLengh = 10
  getHistory() {
    const keywordsList = wx.getStorageSync(this.keyword);
    if (!keywordsList) {
      return []
    }
    console.log(keywordsList)
    return keywordsList;
  }

  getHot() {
    
  }

  addToHistory(seached) {
    let keywordsList = this.getHistory();

    if (keywordsList.includes(seached)) {

      // 该项在缓存中已经存在， 更新数组（将原来的删除， 新的记录加到最前面）

      // 去除原先有的项
      let newList = keywordsList.filter((elem) => {
        return (elem !== seached)
      });
      newList.unshift(seached)
      wx.setStorageSync(this.keyword, newList)
    } else {
      // 添加新记录
      keywordsList.unshift(seached);
      wx.setStorageSync(this.keyword, keywordsList)
    }
  }
}

export {KeywordModel}