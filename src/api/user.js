import request from '@/utils/request'

/**
 * 登录
 * @param {String} mobile
 * @param {Numben} code
 * @returns  Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}
/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
