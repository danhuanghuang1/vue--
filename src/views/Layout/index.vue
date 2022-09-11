<template>
  <div>
    <!-- 二级路由占位 -->
    <router-view></router-view>
    <!-- 底部 -->
    <van-tabbar route class="tabbar">
      <van-tabbar-item to="/ ">
        <template>
          <span class="toutiao toutiao-shouye"> </span>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template>
          <span class="toutiao toutiao-shipin"> </span>
          <span class="text">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template>
          <span class="toutiao toutiao-wenda"> </span>
          <span class="text">问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <template>
          <span class="toutiao toutiao-wode"> </span>
          <span class="text">{{ isLogin ? '我的' : '未登录' }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
// .tabbar {
//   :deep(.van-tabbar-item__icon) {
//     display: flex;
//     height: 100%;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-evenly;
//   }
//   .toutiao {
//     font-size: 40px;
//   }
//   .text {
//     font-size: 30px;
//   }
// }
.tabbar {
  :deep(.van-tabbar-item__text) {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
  }
  .toutiao {
    font-size: 40px;
  }
  .text {
    font-size: 30px;
  }
}
</style>
