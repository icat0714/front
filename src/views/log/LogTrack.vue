<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>跟踪表登记</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="线路名称:">
        <el-input v-model="linename" placeholder="请输入线路名称"></el-input>
      </el-form-item>
      <el-form-item label="节点名称">
        <el-input v-model="nodename" placeholder="请输入节点名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="data1" style="width: 100%;" :border="true" max-height="550" align="center">
      <el-table-column prop="id" label="ID" min-width="50" align="center"></el-table-column>
      <el-table-column prop="linestatename" label="状态" min-width="50" align="center"></el-table-column>
      <el-table-column prop="linename" label="线路名称" min-width="80" align="center"></el-table-column>
      <el-table-column prop="carint" label="车号" min-width="70" align="center"></el-table-column>
      <el-table-column prop="describe" label="描述" min-width="90" align="center"></el-table-column>
      <el-table-column prop="nodename" label="节点名称" min-width="80" align="center"></el-table-column>
      <el-table-column prop="starttime" label="发车时间" min-width="100" align="center"></el-table-column>
      <el-table-column prop="arrivaltime" label="到达时间" min-width="100" align="center"></el-table-column>
      <el-table-column prop="nextnodeload" label="下节点可装载量" min-width="90" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="Delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background style="margin-top: 20px;" :current-page="page" :page-sizes="[1, 2, 3, 4]" :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!--对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="columnForm" ref="columnForm">
        <!--:model="bookForm" ref="bookForm" :rules="rules" -->
        <el-form-item label="序号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="columnForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="columnForm.linestate" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="线路名称" prop="linename" :label-width="formLabelWidth">
          <el-input v-model="columnForm.linename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="车号" prop="carint" :label-width="formLabelWidth">
          <el-input v-model="columnForm.carint" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe" :label-width="formLabelWidth">
          <el-input v-model="columnForm.describe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="节点名称" prop="nodename" :label-width="formLabelWidth">
          <el-input v-model="columnForm.nodename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发车时间" prop="starttime" :label-width="formLabelWidth">
          <el-input v-model="columnForm.starttime" type="date" placeholder="请选择发车时间" autocomplete="off"></el-input>
          <!-- <div class="block">
              <span class="demonstration">默认</span>
              <el-date-picker
                v-model="columnForm.starttime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div> -->
        </el-form-item>
        <el-form-item label="到达时间" prop="arrivaltime" :label-width="formLabelWidth">
          <el-input v-model="columnForm.arrivaltime" type="date" placeholder="请选择到达时间" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下节点可装载量" prop="nextnodeload" :label-width="formLabelWidth">
          <el-input v-model="columnForm.nextnodeload" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'LogTrack',
    data: function() {
      return {
        port: null,
        result: [],
        data1: [],
        total: 2,
        page: 1,
        rows: 2,
        id: null,
        linestatename: null,
        linename: null,
        carint: null,
        describe: null,
        nodename: null,
        starttime: null,
        arrivaltime: null,
        nextnodeload: null,
        dialogFormVisible: false,
        doSubmit: '',
        title: '添加',
        rules: {
          linestate: [{
            required: true,
            message: '状态不能为空',
            trigger: 'change'
          }],
          linename: [{
            required: true,
            message: '线路名称不能为空',
            trigger: 'change'
          }],
          carint: [{
            required: true,
            message: '车号不能为空',
            trigger: 'change'
          }]
        },
        formLabelWidth: "120px",
        columnForm: {
          id: null,
          linestate: null,
          linename: null,
          carint: null,
          describe: null,
          nodename: null,
          starttime: null,
          arrivaltime: null,
          nextnodeload: null
        }
      }
    },
    methods: {
      onSubmit: function() {
        this.data1 = this.result;
        if (this.linename == null && this.nodename == null) {
          this.findAll();
        }
        if (this.nodename != null && this.nodename != "") {
          this.data1 = this.data1.filter(c => c.nodename.indexOf(this.nodename) != -1);

        }
        if (this.linename != null && this.linename != "") {
          this.data1 = this.data1.filter(f => f.linename.indexOf(this.linename) != -1);
        }
      },
      /* add: function() {

      } */

      /* 删除 */
      Delete: function(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = 'http://localhost:/logTrack/delectLogTrackByid';
          let pages = {
            id: row.id,
          }
          axios.post(url, qs.stringify(pages)).then(resp => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.findAll();
          }).catch(error => {
            console.log("删除失败");
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });


        });

      },
      /* 添加方法 */
      add: function() {

        this.title = "添加栏目"
        this.columnForm.linestate = null;
        this.columnForm.linename = null;
        this.columnForm.carint = null;
        this.columnForm.describe = null;
        this.columnForm.nodename = null;
        this.columnForm.starttime = null;
        this.columnForm.arrivaltime = null;
        this.columnForm.nextnodeload = null;
        this.dialogFormVisible = true;
      },
      doSubmit: function() {
        let page = {
          LINESTATE: this.columnForm.linestate,
          LINENAME: this.columnForm.linename,
          CARINT: this.columnForm.carint,
          DESCRIBE: this.columnForm.describe,
          NODENAME: this.columnForm.nodename,
          STARTTIME: this.columnForm.starttime,
          ARRIVALTIME: this.columnForm.arrivaltime,
          NEXTNODELOAD: this.columnForm.nextnodeload

        }
        this.$refs['columnForm'].validate((valid) => {
          let url = 'http://localhost:/logTrack/insert';
          axios.post(url, qs.stringify(page)).then(resp => {
            console.log(resp)
            this.dialogFormVisible = false; //隐藏
            this.findAll();
          }).catch(error => {
            console.log("失败");
          });
        });

      },
      findAll: function() {
        let url = 'http://localhost:/logTrack/findAll';
        axios.post(url, null).then(resp => {
          this.result = resp.data
          this.data1 = resp.data
        }).catch(error => {
          console.log(error);
        });
      }
    },
    created: function() {
      this.findAll();
    }
  }
</script>

<style>
  .divClass {
    margin-top: 15px;
    margin-left: 15px;
  }
</style>
