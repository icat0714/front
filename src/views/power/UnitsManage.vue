<template>
  <div>
    <!--搜索框           -->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">单位管理</el-divider>
      <el-form-item label="单位名称:">
        <el-input v-model="name" placeholder="请输入单位名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-button type="primary" @click="handleInsert" icon="el-icon-plus">新增</el-button>
      <!--数据表格-->
      <el-table :data="data" style=" margin-top:10px;width: 100%;" tooltip-effect="dark" :border="true" max-height="550">
        <el-table-column prop="id" label="编号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="name" label="单位名称" min-width="50" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注" min-width="50" align="center"></el-table-column>
        <el-table-column prop="operatorid" label="操作人员编号" min-width="40" align="center"></el-table-column>
        <el-table-column prop="operationtime" label="操作时间" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="操作" min-width="70" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- 新增-->
    <el-dialog title="单位新增" style="width: 1400px;" :visible.sync="dialogFormVisible" @close="cleanForm">
       <el-form :model="unitsFrom" ref="unitsFrom" >
        <el-row type="flex">
          <el-col >
              <el-form-item label="单位名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="unitsFrom.name" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="备注" prop="remarks" :label-width="formLabelWidth">
                 <el-input v-model="unitsFrom.remarks" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
              <el-form-item label="操作人" prop="operatorid" :label-width="formLabelWidth">
                <el-input v-model="unitsFrom.operatorid" autocomplete="off" style="width: 200px;" :readonly="readonly"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="doSubmit1">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 修改-->
    <el-dialog title="单位修改" style="width: 1400px;" :visible.sync="dialogFormVisible1" @close="cleanForm">
       <el-form :model="unitsFrom" ref="unitsFrom" >
        <el-row type="flex">
          <el-col >
            <el-form-item label="编号" prop="id" :label-width="formLabelWidth" v-if="show">
              <el-input v-model="unitsFrom.id" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
              <el-form-item label="单位名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="unitsFrom.name" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="备注" prop="remarks" :label-width="formLabelWidth">
                 <el-input v-model="unitsFrom.remarks" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
              <el-form-item label="操作人" prop="operatorid" :label-width="formLabelWidth">
                <el-input v-model="unitsFrom.operatorid" autocomplete="off" style="width: 200px;" :readonly="readonly"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
       </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="doSubmit2">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'Units',
    data: function() {
      return {
        data:[],
        result:[],
        name:null,
        readonly:true,
        formLabelWidth:"90px",
        dialogFormVisible:false,
        dialogFormVisible1:false,
        show:null,
        unitsFrom:{
          id:null,
          name:null,
          remarks:null,
          operatorid:null,
          operationtime:null
        },
        user: {
          id: null,
          empunit: null,
          remark: null,
          empno: null,
          pwd: null,
          disabled: null,
          empname: null,
          roleid: null,
          querypwd: null
        }
      }
    },
    created:function(){
      this.user = JSON.parse(sessionStorage.getItem("user"));
      let url = 'http://localhost/Unit/findAll';
      axios.post(url, null).then(resp => {
        this.result = resp.data;
        this.data = resp.data;
      }).catch(error => {
        console.log(error);
      });
    },
    methods:{
      //修改框显示   赋值
      handleEdit:function(row){
        this.dialogFormVisible1=true;
        this.unitsFrom.id=row.id;
        this.unitsFrom.name=row.name;
        this.unitsFrom.remarks=row.remarks;
        this.unitsFrom.operatorid=this.user.empname;
      },
      //新增框显示
      handleInsert:function(){
        this.dialogFormVisible=true;
        this.unitsFrom.operatorid=this.user.empname;
      },
      //删除
      handleDelete:function(row){
        let params = {
          ID: row.id
        }
        let url = 'http://localhost/Unit/deleteUnits';
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          //ajax提交数据
          axios.post(url, qs.stringify(params)).then(resp => {
            if (resp.data != null) {
              let url = 'http://localhost/Unit/findAll';
              axios.post(url, null).then(resp => {
                this.result = resp.data;
                this.data = resp.data;
              }).catch(error => {
                console.log(error);
              });
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }).catch(error => {
            console.log("出错了");
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //查询
      doSubmit:function(){
        this.data = this.result;
        if (this.name != null && this.name != "") {
          this.data = this.data.filter(b => b.name.indexOf(this.name) != -1);
        }
        return this.data;
      },
      cleanForm:function(){
        this.unitsFrom.name=null;
        this.unitsFrom.remarks=null;
        this.unitsFrom.operatorid=null;
      },
      //新增提交
      doSubmit1:function(){
        this.$refs['unitsFrom'].validate((valid) => {
          if (valid) {
            let url = 'http://localhost/Unit/insertUnits';
            let params = {
              NAME:this.unitsFrom.name,
              REMARKS:this.unitsFrom.remarks,
              OPERATORID:this.user.empno
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible = false;
              this.cleanForm();
              if (resp.data != null) {
                let url = 'http://localhost/Unit/findAll';
                axios.post(url, null).then(resp => {
                  this.result = resp.data;
                  this.data = resp.data;
                }).catch(error => {
                  console.log(error);
                });
                this.$message({
                  type: 'success',
                  message: '新增成功!'
                });
              }
            }).catch(error => {
              console.log("出错了");
            });
          } else {
            console.log('新增失败');
            return false;
          }
        });
      },
      //修改提交
      doSubmit2:function(){
        this.$refs['unitsFrom'].validate((valid) => {
          if (valid) {
            let url = 'http://localhost/Unit/updateUnits';
            let params = {
              NAME:this.unitsFrom.name,
              REMARKS:this.unitsFrom.remarks,
              OPERATORID:this.user.empno,
              ID:this.unitsFrom.id
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible1 = false;
              this.cleanForm();
              if(resp.data!=null){
                let url = 'http://localhost/Unit/findAll';
                axios.post(url, null).then(resp => {
                  this.result = resp.data;
                  this.data = resp.data;
                }).catch(error => {
                  console.log(error);
                });
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
              }
            }).catch(error => {
              console.log("出错了");
            });
            } else {
            console.log('修改失败');
            return false;
            }
        });
      }
    }
  }
</script>

<style scoped>
</style>
