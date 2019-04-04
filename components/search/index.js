// components/search/index.js
import {KeywordModel} from '../../models/keywords.js'
const keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeywordList: []
  },
  attached() {
    this.setData({
      historyKeywordList: keywordModel.getHistory()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel')
    },
    onConfirm(event) {
      // console.log(event.detail.value);
      const historyKeyword = event.detail.value;
      keywordModel.addToHistory(historyKeyword);

      this.setData({
        historyKeywordList: keywordModel.getHistory()
      })
    }
  }
})
