<template>
  <!--书写组件的内容-->
  <div id="sales">
    <el-button>添加</el-button>
    <el-button>删除</el-button>
    <el-button>查询</el-button>
    <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column prop="date" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  /*负责导出组件*/
  export default {
      name: 'sales',
      data() {
          return {
              tableData: [{
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
              }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
              }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
              }, {
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1516 弄'
              }]
          }
      },
      methods: {
          formatter(row) {
              return row.address
          }
      }
  }

</script>

<style scoped>
  /*编写只有这个组件使用的css代码*/

</style>
