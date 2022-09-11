<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// rem适配
// 1,让rem动起来
// 口令  yarn add amfe-flexible
// 2.使用rem
// 引入 import 'amfe-flexible'
// 自动识别css中的px，并将其转成rem

// post-css  css的预处理器
// postcss自己能干的事很少，下载插件
// i.下载yarn add postcss-pxtorem
// 2.告诉postcss,我要使用这个插件，在根目录下新建.postcssrc.js

export default {}
</script>

<style scoped>
.sdd {
  width: 750px;
  height: 150px;
  background-color: yellow;
}
</style>
