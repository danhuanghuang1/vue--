<template>
  <div class="active">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了哦~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keyWords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      per_page: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }
        // 发送请求
        const {
          data: {
            data: { results }
          }
        } = await getResultsAPI(this.page++, this.per_page, this.keyWords)
        console.log(results)
        if (results.length === 0) {
          this.finished = true
        }
        // 保存结果
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        // 关闭eslint
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// overlay和auto用法基本一致的
.active {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
