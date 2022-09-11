<template>
  <div>
    <ArticleItem
      v-for="item in articles"
      :key="item.art_id"
      :article="item"
    ></ArticleItem>
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
      articles: []
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
    }
  }
}
</script>

<style></style>
