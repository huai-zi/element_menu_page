import Vue from 'vue';
//自定义标签元素,全局的自定以标签属性
//设置当前元素的盒子高度
export const directive = Vue.directive('scroll_height', (el, hei) => {
  el.style.height = "inherit";
  el.style.minHeight = $(window).height() - hei.value + "px";
});


export const dataIndex = Vue.directive('data_index', (el, hei) => {
  el.style.height = "inherit";
  el.style.minHeight = $(window).height() - hei.value + "px";
});
