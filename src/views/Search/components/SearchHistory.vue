<template>
  <div>
    <!-- 搜索历史的标题 -->
    <!-- isEdit控制是否处于编辑状态，默认不是处于编辑状态 -->
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />

        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span
          >&nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史 -->
    <van-cell
      :title="item"
      v-for="item in $store.state.histories"
      :key="item"
      @click="!isEdit && $emit('changeKeyWords', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-if="isEdit"
          @click="
            $store.commit(
              'SET_HISTORIES',
              $store.state.histories.filter((i) => item !== i)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false
    }
  }
}
</script>

<style></style>
