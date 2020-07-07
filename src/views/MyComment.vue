<template>
  <div class="mycomment">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <!-- list用法
      上拉加载更多的列表组件
      -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="20"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <p class="time">{{item.create_date | time( 'YYYY-MM-DD HH-mm' )}}</p>
          <!-- 父评论不一定每条都有 需要先判断是否存在 否则会报错 -->
          <div class="parent" v-if="item.parent">
            <p>回复：{{item.parent.user.nickname}}</p>
            <p>{{item.parent.content}}</p>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="link">
            <span class="one-txt-cut">原文：{{item.post.title}}</span>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      // 是否全部数据都加载完了
      loading: false,
      finished: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      // 在接口文档中，请求有两个参数 pageIndex pageSize
      // 需要拼接到后面 用来确定每页的返回条数 默认是十条
      const res = await this.$axios.get('/user_comments', {
        // 发送get请求需要放到params中，见axios文档
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 此处的list 不能只是 this.list = data ， 因为在页面加载中应不听追加内容
        this.list = [...this.list, ...data]
        // 把加载的状态改为false
        this.loading = false
        // 修改finished
        // 没有更多数据 获取的data的条数 小于pageSize
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
      console.log(this.list)
    },
    onLoad() {
      // 让页码值加一
      this.pageIndex++
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.mycomment {
  font-size: 14px;
  .item {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .time {
      color: #999;
      line-height: 40px;
    }
    .parent {
      background-color: #ddd;
      padding: 10px;
      color: #999;
      line-height: 30px;
    }

    .content {
      margin: 20px 0;
    }
    .link {
      color: #999;
      display: flex;
      justify-content: space-between;
      span:first-child {
        width: 60%;
      }
    }
  }
}
</style>
