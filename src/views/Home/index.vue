<template>
  <div>
    <!-- 搜索栏 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          icon="search"
          size="small"
          round
          block
          @click="$router.push('/search')"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>

    <!-- 频道及文章展示
active:高亮的tab的索引 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <!-- 文章详情 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        v-if="isShow"
        :myChannels="channels"
        @change-active=";[(isShow = false), (active = $event)]"
        @del-channel="delchannel"
        @add-channel="addchannel"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/ArticleList.vue'
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ChannelEdit from '@/views/Home/components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 2,
      channels: [],
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.initChannels()
  },
  // 整个添加删除获取频道的数据思路
  // 如果登录
  // 获取的是axios的数据
  // 删除和添加:视图变化的同时,通过接口进行对数据进行添加删除

  // 如果未登录
  // 将数据通过vuex保存到本地
  // 获取的是本地的原始数据,如果本地没有数据,通过接口获得原始数据
  // 添加和删除:将数据通过vuex保存到本地,对本地数据进行操作

  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    // 1.??==>相当于||，常用于语句
    // 2.?.=>可选链操作符，？前面是undifined,那么不会往后取值
    initChannels() {
      if (this.isLogin) {
        // 1如果你登录了
        // channels.应该发清求获取用户自己的颜道
        this.getChannel()
      } else {
        const myChannels = this.$store.state.channels
        // 2未登录
        if (myChannels.length === 0) {
          // 1.本地存储没有数据发送清求，获取默认的接口数据
          this.getChannel()
        } else {
          // 2.本地存储里有数据，channels用本地存储
          this.channels = myChannels
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('服务端异常，请刷新')
        }
      }
    },
    async delchannel(id) {
      try {
        const newchannels = this.channels.filter((item) => item.id !== id)
        if (this.isLogin) {
          // 1.发起请求删除频道
          await delChannelAPI(id)
        } else {
          // 把我的频道存储到本地
          // 存的是最新更新过的channels数组
          this.SET_MY_CHANNELS(newchannels)
        }
        // 2.视图层删除频道
        this.channels = newchannels
        this.$toast.success('删除成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录后再删除')
        } else {
          throw error
        }
      }
    },
    async addchannel(channel) {
      try {
        if (this.isLogin) {
          /// 1发起请求添加
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          // 把我的频道存储到本地
          // 将旧数组和新数组结构拼在一起传进去
          this.SET_MY_CHANNELS([...this.channels, channel])
        }
        // 2.页面添加
        this.channels.push(channel)
        this.$toast.success('添加成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录后再添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
