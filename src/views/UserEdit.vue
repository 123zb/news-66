<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="nav">
      <hm-navbar @click="showNickName">
        <template>昵称</template>
        <template #content>{{ info.nickname }}</template>
      </hm-navbar>
      <hm-navbar @click="showPassword">
        <template>密码</template>
        <template #content>******</template>
      </hm-navbar>
      <hm-navbar @click="showGenderFn">
        <template>性别</template>
        <template #content>{{ info.gender === 1 ? '男' : '女' }}</template>
      </hm-navbar>
    </div>
    <!-- bootstrap modal -->
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickName" placeholder="请输入用户新昵称" />
    </van-dialog>

    <!-- 点击修改密码 文档中找到dialog的用法 替换掉里面的img 找到vant里的van-field
     此为输入框的用法
     v-model="showPwd"  showPwd 控制提示框的显示和隐藏 给个默认参数为false 隐藏
      title="修改密码"
    -->
    <van-dialog
      v-model="showPwd"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
    >
      <van-field v-model="password" placeholder="请输入新密码" />
    </van-dialog>
    <!-- 修改性别 这个框还是要的 所以只是清空掉里面的内容 由单选框的代码来替换
    里面的 naem 属性要设置成动态的 :name='1' 这样才代表数字1  而不是 name:'1'(代表字符串1)
    因为后台拿到的就是数字 0 或者 1
    与 Cell 组件一起使用  此时你需要再引入Cell和CellGroup组件
    -->
    <van-dialog
      v-model="showGender"
      title="修改性别"
      show-cancel-button
      @confirm="editGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <div class="mask" v-show="isShowMask">
      <van-button type="primary" @click="crop">裁剪</van-button>
      <van-button type="warning" @click="cancel">取消</van-button>
      <VueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        autoCropWidth="150"
        autoCropHeight="150"
        :fixed="true"
        :fixedNumber="[1, 1]"
      ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      info: {},
      show: false,
      nickName: '',
      showPwd: false,
      password: '',
      showGender: false,
      gender: 1,
      isShowMask: false,
      img: ''
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    showNickName() {
      this.show = true
      this.nickName = this.info.nickname
    },

    // 改进的方法 封装一个editUser函数 因为修改昵称和修改密码都需要相同的代码，可直接调用
    async editUser(data) {
      const userId = localStorage.getItem('userId')
      // 此处需要看接口文档得到  post请求  和 请求携带的数据
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      console.log(res)
      const { statusCode, message } = res.data
      // 如果状态码是 200 则显示提示消息 并且再次渲染数据
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      } else {
        // 失败则显示提示消息
        this.$toast.fail(message)
      }
    },

    // 注册点击事件 看vant文档config
    async editNickname() {
      this.editUser({ nickname: this.nickname })
      // const userId = localStorage.getItem('userId')
      // // 此处需要看接口文档得到  post请求  和 请求携带的数据
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   nickname: this.nickName
      // })
      // console.log(res)
      // const { statusCode, message } = res.data
      // // 如果状态码是 200 则显示提示消息 并且再次渲染数据
      // if (statusCode === 200) {
      //   this.$toast.success(message)
      //   this.getInfo()
      // } else {
      //   // 失败则显示提示消息
      //   this.$toast.fail(message)
      // }
    },
    // 修改密码的注册事件
    showPassword() {
      this.showPwd = true
      this.password = this.info.password
    },

    // 修改密码
    async editPassword() {
      this.editUser({ password: this.password })
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   password: this.password
      // })
      // // 结构出需要的状态码和信息  显示请提示
      // const { statusCode, message } = res.data
      // if (statusCode === 200) {
      //   this.$toast.success(message)
      // } else {
      //   this.$toast.fail(message)
      // }
    },
    showGenderFn() {
      this.showGender = true
      console.log(this.info)
      this.gender = this.info.gender
    },
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },
    async afterRead(file) {
      console.log(file)
      this.isShowMask = true
      this.img = file.content

      // // 此时可以自行将文件上传至服务器
      // console.log(file)
      // // 发送ajax请求 上传文件  请求方式查看接口文档
      // const xhr = new XMLHttpRequest()
      // xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
      // xhr.open('post', 'http://localhost:3000/upload')
      // // 需要上传文件，文件的数量需要放到formData中，forDate允许上传二进制的数据
      // const fd = new FormData()
      // // 第一份file是 接口要的名称
      // fd.append('file', file.file)
      // xhr.send(fd)
      // xhr.onload = function() {
      //   if (xhr.status === 200) {
      //     console.log(xhr.responseText)
      //   }
      // }
      // 分开
      // 校验上传的图片的大小和格式 GIF png jpg
      // console.log(file.file)
      // const isLimit = file.file.size / 1024 >= 30
      // if (isLimit) {
      //   this.$toast.fail('上传的图片不能超过30kb')
      //   return
      // }
      // // 限制图片的格式
      // const isGif = file.file.type === 'image/gif'
      // const isPng = file.file.type === 'image/png'
      // const isJpg = file.file.type === 'image/jpeg'
      // if (!(isGif || isPng || isJpg)) {
      //   this.$toast.fail('上传的图片只能是gif|png|jpg')
      //   return
      // }
      // const fd = new FormData()
      // fd.append('file', file.file)
      // const res = await this.$axios.post('/upload', fd)
      // console.log(res)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   console.log(data.url)
      //   // 长传头像不是直接修改头像 上传图片成功之后再去修改头像 还需要调用修改用户信息的接口
      //   this.editUser({
      //     head_img: data.url
      //   })
      // }
    },
    crop() {
      this.$refs.cropper.getCropBlob(async blob => {
        console.log(blob)
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          console.log(data.url)
          // 长传头像不是直接修改头像 上传图片成功之后再去修改头像 还需要调用修改用户信息的接口
          this.editUser({
            head_img: data.url
          })
          this.isShowMask = false
        }
      })
    },
    cancel() {
      this.isShowMask = false
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  padding: 30px 0;
  text-align: center;
  img {
    height: 70px;
    width: 70px;
    border-radius: 50%;
  }
}
.nav {
  padding-left: 20px;
}
.van-field {
  border: 1px solid #ccc;
}
// 深度选择器
/deep/ .van-dialog__content {
  padding: 10px;
}
.van-uploader {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  .van-button {
    position: absolute;
    top: 0;
    z-index: 999;
  }
  .van-button:nth-child(1) {
    left: 0;
  }
  .van-button:nth-child(2) {
    right: 0;
  }
}
</style>
