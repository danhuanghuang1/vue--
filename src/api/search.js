import request from '@/utils/request'
export const getSuggestionApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 * 获取搜索结果
 * @param {*} page  分页页数，非必填，默认1
 * @param {*} per_page 每一页的数据的数量
 * @param {*} q 搜索关键词
 * @returns
 */
export const getResultsAPI = (/* eslint-disable-line */page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
