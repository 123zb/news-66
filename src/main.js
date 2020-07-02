import Vue from 'vue'
import App from './App.vue'
import { Button, Field, Form, Toast } from 'vant'
import 'amfe-flexible'

// 引入通用样式
import './styles/comment.less'
import './styles/iconfont.css'
import router from './router'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'

// 全局注册组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)

Vue.use(Button)
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
