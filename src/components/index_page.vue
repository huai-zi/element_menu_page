<template>
  <div id="page">
    <el-container>
      <el-header class="text-left">
        <el-row :gutter="20">
          <el-col :xs='4' class="page_header move-down-appear text-left">
            系统
            <span class="pull-right goOut" @click='goOut()'>退出登陆</span>
          </el-col>
        </el-row>
      </el-header>
      <!--左侧标签栏-->

      <el-container style='margin-top: 60px;'>
        <el-aside width="200px" v-scroll_height="61">
          <el-row class="tac" onselectstart='return false'>
            <div class="clik_scole">
              <el-radio-group v-model="isCollapse">

                <span class="p-l-10">
                  <el-tooltip class="item" v-show='!cursor_back' effect="light" placement="right" content="展开菜单栏">
                    <el-radio-button class="right_click" :label="false" style='margin-left: -8px;'>
                      <i class="iconfont icon-zhankai" style='font-size: 15px;'></i>
                    </el-radio-button>

                  </el-tooltip>
                  <span v-show='cursor_back' style='display: inline-block;' class="m-t-10">菜单栏</span>
                </span>

                <el-tooltip class="item f_right" v-show='cursor_back' effect="light" content="缩小菜单栏" placement="right">
                  <el-radio-button :label="true" class="left_click" style='margin-left: 84px;'>
                    <i class="el-icon-back cursor"></i>
                  </el-radio-button>
                </el-tooltip>

              </el-radio-group>
            </div>
            <el-col :span="24">
              <!--默认选中,default-active可以使用getters的方法,counts和state方法一致-->
              <el-menu default-active="1" unique-opened class="el-menu-vertical-demo" :collapse="isCollapse" router>
                <NavMenu :navMenus="leftMenus"></NavMenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <!--内容显示-->
        <el-main class="content-body">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex';

  import NavMenu from './menu.vue';
  export default {
    name: "App",
    data() {
      return {
        isCollapse: false,
        cursor_back: true,
        active: '',
        editableTabs2: [{
          title: '首页',
          name: 'hz',
          content: '首页'
        }],
        tabIndex: 2,
        leftMenus: [{
            "id": 1,
            "parentMenuId": 0,
            "name": "home",
            "icon": "el-icon-message\r\n",
            "alias": "首页",
            "state": "/home",
            "sort": 0,
            "value": '/indexPage/homes',
            "childs": null
          },
          {
            "id": 2,
            "parentMenuId": 0,
            "name": "systemManage",
            "icon": "el-icon-message\r\n",
            "alias": "系统管理",
            "state": "ENABLE",
            "sort": 0,
            "value": null,
            "discription": "用于系统管理的菜单",
            "createUserId": 1,
            "childs": [{
                "id": 3,
                "parentMenuId": 2,
                "name": "authManage",
                "icon": "el-icon-loading",
                "alias": "部门管理",
                "state": "ENABLE",
                "sort": 0,
                "value": "/indexPage/page",
                "discription": "用于权限管理的菜单",
                "childs": null
              },
              {
                "id": 4,
                "parentMenuId": 2,
                "name": "roleManage",
                "icon": "el-icon-bell",
                "alias": "角色管理",
                "state": "ENABLE",
                "sort": 1,
                "value": "/indexPage/child",
                "discription": "用于角色管理的菜单",
                "childs": null
              },

            ]
          },
          {
            "id": 9,
            "parentMenuId": 0,
            "name": "systemManage1",
            "icon": "el-icon-message\r\n",
            "alias": "试卷管理",
            "state": "ENABLE",
            "sort": 0,
            "value": null,
            "discription": "用于系统管理的菜单",
            "childs": [{
                "id": 7,
                "parentMenuId": 9,
                "name": "authManage1",
                "icon": "el-icon-loading",
                "alias": "创建试卷",
                "state": "ENABLE",
                "sort": 0,
                "value": "/indexPage/create",
                "discription": "用于权限管理的菜单",
                "childs": null
              },
              {
                "id": 16,
                "parentMenuId": 9,
                "name": "roleManage1",
                "icon": "el-icon-bell",
                "alias": "试卷管理",
                "state": "ENABLE",
                "sort": 1,
                "value": "/indexPage/test",
                "discription": "用于角色管理的菜单",
                "childs": null
              },

            ]
          },

        ]
      }
    },
    methods: {
      add_clik() {
        //点击缩放导航
        var that = this;
        $('.left_click').click(function () {
          that.cursor_back = false;
          $('.el-aside').width('64');
          $('.el-main').addClass('page_top');
          $('.el-tabs--card > .el-tabs__header').addClass('page_tops');
        })
        $('.right_click').click(function () {
          that.cursor_back = true;
          $('.el-aside').width('200');
          $('.el-main').removeClass('page_top');
          $('.el-tabs--card > .el-tabs__header').removeClass('page_tops');
        })
      },
      getIndex(e) {

      },
      addTabs(e, targetName) {

      },
      goOut() {
        // 退出登陆
        this.$router.push('/login')
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.isfuActive.fuActive;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.fuModify(activeName);
                this.modify(activeName);
                if (activeName === 'hz') {
                  this.$router.replace('/indexPage/homes');
                } else {
                  this.$router.replace(activeName);
                }
              }
            }
          });
        }
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
        if (this.editableTabs2.length === 0) {
          this.modify('');
        }
      },
      tabFocu(e) {
        //选中按钮时触发
        this.fuModify(e.name);
        this.modify(e.name);
        if (e.name === 'hz') {
          this.$router.push({
            path: '/indexPage/homes'
          });
        } else {
          this.$router.push({
            path: e.name
          });
        }

      },
      ...mapMutations({
        modify: 'page/activeChange',
        fuModify: 'page/fuActive',
        loadName: 'page/loadTitle'
      })
    },
    components: {
      NavMenu: NavMenu
    },
    computed: {
      ...mapGetters({
        countsTwo: 'page/countsTwo', //表示的是this.$store.getters
        counts: 'page/counts', //表示的是this.$store.getters
        loadT: 'page/loadT'
      }),
      ...mapState({
        isfuActive: state => state.page
      })
    },
    mounted() {
      this.add_clik();

    },
    created() {
      const load = this.$route.path;
      if (load !== '/') {
        //回到首页
        // this.$router.replace('/');
        //刷新保留当前页,为一下方法
        // this.fuModify(load);
        // this.modify(load);
        // this.loadName(load);
        // this.editableTabs2[0].name = load;
        // this.editableTabs2[0].title = this.loadT;
      }
      //将首页关闭按钮进行隐藏
      let timeout = setTimeout(function () {
        $('#tab-hz').children('span.el-icon-close').hide();
        clearTimeout(timeout);
      }, 200);
      console.log(`%c 槐子(email:huaizio@163.com) %c`,
        "background:#41b883 ;text-align:center; padding: 1px; border-radius: 3px ;  color: #fff",
        "background:transparent")
    }
  };

</script>

<style>
  .clik_scole {
    height: 40px;
    line-height: 40px;
  }

  .el-aside {
    transition: all 600ms;
  }

  .content-body {
    width: calc(100% - 200px);
    height: 100%;
    /* padding-top: 70px; */
  }

  .goOut {
    cursor: pointer;
  }

  .goOut:hover {
    color: #d6d9db
  }

  #page {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    opacity: .9;
    color: #2c3e50;
    min-height: 100%;
    width: 100%;
    height: 100%;
  }

  .el-header,
  .el-footer {
    background-color: #004E90;
    color: #fff;
    text-align: center;
    line-height: 60px;
    height: 60px;
    position: fixed;
    width: 100%;
    z-index: 19;
  }

  .page_header {
    font-size: 20px;
    min-width: 900px;
  }

  .el-aside {
    overflow-x: hidden;
    background-color: #202020;
    color: #fff;
    line-height: 200px;
    position: fixed;
    z-index: 20;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    margin-left: 200px;
    -webkit-transition: all 600ms;
    -moz-transition: all 600ms;
    -ms-transition: all 600ms;
    -o-transition: all 600ms;
    transition: all 600ms;
  }

  .el-container {
    height: 100%;
  }

  .page_top {
    margin-left: 64px;
  }

  .page_tops {
    left: 64px !important;
  }

</style>
