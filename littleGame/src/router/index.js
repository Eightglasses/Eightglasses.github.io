import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import character from '@/components/character'
import Dungeons_list from '@/components/Dungeons_list'
import register from '@/components/register'
import main from '@/components/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/main',
      name: 'main',
      component: main
    }
  ]
})
