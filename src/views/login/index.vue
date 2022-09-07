<template>
  <div>
    <van-nav-bar title="标题" class="nav-bar" />
    <!-- 表单 -->
    <!-- van-field:输入框，text,password,文本域.. -->
    <!-- v-model:用户输入的值 -->
    <!-- name:表示表单项 -->
    <!-- rules是一个数组 -->
    <!-- rule:{required:是否必选，message:错误的提示信息，pattern:正则，trigger:规则的触发时机onChange、onBlur} -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="用户名"
        :rules="modileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="密码"
        :rules="codeRules"
      >
        <!-- 字体大小 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码 -->
        <template #button>
          <!-- native-type="button" 放置触发表单事件 -->
          <van-button
            class="btn"
            block
            type="default"
            size="small"
            round
            native-type="button"
            v-if="isShowCodeBtn"
            @click="sendCode"
          >
            获取验证码
          </van-button>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-else
            :time="60 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { modileRules, codeRules } from './rule'
import { login, sendCodeApi } from '@/api/user'
import { mapMutations } from 'vuex'
// 引入API
export default {
  data() {
    return {
      mobile: '',
      code: '',
      modileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    // submit事件只有表单校验通过以后会被触发

    // loading
    // message:提示文案
    // forbidclick禁止点击

    // token 身份证 标识用户
    // ·用处：标识用户是否登陆了
    // token存放vuex
    // ·toekn存在vuex
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分一下失败：提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能知道
        // error:1,js抛的错2.axios封装的error对象

        // axios封装的error对象
        // error.response.data后端返回的数据
        // error.response.status后端返回的状态码

        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // 1.js导致错误，2.507
          console.dir(error)
          this.$toast.clear()
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      // 1.验证用户是否输入了有效的手机号
      // -form绑定ref
      // -$refs.form.validate()
      await this.$refs.form.validate('mobile')
      this.loading()
      // 1.发送请求
      try {
        await sendCodeApi(this.mobile)
        // 2.显示倒计时组件
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 400)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  // scoped样式作用于当前的组件
  // vue-cli提供了语法：deep()
  // 深度选择器
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
