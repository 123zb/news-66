<template>
  <div class="user">
    <div class="header" @click="$router.push('/user-edit')">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="info">
        <p class="name">
          <span class="iconfont iconxingbienan" v-if="info.gender === 1"></span>
          <span class="iconfont iconxingbienv" v-else></span>
          {{ info.nickname }}
        </p>
        <p class="time">{{ info.create_date | time }}</p>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <div class="nav">
      <hm-navbar>
        <template>我的关注</template>
        <!--  v-slot：content  # -->
        <template #content>关注的用户</template>
      </hm-navbar>
      <hm-navbar>
        <template>我的跟帖</template>
        <!--  v-slot：content  # -->
        <template #content>跟帖/回复</template>
      </hm-navbar>
      <hm-navbar>
        <template>我的收藏</template>
        <!--  v-slot：content  # -->
        <template #content>文章/视频</template>
      </hm-navbar>
      <hm-navbar @click="$router.push('/user-edit')">
        <template>设置</template>
      </hm-navbar>
    </div>
  </div>
</template>

<script>
export default {
  // 路由在渲染路由之前
  // beforeRouterEnter(to, from, next) {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     next()
  //   } else {
  //     this.$router.push('/login')
  //   }
  // },

  data() {
    return {
      info: {}
    }
  },
  async created() {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    // 发送ajax请求
    const res = await this.$axios.get(`/user/${userId}`, {
      // 配置请求头
      headers: {
        Authorization: token
      }
    })
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
    }
    if (statusCode === 401) {
      this.$toast.fail('用户信息验证失败')
      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .header {
    height: 120px;
    display: flex;
    border-bottom: 5px solid #ccc;
    align-items: center;
    padding: 0 20px;
    .avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .info {
      flex: 1;
      padding-left: 20px;
      font-size: 14px;
      color: #333;
      .name {
        margin-bottom: 10px;
        .iconxingbienv {
          color: #f23ebf;
        }
        .iconxingbienan {
          color: #80bbe4;
        }
      }
      .time {
        color: #999;
      }
    }
  }
  .nav {
    padding-left: 20px;
  }
}
</style>
