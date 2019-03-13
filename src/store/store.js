import Vue from 'vue'
import Vuex from 'vuex'
import {
  ac
} from './child_store.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    page: {
      //实例属性
      namespaced: true, //规定命名,为自定义命名
      state: { //存储数据
        count: 0,
        active: 'hz', //点击左侧菜单栏记录
        fuActive: 'hz', //副标题的默认选中状态
        loadName: { //副标题名称出现状态
          'hz': '首页',
          '/indexPage/child': '个人资料管理',
          '/indexPage/page': '日程管理',
          '/indexPage/section': '销售管理',
          '/indexPage/create': '产品管理',
          '/indexPage/system': '系统管理',
          '/indexPage/personal': '个人资料管理',
          '/indexPage/sales': '销售管理',
          '/indexPage/test': '客户管理'
        },
        loadTi: ''
      },
      getters: {
        //获取数据
        counts(state) {
          return state.active
        },
        countsTwo(state) {
          const data = state.fuActive
          return data
        },
        loadT(state) {
          const data = state.loadTi
          return data
        }
      },
      mutations: {
        //处理方法,这里执行请求,会出现延迟出现的效果,在methods中,通过this.$store.commit('activeChange', 10)进行调用方法,后面为参数,前面为函数名
        activeChange(state, index) {
          //index为左侧菜单栏目录值
          state.active = index;
        },
        fuActive(state, payload) {
          state.fuActive = payload;
        },
        loadTitle(state, payload) {
          const lo = state.loadName[payload];
          state.loadTi = lo;
        }
      },
      actions: {
        datas(context, payload) {
          //执行异步请求的时候,能够同时出现在vue的函数监控列表中,在mutaions中则不能,在methods通过dispatch对actions中的方法进行调用
          context.state.count++

        },
        twos(context, payload) {
          console.log(context);
        },
        activeChange(context, payload) {
          //index为改变路径的值
          console.log(context);
          console.log(payload);
          // context.active = payload;
          // console.log(payload);
        }
      },
      modules: {
        ace: ac
      }
    }
  }
})
