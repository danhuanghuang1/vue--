// 1.引入dayjs
// 默认语言为英语
import dayjs from 'dayjs'
// 下载插件
const relativeTime = require('dayjs/plugin/relativeTime')
// 继承插件
dayjs.extend(relativeTime)
// 引入中文包
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
export default dayjs
