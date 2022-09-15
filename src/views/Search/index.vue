<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('./')"
      />
    </form>
    <!-- 搜索建议/历史/结果 -->
    <!-- <search-history></search-history>
    <search-result></search-result>
    <search-suggestion></search-suggestion> -->
    <!-- 动态组件 -->
    <component
      :is="componentName"
      :keyWords="keywords"
      @changeKeyWords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/components/SearchHistory.vue'
import SearchResult from '@/views/Search/components/SearchResult.vue'
import SearchSuggestion from '@/views/Search/components/SearchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  methods: {
    // 把keywords关键词存起来
    // 1.用户手动敲回车2.点击了搜索建议
    // 存储搜索历史
    // 新的在前 旧的在后
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  },
  computed: {
    // 搜索历史：搜索框的值空
    // 搜索奏建议：搜索框有值，并且不渲染搜索结果
    // 搜素结果：触发搜索过显示搜索结果
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style lang="less" scoped>
// cLass styLe属性的特殊
// vue自动帮你把class和style合并到组件的根节点
// 属性选择器
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
