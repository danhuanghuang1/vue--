<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      @click="$emit('changeKeyWords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 1.输入了第一个字符：决定渲染SearchSuggestion,所以要在初始化时就更新一次监听数据

//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串,修饰符'ig')

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { getSuggestionApi } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keyWords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keyWords: {
      immediate: true,
      handler: 'getSuggestion'
    }
  },
  computed: {
    highLightSuggestions() {
      // 动态正则，
      const reg = new RegExp(this.keyWords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red;">${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestion: debounce(async function () {
      try {
        const { data } = await getSuggestionApi(this.keyWords)
        console.log(data)
        // Boolean判断返回一个布尔值
        // this.suggestions = data.data.options.filter((item) => Boolean(item))
        // 简写 const Boolean=(a)=>{Boolean(a)}
        // 遍历每一项的时候执行(a)=>Boolean(a) 相当于(item)=>Boolean(item)
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
