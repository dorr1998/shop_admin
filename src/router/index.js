import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Users from '@/components/Users'
import List from '@/components/List'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      // 嵌套路由1：通过children给某个路由配置子路由
      // 嵌套路由2：给子路由配置一个出口
      children: [{
          path: '/users',
          component: Users
        },
        {
          path: '/list',
          component: List
        }
      ]
    }
  ]
})
