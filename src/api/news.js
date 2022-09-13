// 关于新闻的接口
import request from '@/utils/request'
/**
 * 获取文章
 * @param {Number/String} id 频道的id
 * @param {Number} timestamp 请求新的推荐数据当新的一页
 * @returns
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
