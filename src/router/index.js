import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/index_page'
import child from '@/components/child'
import test from '@/components/test'
import page from '@/components/page'
import section from '@/components/section'
import create from '@/components/create'
import homes from '@/components/homes'
import login from '@/components/login'
import system from '@/components/system'
import sales from '@/components/sales'
import personal from '@/components/personal'

Vue.use(Router);
//页面路由
//全局守卫


export default new Router({
  //mode: 'history',
  routes: [{
      path: "/login",
      name: "login",
      component: login
    }, {
      path: '/indexPage',
      name: 'indexPage',
      component: indexPage,
      redirect: '/indexPage/homes', //默认子路由设置
      children: [{
          path: "/indexPage/homes",
          name: "homes",
          component: homes
        },
        {
          path: "/indexPage/child",
          name: "child",
          component: child
        },
        {
          path: "/indexPage/page",
          name: "page",
          component: page
        },
        {
          path: "/indexPage/system",
          name: "system",
          component: system
        },
        {
          path: "/indexPage/personal",
          name: "personal",
          component: personal
        },
        {
          path: "/indexPage/sales",
          name: "sales",
          component: sales
        },
        {
          path: "/indexPage/test",
          name: "test",
          component: test
        },
        {
          path: "/indexPage/create",
          name: "create",
          component: create
        },
        {
          path: "/indexPage/section",
          name: "section",
          component: section
        }
      ]
    },
    {
      path: '/',
      redirect: 'login'
    },
  ]
})
