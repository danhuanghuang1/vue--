// 关于频道的接口
import request from '@/utils/request'
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取我的频道
 * @returns
 */
export const getAllChanneslAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
