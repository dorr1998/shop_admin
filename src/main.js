// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 1.把axios绑定到vue的原型上
import axios from 'axios'
Vue.prototype.axios = axios

// 2.配置axios的baseURL
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 3.配置拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem('token')
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }),
  axios.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    return res.data
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })


// 导入公共样式
import '@/assets/common.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
