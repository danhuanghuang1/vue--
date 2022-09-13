<template>
  <div class="article">
    <!-- 下拉刷新 v-model绑定的值特性于loading一致 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticles">
      <!-- 属性 -->
      <!-- @load:触底的时候触发load事件 -->
      <!-- offset:滚动条和底部距离多少的时候触发load事件，默认值是300px -->
      <!-- immediate-check:初渲染的时候是否执load事件，默认值是true -->
      <!-- loading为true,load事件不会被触发 -->
      <!-- loading为时faLse的时候Load事件会被触发 -->
      <!-- loading.会在load事件执行后，被van-list组件自动设置为ture,需要手动的改为时false -->
      <!-- finished:BooLean。false时lload事件会被触发,true时load事件不会被出发了，并且显示finished-text的文本 -->
      <van-list
        v-model="loading"
        @load="getNextPageArticles"
        :finished="finished"
        finished-text="再刷也没有了~~~"
        offset="100"
        :error.sync="error"
        error-text="请求失败，请点击重试"
        :immediate-check="false"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem'
export default {
  props: {
    id: [String, Number]
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    // 三种时间戳的方法
    // new Date().valueof()
    // Date.now()
    // +new Date()
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
        // 将加载下一次数据的时间戳存起来
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.meaaage)
          }
        }
      }
    },
    async getNextPageArticles() {
      try {
        // 试错
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        // 1.发送请求
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下滑加载，将数据放在最后
        // 如果是下拉刷新，将数据放在最前
        // 2.将新获得的数据push到原来数组里面
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        // 3.更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // 出错了
        this.error = true
      } finally {
        // 4.更改loading
        // 触发后组件库会把值该为true，所以要手动改过来
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 如何给盒子拥有自已的滚动条
// -1.定高2.overfLow:auto/scroll/overLay
.article {
  height: calc(100vh - 100px - 92px - 83px);
  overflow: auto;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
