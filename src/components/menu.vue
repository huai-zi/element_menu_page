<template>
  <div class="navMenu">
    <label v-for="navMenu in navMenus">
      <!-- 多级菜单 -->
      <el-menu-item
        v-if="navMenu.childs==null"
        :key="navMenu.id"
        :data="navMenu"
        :index="navMenu.name"
        :route="navMenu.value"
      >
        <i :class="navMenu.icon"></i>
        <span slot="title" class="p-l-20">{{navMenu.alias}}</span>
      </el-menu-item>

      <el-submenu
        v-if="navMenu.childs!==null"
        :key="navMenu.id"
        :data="navMenu"
        :index="navMenu.name"
      >
        <template slot="title">
          <i :class="navMenu.icon"></i>
          <span class="p-l-20"> {{navMenu.alias}}</span>
        </template>
        <navMenu :navMenus="navMenu.childs"></navMenu>
      </el-submenu>

    </label>

  </div>
</template>
<script>
import navMenu from './menu.vue';
export default {
  name: 'NavMenu',
  props: ['navMenus'],
  data () {
    return {}
  },
  components: {
    navMenuc: navMenu
  },
  mounted () {
  },
  methods: {}
}

</script>

<style scoped>
</style>
