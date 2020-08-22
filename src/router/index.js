import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '@/components/Login'
// import Home from '@/components/Home'
// import Welcome from '@/components/Welcome'
const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/Login')
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/Home')
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '@/components/Welcome')

// import Users from '@/components/user/Users'
// import Rights from '@/components/power/Rights'
// import Roles from '@/components/power/Roles'
const Users = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '@/components/user/Users')
const Rights = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '@/components/power/Rights')
const Roles = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '@/components/power/Roles')

// import Cate from '@/components/goods/Cate'
// import Params from '@/components/goods/Params'
// import List from '@/components/goods/List'
// import Add from '@/components/goods/Add'
const Cate = () => import(/* webpackChunkName:"Cate_Params_List_Add" */ '@/components/goods/Cate')
const Params = () => import(/* webpackChunkName:"Cate_Params_List_Add" */ '@/components/goods/Params')
const List = () => import(/* webpackChunkName:"Cate_Params_List_Add" */ '@/components/goods/List')
const Add = () => import(/* webpackChunkName:"Cate_Params_List_Add" */ '@/components/goods/Add')

// import Order from '@/components/order/Order'
// import Report from '@/components/report/Report'
const Order = () => import(/* webpackChunkName:"Order_Report" */ '@/components/order/Order')
const Report = () => import(/* webpackChunkName:"Order_Report" */ '@/components/report/Report')

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
      { path: '/users', component: Users},
      { path: '/rights', component: Rights},
      { path: '/roles', component: Roles},
      { path: '/categories', component: Cate},
      { path: '/params', component: Params},
      { path: '/goods', component: List},
      { path: '/goods/add', component: Add},
      { path: '/orders', component: Order},
      { path: '/reports', component: Report}
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
