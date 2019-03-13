//命名空间模块
export const ac = {
  namespaced: true,
  state: {
    coun: 666
  },
  getters: {
    childGetter() {
      return '我是模块内部的模块'
    }
  },
  mutations: {
    couna(state) {
        const ace = '我是子模块的数据哦'
        console.log(ace);//不需要返回值,直接进行逻辑运算
    }
  },
  actions: {
    roots(state, payload, rootState) {
      console.log(state);
      console.log(this);
      // console.log(this.getters['acc/ace/childGetter']);//全局的变量,使用this能够调用
      //console.log(state.getters.childGetter);//局部的变量,使用传参state进行调用
      this.commit('acc/ace/couna');
    }
  }
}
