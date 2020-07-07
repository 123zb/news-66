<template>
  <div class="mystar">
    <hm-header>我的收藏</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <div class="content">{{item.title}}</div>
          <div class="name">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comments.length}} 跟帖</span>
          </div>
        </div>
        <div class="right">
          <img :src="$url(item.cover[0].url)" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
      console.log(this.list)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  .left {
    flex: 1;
    padding-right: 10px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      font-size: 12px;
      color: #999;
      span {
        margin-right: 10px;
      }
    }
  }
  .right {
    img {
      width: 121px;
      height: 75px;
      object-fit: cover;
    }
  }
}
</style>
