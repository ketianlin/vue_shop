import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入tree-table组件
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
// 把组件绑定到Vue中
Vue.component('tree-table', TreeTable)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)
// 全局过滤器
Vue.filter('dateFormat', function(originVal) {

  const unixTimestamp = new Date(originVal*1000)
  // return unixTimestamp.toLocaleString()

  const y = unixTimestamp.getFullYear()
  const m = (unixTimestamp.getMonth() + 1 + '').padStart(2, '0')
  const d = (unixTimestamp.getDate() + '').padStart(2, '0')

  const hh = (unixTimestamp.getHours() + '').padStart(2, '0')
  const mm = (unixTimestamp.getMinutes() + '').padStart(2, '0')
  const ss = (unixTimestamp.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
