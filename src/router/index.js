import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComment from '../views/MyComment.vue'
import MyStar from '../views/MyStar.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/user-edit', component: UserEdit, name: 'user-edit' },
    { path: '/myfollow', component: MyFollow },
    { path: '/mycomment', component: MyComment },
    { path: '/mystar', component: MyStar }
  ]
})

// 全局的导航守卫 (路由的钩子函数 beforeEach  afterEach)
// pages保存所有需要登录才能访问的页面
const pages = ['/user', '/user-edit', '/myfollow', '/mystart', 'mycomment']
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  // 要去的页面是 user页面， 就需要判断是否有token
  if (pages.includes(to.path)) {
    // 判断是否有token，如果没有token，去登录，如果有token，放走
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
