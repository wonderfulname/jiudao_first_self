// components/search/index.js
import {KeywordModel} from '../../models/keywords.js'
import {BookModel} from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
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
    isSearching: false,
    historyKeywordList: [],
    hotList: [],
    searchStart: 0,
    searchContent: '',
    searchResultArray: [],
    hasntBooks: false
  },
  attached() {
    //加载缓存
    this.setData({
      historyKeywordList: keywordModel.getHistory()
    });

    keywordModel.getHot((res) => {
      console.log(res)
      this.setData({
        hotList: res.hot
      })
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel')
    },
    onCloseSearching(event) {
      console.log(event)
      this.setData({
        isSearching: false,
        searchContent: ''
      });
      console.log(this.data.searchContent)
    },
    onInput(event) {
      console.log(event.detail.value)
      this.setData({
        searchContent: event.detail.value
      })
    },
    //按回车搜索 或 点击标签
    onConfirm(event) {
      // console.log(event.detail.value);
      const searchText = event.detail.value || event.detail.comment;
      // const historyKeyword = event.detail.value;
      keywordModel.addToHistory(searchText);

      this.setData({
        isSearching: true,
        historyKeywordList: keywordModel.getHistory(),
        searchContent: searchText
      })

      wx.showLoading({
        title: '加载中'
      })

      bookModel.searchBook(this.data.searchStart, searchText, (res) => {
        console.log(res)
        if (res.books.length === 0) {
          this.setData({
            hasntBooks: true
          })
        } else {
          this.setData({
            hasntBooks: false
          })
        }

        this.setData({
          searchResultArray: res.books
        });
        wx.hideLoading()
      })
    }
  }
})
