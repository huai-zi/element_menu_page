<template>
  <div id="home">
    <!-- 顶部栏 end-->
    <!-- 效果图 start-->
    <el-row type="flex" class="row-bg cont" :gutter="10" justify="space-between">
      <!-- 表格数据 -->
      <el-col>
        <el-button type="primary" @click="fadeIn(0)">添加数据</el-button>
        <el-button type="danger" @click="deletData">删除选中数据</el-button>
        <!-- 表格参数 -->
        <el-table ref="multipleTable" :data="tableData3" style="width: 100%;" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="avgTemperature" label="平均气温"> </el-table-column>
          <el-table-column prop="transpirationRate" label="蒸散速率">
          </el-table-column>
          <el-table-column prop="detectionDate" class="text-center" label="检测时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页标签 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="10" layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 效果图 end-->
    <!-- 内容展示模态框 -->
    <div class="content_modal" v-show="modalFlages">
      <div class="contents">
        <!-- 内容展示  start-->
        <h4>
          <span>{{ modalHead }}</span>
          <strong class="f_right" @click="fadeOut()">x</strong>
        </h4>
        <!-- 添加数据 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="检测时间" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" value-format="yyyy-MM-dd" style="width: 100%;"
                  @change="getTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" value-format="HH:mm:ss"
                  style="width: 100%;" @change="getTime1"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="平均气温" prop="avgTemperature">
            <el-input v-model="ruleForm.avgTemperature"></el-input>
          </el-form-item>
          <el-form-item label="蒸散速率" prop="transpirationRate">
            <el-input v-model="ruleForm.transpirationRate"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="fadeOut()">取消</el-button>
            <el-button type="primary" v-show="fale" @click="onSubmit('ruleForm',0)">保存</el-button>
            <el-button type="primary" v-show="!fale" @click="onSubmit('ruleForm',1)">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 内容展示  end-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {

        api: {
          add: 'http://129.204.96.158:6011/newfiber_haimian/meteorologicalData/addInfo',
          delet: 'http://129.204.96.158:6011/newfiber_haimian/meteorologicalData/deleteInfo',
          edit: 'http://129.204.96.158:6011/newfiber_haimian/meteorologicalData/updateInfo',
          get: 'http://129.204.96.158:6011/newfiber_haimian/meteorologicalData/getInfos',
          getLook: 'http://129.204.96.158:6011/newfiber_haimian/weatherStation/getInfos',
        },
        headTitleH4: '气象站热岛效应数据',
        modalFlages: false,
        modalHead: '', //模态框头部名称
        tableData: ['新增数据', '删除数据', '修改数据'],
        tableName: '',
        dateEchart: [], //天然水域面积比时间展示
        myCharts: '', //记录适应效果
        trsyFlage: false,
        tableData3: [{
          "detectionDate": "20", //年月
          "avgTemperature": "1", //平均气温
          "transpirationRate": "0." //蒸散速率
        }],
        multipleSelection: [],
        currentPage3: 1,
        fale: true,
        total: 1,
        options: [{
          sectionNo: '',
          sectionName: ''
        }],
        value: '',
        ruleForm: {
          avgTemperature: '',
          transpirationRate: '',
          date2: '',
          date1: '',
        },
        rules: {
          avgTemperature: [{
            required: true,
            message: '请输入平均气温',
            trigger: 'change'
          }],
          transpirationRate: [{
            required: true,
            message: '请输入蒸散速率',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
      getTime(val) {
        // 日期格式转换,将年月日转换成YYYY-MM-RR
        const d = new Date(val);
        let da = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        this.ruleForm.date1 = val;
      },
      getTime1(val) {
        // 时分秒的转换格式
        const d = new Date(val);
        var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() +
          ':' + d.getSeconds();
        this.ruleForm.date2 = val;
      },
      data_getLook() {
        /**
         * 查询数据,填充下拉框
         * @param {number} currentPage 当前页面数
         */
        this.httpPost(this.api.getLook, {
          "data": {},
          "current": 1,
          "size": 10000
        }).then(response => {
          this.options = response.data.data.records;
        })
      },
      handleClick(row) {
        /**
         * 修改数据
         * @param {object} row 当前行的参数列
         * @overview 
         */
        this.fadeIn(2);

        let rows = {
          transpirationRate: row.transpirationRate,
          avgTemperature: row.avgTemperature,
          date1: row.detectionDate.split(' ')[0],
          date2: row.detectionDate.split(' ')[1],
          serial: row.serial,
        }
        this.ruleForm = rows;
      },
      onSubmit(formName, flage) {
        /**
         * 添加数据和修改数据
         * @param {object} formName 列表名称
         * @param {object} flage 添加数据和修改数据的区别符号
         */
        let [api, iden] = ['', ''];
        api = flage === 0 ? this.api.add : this.api.edit;
        // 修改成功返回的code数值
        iden = flage === 0 ? 2019 : 2021;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交成功
            let ct = {
              avgTemperature: this.ruleForm.avgTemperature,
              detectionDate: this.ruleForm.date1 + ' ' + this.ruleForm.date2,
              transpirationRate: this.ruleForm.transpirationRate,
              serial: this.ruleForm.serial,
            };
            let datas = {
              data: ct
            };
            this.httpPost(api, datas).then(response => {
              if (response.data.code === iden) {
                this.$message({
                  type: "success",
                  message: '操作成功'
                })
                // 清空表中数据
                // this.resetForm('ruleForm');
                this.handleCurrentChange(1);
              } else {
                this.$message({
                  type: "error",
                  message: '添加失败'
                })
              }
            })
            // 关闭弹框
            this.fadeOut();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      fadeOut() {
        // 模态框隐藏
        document.querySelector('.content_modal').classList.add('fadei');
        document.querySelector('.content_modal').classList.remove('fadeI');
      },
      fadeIn(index) {
        /**
         * 显示模态框
         * @param {number} index 当前点击展示图片的索引
         */
        if (index === 0) {
          // 新增数据
          this.ruleForm.date1 = ''
          this.ruleForm.date2 = ''
          this.resetForm('ruleForm');
          this.fale = true;

        } else {
          // 修改数据
          this.fale = false;
        }
        // 设置图表展示区域宽高
        this.modalFlages = true;
        document.querySelector('.content_modal').classList.add('fadeI');
        document.querySelector('.content_modal').classList.remove('fadei');
        this.modalHead = this.tableData[index];
      },
      httpGet(url) {
        return new Promise((resolve, reject) => {
          this.$http.get(url)
            .then(res => {
              resolve(res);
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
            })
            .catch(response => {
              this.$message({
                type: 'error',
                message: '请求失败,请通知管理员'
              });
              reject(response);
            });
        });
      },
      httpPost(url, rqs) {
        return new Promise((resolve, reject) => {
          this.$http.post(url, rqs)
            .then(res => {
              resolve(res);
            })
            .catch(response => {
              this.$message({
                type: 'error',
                message: '请求失败,请通知管理员'
              });
              reject(response);
            });
        });
      },
      toggleSelection(rows) {
        // 默认选中
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      deletData() {
        // 删除记录
        this.$confirm('确认删除选中记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let serial = [];
          this.multipleSelection.forEach(row => {
            serial.push(row['serial'].toString())
          })
          if (serial.length === 0) {
            this.$message({
              type: 'info',
              message: '请选择要删除的数据!'
            });
            return false
          }
          serial = {
            data: {
              serial: serial
            }
          }
          this.httpPost(this.api.delet, serial).then(response => {
            if (response.data.code === 2023) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.handleCurrentChange(1);
              this.data_getLook();
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {

        });
      },
      handleSelectionChange(val) {
        // 删除数据记录
        console.log(val);
        this.multipleSelection = val;
        // this.multipleSelection.push(val[val.length - 1]);
      },
      handleCurrentChange(val) {
        // 分页框跳转
        this.data_get(val);
        this.currentPage3 = val;
      },
      data_get(currentPage) {
        /**
         * 查询数据
         * @param {number} currentPage 当前页面数
         */
        this.httpPost(this.api.get, {
          "data": {},
          "current": 1,
          "size": 10
        }).then(response => {
          this.total = response.data.data.total;
          this.tableData3 = response.data.data.records;
        })
      },
      init() {
        // 初始化函数
        this.handleCurrentChange(1);
        this.data_getLook()
      }
    },
    mounted: function () {
      this.init()
    }
  }

</script>

<style>
  .el-pager li {
    transform: translateY(10px);
  }

  /* 内容展示模态框 */
  .content_modal {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content_modal .contents {
    position: relative;
    width: 40%;
    margin: 0 auto;
    /* height: 80%; */
    background-color: #fff;
    min-width: 350px;
    padding: 15px;
  }

  .content_modal .contents h4 {
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #CCCCCC;
    margin-bottom: 15px;
  }

  .content_modal .contents h4 span {
    font-size: 20px;
    color: #1B7CF5;
    text-decoration: underline;
  }

  .content_modal .contents h4 strong {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: #fff;
    background-color: #1B7CF5;
    text-align: center;
    cursor: pointer;
  }

  .content_modal .content_charts_table {
    height: calc(100% - 47px);
    width: 100%;
    overflow: hidden;
  }

  .content_modal .content_charts_table .content_charts {}

  .content_modal .content_charts_table .contetn_table {
    height: 30%;
    overflow-y: auto;
    padding: 15px;
  }

  /* 模态框隐藏 */
  .fadei {
    animation: fadeOut ease-in .5s;
    animation-fill-mode: forwards;
  }

  /* 模态框入场动画 */
  .fadeI {
    animation: fadeIn ease-in .6s;
    animation-fill-mode: forwards;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateX(0) translatey(0) rotate(0deg);
    }

    to {
      transform: translateX(-2000px) translatey(-1500px) rotate(480deg);
      opacity: 0;
      display: none;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-2000px) translatey(-1500px) rotate(480deg);
      display: block;
    }

    to {
      transform: translateX(0) translatey(0) rotate(0deg);
      opacity: 1;
    }
  }

  /* 浏览器滚动条样式 */

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: #999999;
    -webkit-border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
  }

  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }

  .el-pagination button,
  .el-pagination__jump {
    transform: translateY(10px);
  }

</style>
