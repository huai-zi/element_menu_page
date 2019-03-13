// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  store
} from './store/store.js'
import axios from 'axios'

import './assets/css/base.css'
import './assets/css/common.less'

import './assets/iconfont/iconfont.css'
//按需引入数据
import Element from 'element-ui'

Vue.use(Element);

import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$http = axios;

// 设置为false 以阻止 VUE 在启动时生成生产提示
Vue.config.productionTip = false;
//全局守卫,页面加载的时候,监控路由是否相同
// router.beforeEach((to, from, next) => {
//使用过程为,先判断vuex里面一条数据,判断是否登陆
// console.log(to);
// if (to.path === '/page' || to.path === '/') {
//   next();//进行登陆,直接渲染界面
// } else {
//   alert('还没有登陆哦')
// }
// console.log(store.state.acc.active);
// });

//后置钩子,进入组件之后会调用钩子函数
// router.afterEach((to, from) => {
//   console.log(to);
//   console.log(from);
//   alert('after Each');
//
// })
/* eslint-disable no-new */
import './directive/directive.js';

new Vue({
  el: '#app',
  router,
  store: store,
  components: {
    App
  },
  template: '<App/>'
});
