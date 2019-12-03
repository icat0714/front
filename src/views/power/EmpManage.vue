<template>
  <div>
    <!--搜索框           -->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">员工管理</el-divider>
      <el-form-item label="员工姓名:">
        <el-input v-model="empname" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-button type="primary" @click="handleInsert" icon="el-icon-plus">新增</el-button>
      <!--数据表格-->
      <el-table :data="data" style=" margin-top:10px;width: 100%;" tooltip-effect="dark" :border="true" max-height="550">
        <el-table-column prop="id" label="编号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="empname" label="用户名" min-width="50" align="center"></el-table-column>
        <el-table-column prop="roleid" label="角色" min-width="50" align="center"></el-table-column>
        <el-table-column prop="disabled" label="状态" min-width="40" align="center"></el-table-column>
        <el-table-column prop="empno" label="工号" min-width="50" align="center" v-if="show"></el-table-column>
        <el-table-column prop="empunit" label="所属单位" min-width="50" align="center" v-if="show"></el-table-column>
        <el-table-column prop="pwd" label="密码" min-width="40" align="center" v-if="show"></el-table-column>
        <el-table-column prop="querypwd" label="查台密码" min-width="40" align="center" v-if="show"></el-table-column>
        <el-table-column prop="" label="操作" min-width="70" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- 新增-->
    <el-dialog title="员工新增" style="width: 1400px;" :visible.sync="dialogFormVisible" @close="cleanForm">
      <el-form :model="empFrom" ref="empFrom">
        <el-row type="flex">
          <el-col>
            <el-form-item label="员工姓名" prop="empname" :label-width="formLabelWidth">
              <el-input v-model="empFrom.empname" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="员工角色" prop="roleid" :label-width="formLabelWidth">
              <el-input v-model="empFrom.roleid" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="密码" prop="pwd" :label-width="formLabelWidth">
              <el-input type="password" v-model="empFrom.pwd" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="查台密码" prop="querypwd" :label-width="formLabelWidth">
              <el-input type="password" v-model="empFrom.querypwd" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="工号" prop="empno" :label-width="formLabelWidth">
              <el-input v-model="empFrom.empno" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
              <el-input v-model="empFrom.remark" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="状态" prop="disabled" :label-width="formLabelWidth">
              <el-input v-model="empFrom.disabled" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="所属部门" prop="empunit" :label-width="formLabelWidth">
              <el-input v-model="empFrom.empunit" autocomplete="off" style="width: 200px;"></el-input>
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
    <el-dialog title="员工修改" style="width: 1400px;" :visible.sync="dialogFormVisible1" @close="cleanForm">
      <el-form :model="empFrom" ref="empFrom">
        <el-row type="flex">
             <el-form-item label="员工编号" prop="id" :label-width="formLabelWidth" v-if="show">
               <el-input v-model="empFrom.id" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          <el-col>
            <el-form-item label="员工姓名" prop="empname" :label-width="formLabelWidth">
              <el-input v-model="empFrom.empname" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="员工角色" prop="roleid" :label-width="formLabelWidth">
              <el-input v-model="empFrom.roleid" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="密码" prop="pwd" :label-width="formLabelWidth">
              <el-input type="password" v-model="empFrom.pwd" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="查台密码" prop="querypwd" :label-width="formLabelWidth">
              <el-input type="password" v-model="empFrom.querypwd" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="工号" prop="empno" :label-width="formLabelWidth">
              <el-input v-model="empFrom.empno" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
              <el-input v-model="empFrom.remark" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="状态" prop="disabled" :label-width="formLabelWidth">
              <el-input v-model="empFrom.disabled" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="所属部门" prop="empunit" :label-width="formLabelWidth">
              <el-input v-model="empFrom.empunit" autocomplete="off" style="width: 200px;"></el-input>
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
        data: [],
        result: [],
        empname: null,
        show:null,
        dialogFormVisible: false,
        dialogFormVisible1: false,
        formLabelWidth: "90px",
        empFrom: {
          id: null,
          empname: null,
          empno: null,
          pwd: null,
          querypwd: null,
          roleid: null,
          remark: null,
          disabled: null,
          empunit: null

        }
      }
    },
    created: function() {
      let url = 'http://localhost/Emp/getList';
      axios.post(url, null).then(resp => {
        this.result = resp.data;
        this.data = resp.data;
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      //修改框显示   赋值
      handleEdit: function(row) {
        this.dialogFormVisible1=true;
        this.empFrom.empname=row.empname;
        this.empFrom.empno=row.empno;
        this.empFrom.pwd=row.pwd;
        this.empFrom.querypwd=row.querypwd;
        this.empFrom.roleid=row.roleid;
        this.empFrom.empunit=row.empunit;
        this.empFrom.remark=row.remark;
        this.empFrom.disabled=row.disabled;
        this.empFrom.id=row.id;
      },
      //新增框显示
      handleInsert: function() {
        this.dialogFormVisible = true;
      },
      //删除
      handleDelete: function(row) {
        let params = {
          ID: row.id
        }
        let url = 'http://localhost/Emp/deleteEmp';
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          //ajax提交数据
          axios.post(url, qs.stringify(params)).then(resp => {
            if (resp.data != null) {
              let url = 'http://localhost/Emp/getList';
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
      doSubmit: function() {
        this.data = this.result;
        if (this.empname != null && this.empname != "") {
          this.data = this.data.filter(b => b.empname.indexOf(this.empname) != -1);
        }
        return this.data;
      },
      //新增提交
      doSubmit1: function() {
        this.$refs['empFrom'].validate((valid) => {
          if (valid) {
            let url = 'http://localhost/Emp/insertEmp';
            let params = {
              EMPNAME: this.empFrom.empname,
              EMPNO: this.empFrom.empno,
              PWD:this.empFrom.pwd,
              QUERYPWD:this.empFrom.querypwd,
              ROLEID:this.empFrom.roleid,
              EMPUNIT:this.empFrom.empunit,
              REMARK:this.empFrom.remark,
              DISABLED:this.empFrom.disabled
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible = false;
              this.cleanForm();
              if (resp.data != null) {
                let url = 'http://localhost/Emp/getList';
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
      doSubmit2: function() {
        this.$refs['empFrom'].validate((valid) => {
          if (valid) {
            let url = 'http://localhost/Emp/updateEmp';
            let params = {
              EMPNAME: this.empFrom.empname,
              EMPNO: this.empFrom.empno,
              PWD:this.empFrom.pwd,
              QUERYPWD:this.empFrom.querypwd,
              ROLEID:this.empFrom.roleid,
              EMPUNIT:this.empFrom.empunit,
              REMARK:this.empFrom.remark,
              DISABLED:this.empFrom.disabled,
              ID:this.empFrom.id
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible1 = false;
              this.cleanForm();
              if(resp.data!=null){
                let url = 'http://localhost/Emp/getList';
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
      },
      //清空表单
      cleanForm:function(){

      }
    }
  }
</script>

<style scoped>
</style>
