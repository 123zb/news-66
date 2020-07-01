import Vue from 'vue'
import App from './App.vue'
import { Button } from 'vant'
import 'amfe-flexible'

//引入通用样式
import './styles/comment.less'
import './styles/iconfont.css'
import router from './router'

Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
