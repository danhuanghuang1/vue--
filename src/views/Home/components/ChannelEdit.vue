<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          :class="{ active: item.name === '推荐' }"
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handleMyChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <!-- 标题 -->
    <van-cell title="推荐频道"></van-cell>
    <!-- 推荐 -->
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChanneslAPI } from '@/api'
export default {
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array
    }
  },
  created() {
    this.getAllChannesl()
  },
  methods: {
    async getAllChannesl() {
      const { data } = await getAllChanneslAPI()
      this.allChannels = data.data.channels
    },
    handleMyChannel({ name }, index) {
      // 处于编辑状态并且不是推荐按钮
      if (this.isEdit && name !== '推荐') {
        console.log('删除了' + name)
      } else {
        // 1.关闭弹窗
        // 2.切换频道
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((allChannelItem) => {
        // find方法遍历数组并判断一个数组里面有没有这一项，传入一个回调函数，回调函数传入的第一值为这个数组的item
        // 判断数组里面有没有这一项，有就返回当前项，没有返回undifined
        return !this.myChannels.find(
          (myChannelsItem) => myChannelsItem.id === allChannelItem.id
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
</style>
