<template>
  <div class="child">
    我是新的页面的数据{{datas}}
    <button @click.stop="aler($event)">点击弹窗</button>
    <button @click='dataDa($event)' data-da='333'>自定义属性</button>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    {{hz}}---{{xr}}
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">12</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">12</div>
      </el-col>
    </el-row>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
        <div class="col-sm">
          One of three columns
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  require("../../static/js/sweetalert.min");
  require("../../static/css/sweetalert.css");
  import {
    ca
  } from "../../static/js/new_butt";

  export default {
    name: "child",
    data() {
      return {
        datas: "",
        cc: "",
        js: 1
      };
    },
    props: {
      hz: String,
      xr: Number
    },
    watch: {},
    computed: {},
    methods: {
      aler(event, num) {
        console.log(this.cc.two());
        console.log($(event.currentTarget));
        console.log(event.target);
        swal("这是一条信息！");
      },
      dataDa(event) {
        console.log(event.target.getAttribute("data-da"));
        console.log(this);
      }
    },
    created() {
      this.cc = new ca();
      const cc = this.cc;
      console.log(this.js);
      this.js++;
    },
    // beforeRouteEnter(to, from, next) {
    //   //组件内守卫,该组件调用试,不能调用this,并没有创建资源成功,但是可以回掉函数获取
    //   next((vm) => {
    //     // console.log(vm.datas);
    //   });
    // },
    mounted() {
      // this.$http.get("https://jsonplaceholder.typicode.com/posts/1")
      //   .then((response) => {
      //     this.datas = response.data.title
      //   })
      //   .catch((data) => {
      //     alert('数据请求错误请刷新重试');
      //   })
    }
  };

</script>
<style scoped>
  button:focus {
    outline: none;
  }

</style>
