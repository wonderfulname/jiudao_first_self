// components/image-button/index.js
//1接受open-type值 微信开放能力
//2通过slot接收一张图片
//3抛出事件，供父亲使用
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    openType: {
      type: String
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
    onGetUserInfo(event) {
      // console.log(event)
      this.triggerEvent('getUserInfo', event.detail)
    }
  }
})
