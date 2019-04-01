import { HTTP } from '../utils/http.js'
class LikeModel extends HTTP {
  like(isLike, artId, category, callback) {
    let url = isLike === 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      },
      success: (res)=> {
        callback(res)
      }
    })
  }
}

export { LikeModel } 