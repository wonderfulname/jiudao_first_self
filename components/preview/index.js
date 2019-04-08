// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classic: {
      type: Object,
      observer: (newVal) => {
        if (newVal) {
          let typeText = {
            100: "电影",
            200: "音乐",
            300: "句子"
          }[newVal.type];
        }
        this.setData({
          typeText
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
