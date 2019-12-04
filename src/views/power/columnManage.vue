<template>
  <div>
    <!--搜索框           -->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">栏目管理</el-divider>
      <el-form-item label="栏目名称:">
        <el-input v-model="text" placeholder="请输入栏目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-button type="primary" @click="handleInsert" icon="el-icon-plus">新增</el-button>
      <!--数据表格-->
      <el-table :data="data" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="id" label="编号" min-width="30" align="center"></el-table-column>
        <el-table-column prop="parentid" label="上级栏目" min-width="50" align="center">
          <template slot-scope="scope">
              <p v-if="scope.row.parentid==null">无</p>
              <p v-if="scope.row.parentid!=''">{{scope.row.parentid}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="栏目类型" min-width="40" align="center"></el-table-column>
        <el-table-column prop="text" label="栏目名称" min-width="40" align="center"></el-table-column>
        <el-table-column prop="url" label="栏目地址" min-width="80" align="center"></el-table-column>
        <el-table-column prop="tip" label="栏目提示语" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="操作" min-width="70" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- 新增-->
    <el-dialog title="栏目新增" style="width: 1400px;" :visible.sync="dialogFormVisible" @close="cleanForm">
       <el-form :model="menuFrom" ref="menuFrom" >
        <el-row type="flex">
          <el-col >
              <el-form-item label="栏目类型" prop="type" :label-width="formLabelWidth">
                <el-input v-model="menuFrom.type" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="栏目名称" prop="text" :label-width="formLabelWidth">
                 <el-input v-model="menuFrom.text" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
              <el-form-item label="栏目提示语" prop="tip" :label-width="formLabelWidth">
                <el-input v-model="menuFrom.tip" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="栏目地址" prop="url" :label-width="formLabelWidth">
                 <el-input v-model="menuFrom.url" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
              <el-form-item label="上级栏目" prop="parentid" :label-width="formLabelWidth">
                  <el-select v-model="menuFrom.parentid" style="width: 200px;">
                    <el-option v-for="menu in result" :key="'menu'+menu.id" :label="menu.text" :value="menu.text"></el-option>
                  </el-select>
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
    <el-dialog title="栏目修改" style="width: 1400px;" :visible.sync="dialogFormVisible1" @close="cleanForm">
       <el-form :model="menuFrom" ref="menuFrom" >
        <el-row type="flex">
          <el-col >
              <el-form-item label="编号" prop="id" :label-width="formLabelWidth" v-if="show">
                <el-input v-model="menuFrom.id" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
              <el-form-item label="栏目类型" prop="type" :label-width="formLabelWidth">
                <el-input v-model="menuFrom.type" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="栏目名称" prop="text" :label-width="formLabelWidth">
                 <el-input v-model="menuFrom.text" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
              <el-form-item label="栏目提示语" prop="tip" :label-width="formLabelWidth">
                <el-input v-model="menuFrom.tip" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="栏目地址" prop="url" :label-width="formLabelWidth">
                 <el-input v-model="menuFrom.url" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
              <el-form-item label="上级栏目" prop="parentid" :label-width="formLabelWidth">
                 <el-select v-model="menuFrom.parentid" style="width: 200px;">
                   <el-option v-for="menu in result" :key="'menu'+menu.id" :label="menu.text" :value="menu.text"></el-option>
                 </el-select>
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
    name: 'Menu',
    data: function() {
      return {
        data:[],
        result:[],
        text:null,
        dialogFormVisible:false,
        dialogFormVisible1:false,
        formLabelWidth:"90px",
        show:null,
        menuFrom:{
          id:null,
          parentid:null,
          type:null,
          text:null,
          url:null,
          tip:null
        }
      }
    },
    //查询全部
    created:function(){
      let url = 'http://localhost/Menu/findAllMenus';
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
        this.menuFrom.parentid=row.parentid;
        this.menuFrom.text=row.text;
        this.menuFrom.id=row.id;
        this.menuFrom.url=row.url;
        this.menuFrom.tip=row.tip;
        this.menuFrom.type=row.type;
      },
      //新增框显示
      handleInsert:function(){
        this.dialogFormVisible=true;
      },
      //删除
      handleDelete:function(row){
        let params={
          ID:row.id
        }
        let url ='http://localhost/Menu/deleteMenus';
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          //ajax提交数据
          axios.post(url, qs.stringify(params)).then(resp => {
            if(resp.data!=null){
              let url = 'http://localhost/Menu/findAllMenus';
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
        if (this.text != null && this.text != "") {
          this.data = this.data.filter(b => b.text.indexOf(this.text) != -1);
        }
        return this.data;
      },
      //清除表单
      cleanForm:function(){
        this.menuFrom.parentid=null;
        this.menuFrom.text=null;
        this.menuFrom.url=null;
        this.menuFrom.tip=null;
        this.menuFrom.type=null;
      },
      //新增提交
      doSubmit1:function(){
        this.$refs['menuFrom'].validate((valid) => {
          if (valid) {
            let url = 'http://localhost/Menu/insertMenus';
            let params = {
              PARENTID:this.menuFrom.parentid,
              TEXT:this.menuFrom.text,
              URL:this.menuFrom.url,
              TIP:this.menuFrom.tip,
              TYPE:this.menuFrom.type
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible = false;
              this.cleanForm();
              if(resp.data!=null){
                let url = 'http://localhost/Menu/findAllMenus';
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
          this.$refs['menuFrom'].validate((valid) => {
            if (valid) {
              let url = 'http://localhost/Menu/updateMenus';
              let params = {
                PARENTID:this.menuFrom.parentid,
                TEXT:this.menuFrom.text,
                URL:this.menuFrom.url,
                ID:this.menuFrom.id,
                TIP:this.menuFrom.tip,
                TYPE:this.menuFrom.type
              }
              //ajax提交数据
              axios.post(url, qs.stringify(params)).then(resp => {
                //清空表单
                //隐藏对话框
                this.dialogFormVisible1 = false;
                this.cleanForm();
                if(resp.data!=null){
                  let url = 'http://localhost/Menu/findAllMenus';
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
