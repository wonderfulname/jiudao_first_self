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
    hasntBooks: false,
    totalBooks: null,
    pagesCount: null,
    isFirstRequest: true,
    pageIndex: 0,
    lock: false,
    loading: false
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
      this.initialize()
    },
    onCloseSearching(event) {
      console.log(event)
      this.setData({
        isSearching: false,
        searchContent: ''
      });
      this.initialize()
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
      //请求数据
      this.apiSearchBook(this.data.pageIndex*20, this.data.searchContent)
    },
    //请求搜索结果接口
    apiSearchBook(searchStart, searchContent) {
      this.setData({
        lock: true,
        pageIndex: this.data.pageIndex + 1,
        loading: true
      })
      bookModel.searchBook(searchStart, searchContent, (res) => {
        if (this.data.isFirstRequest) {
          console.log('first')
          const totalBooks = res.total;
          const pagesCount = Math.ceil(totalBooks/20)
          this.setData({
            totalBooks,
            pagesCount,
            isFirstRequest: false,
          })
        }
        
        console.log(res)
        this.setData({
          loading: false
        })
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
          searchResultArray: this.data.searchResultArray.concat(res.books)
        });
        this.setData({
          lock: false
        })
        wx.hideLoading()
      })
    },
    lower(event) {
      console.log(event)
      if (this.data.pageIndex + 1 > this.data.pagesCount) {
        return;
      }

      if (this.data.lock) {
        return;
      }
      this.apiSearchBook(this.data.pageIndex * 20, this.data.searchContent)
    },
    initialize() {
      this.setData({
        searchResultArray: [],
        pageIndex: 0,
        isFirstRequest: true
      })
    }
  }
})
