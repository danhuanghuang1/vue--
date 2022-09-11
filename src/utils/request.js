// 1.yarn add axios
// 2.引入axios
// 3.配置axios
import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器：请求做些事情
// config是每一次请求的配置对象
request.interceptors.request.use(
  // axios请求前发生的函数
  function (config) {
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    // 这一行必须return
    return config
  },
  // axios请求后发生的函数
  function (error) {
    console.log(error)
  }

)
export default request
