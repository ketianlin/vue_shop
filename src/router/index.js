import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { 
    path: '/home', 
    name: 'Home', 
    component: Home, 
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome},
      { path: '/users', component: Users}
    ] 
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径 
  // from 代表从哪一个路径跳转而来
  // next() 放行 next('/login') 强制跳转
  if(to.path === '/login'){
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if(!token){
    return next('/login')
  }
  next()
})

export default router
