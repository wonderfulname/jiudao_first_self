// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

const audioMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    musicSrc: String,
    musicTitle: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    //是否在播放
    isPlaying: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached() {
    //这种方法有bug 连续两个都是music 切换时不会触发attached这个生命周期
    console.log(audioMgr)
    this._recoverStatus();
    this._monitorSwitch();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event) {
      console.log(event);

      if (!this.data.isPlaying) {
        this.setData({
          isPlaying: !this.data.isPlaying
        });
        audioMgr.title = this.properties.musicTitle;
        audioMgr.src = this.properties.musicSrc;
      } else {
        this.setData({
          isPlaying: !this.data.isPlaying
        });
        audioMgr.pause();
      }
    },
    //恢复状态
    _recoverStatus() {
      if (audioMgr.paused) {
        this.setData({
          isPlaying: false
        })
        return;
      }

      if (audioMgr.src === this.properties.musicSrc) {
        this.setData({
          isPlaying: true
        })
      }
    },

    _monitorSwitch() {
      audioMgr.onPause(() => {
        this._recoverStatus()
      })

      audioMgr.onPlay(() => {
        this._recoverStatus()
      })

      audioMgr.onStop(() => {
        console.log(audioMgr)
        this._recoverStatus()
      })

      audioMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
