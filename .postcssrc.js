// 所有的oostcss的插件都是一个函数
// 对vant库组件内容进行适配
const pxToRem = require('postcss-pxtorem')
module.exports = {
    // 插件
    plugins: [
        pxToRem({
        // 根节点字体大小
        // 如果是vant37.5 如果自己的代码75
        // file当前编译的css的文件路径
        rootValue: ({ file })=>(/vant/.test(file)? 37.5:75),
        propList:['*']//所有的属性都转成rem
       })
    ]
}