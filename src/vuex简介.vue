<template>
  <div>
    <!-- <router-view></router-view> -->
    <h2>{{ count }}</h2>
    <h2>{{ BigNum }}</h2>
    <button @click="SetConst(10)">count++</button>
  </div>
</template>

<script>
// mapState-->将vuex.里面statel映射到computed
// 使用
// 引入mapState:函数，返回一个对象
// 参数：['映射的属性]

// mapGetters-->将vuex里面getters映射到computed

// mapMutations->将vuex的mutations方法映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['SetConst'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['BigNum'])
  }
}
</script>

<style scoped>
.sdd {
  width: 750px;
  height: 150px;
  background-color: yellow;
}
</style>
