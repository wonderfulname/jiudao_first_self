// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike: {
      type: Boolean,
      value: false
    },
    likeCount: {
      type: Number
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //喜欢/不喜欢 图片路径
    likeImageSrc: 'images/like.png',
    disLikeImageSrc: 'images/dislike.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击爱心 更新数据
    onLike:function(event) {
      if (this.properties.readOnly) {
        return;
      }

      let isLike = this.properties.isLike;
      let likeCount = this.properties.likeCount;

      likeCount = isLike ? likeCount - 1 : likeCount + 1;

      this.setData({
        likeCount,
        isLike: !isLike
      });
      let behavior = this.properties.isLike ? 'like' : 'cancle';
      this.triggerEvent('isLike', {behavior});

    }
  }
})
