import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'

// 引入通用样式
import './styles/comment.less'
import './styles/iconfont.css'
import router from './router'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmNavBar from './components/HmNavBar.vue'

import axios from 'axios'
import moment from 'moment'
import './vant'
import { Toast } from 'vant'
// 把axios挂载到原型上
Vue.prototype.$axios = axios
// 配置axios的默认基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// 给axios配置请求拦截器
axios.interceptors.request.use(function(config) {
  // 浏览器发送的ajax请求的所有的配置信息
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // token失效导致
    Toast.fail(message)
    // 跳转到登录页面
    router.push('/login')
    // 删除过期的token
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  return res
})

// 全局注册组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navbar', HmNavBar)

Vue.config.productionTip = false

// 定义全局过滤器
Vue.filter('time', function(input, str = 'YYYY-MM-DD') {
  return moment(input).format(str)
})

// 给vue的原型添加一个方法，这个方法用于处理图片的地址
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
