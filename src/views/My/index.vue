<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录状态的结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              ></van-image>
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button round size="mini" class="edit-btn"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col></van-row
        >
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态的结构 -->
      <div class="layout banner" v-else @click="$router.push('./login')">
        <van-image round width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <van-grid class="grid" :border="false" column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </div>
    </main>

    <!-- 底部 -->
    <footer>
      <van-button block v-if="isLogin" style="color: red" @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import mobileSrc from '@/assets/images/mobile.png'
import { mapGetters } from 'vuex'
import { getUserinfo } from '@/api'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  },
  data() {
    return {
      mobileSrc,
      userInfo: []
    }
  },
  created() {
    this.getUserinfoApi()
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserinfoApi() {
      try {
        if (!this.isLogin) return
        const {
          data: { data }
        } = await getUserinfo()

        this.userInfo = data
      } catch (error) {
        if (error.responce && error.responce.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }

  .banner {
    width: 100%;
    height: 5.33333rem;
    background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
  }
  .layout {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .text {
      font-size: 30px;
      margin-top: 10px;
      color: white;
    }
  }
  .login {
    display: flex;
    flex-direction: column;
    > .van-row {
      flex: 1;
    }
    .mobile {
      font-size: 30px;
      color: #fff;
    }
    .van-col {
      height: 100%;
    }
    .edit-btn {
      width: 1.6rem;
      height: 0.4267rem;
      color: #666;
    }
    :deep(.grid) {
      color: #fff;
      .van-grid-item__content {
        font-size: 30px;
        background-color: inherit;
      }
      .van-grid-item__text {
        color: #fff;
      }
    }
  }
}
</style>
