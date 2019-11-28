<template>
  <div>

    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">包装材料物品管理</el-divider>
      <el-form-item label="物品编码:">
        <el-input v-model="itemcode" placeholder="请输入物品编码"></el-input>
      </el-form-item>
      <el-form-item label="物品名称:">
        <el-input v-model="itemname" placeholder="请输入物品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSubmit2" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="cleanInput" icon="el-icon-minus">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="show = !show" icon="el-icon-more-outline">更多</el-button>
      </el-form-item><br />
      <div v-if="show">
        <el-form-item label="计划价格:">
          <el-input v-model="plannedprice" placeholder="请输入计划价格"></el-input>
        </el-form-item>
        <el-form-item label="规格:" style="margin-left: 27px;">
          <el-input v-model="specifications" placeholder="请输入规格"></el-input>
        </el-form-item>
        <el-form-item label="类型:">
          <el-input v-model="type" placeholder="请输入类型"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="status" placeholder="全部">
            <el-option  label="正常" :value="1"></el-option>
            <el-option  label="作废" :value="2"></el-option>
          </el-select>
        </el-form-item><br />
      </div>
      <el-button type="primary" @click="handleInsert()" icon="el-icon-plus">新增</el-button>
      <!--数据表格-->
      <el-table :data="data" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="id" label="序号" min-width="30" align="center"></el-table-column>
        <el-table-column prop="itemcode" label="物品编码" min-width="50" align="center"></el-table-column>
        <el-table-column prop="itemname" label="物品名称" min-width="50" align="center"></el-table-column>
        <el-table-column prop="plannedprice" label="计划价格" min-width="50" align="center"></el-table-column>
        <el-table-column prop="specifications" label="规格" min-width="40" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" min-width="40" align="center"></el-table-column>
        <el-table-column prop="measurementunit" label="计量单位" min-width="40" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!--新增对话框-->
    <el-dialog title="物品新增" style="width: 1400px;" :visible.sync="dialogFormVisible" @close="cleanForm">
      <el-form :model="packFrom" ref="packFrom" >
        <el-row type="flex">
          <el-col >
              <el-form-item label="物品编码" prop="itemcode" :label-width="formLabelWidth">
                <el-input v-model="packFrom.itemcode" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="物品名称" prop="itemname" :label-width="formLabelWidth">
                <el-input v-model="packFrom.itemname" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="计划价格" prop="plannedprice" :label-width="formLabelWidth">
               <el-input v-model="packFrom.plannedprice" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="规格" prop="specifications" :label-width="formLabelWidth">
                <el-input v-model="packFrom.specifications" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
              <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
                <el-input v-model="packFrom.type" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
                <el-radio v-model="radio" value="1" :label="1">正常</el-radio>
                <el-radio v-model="radio" value="2" :label="2">作废</el-radio>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
              <el-form-item label="操作人工号" prop="operatorid" :label-width="formLabelWidth">
                <el-input v-model="packFrom.operatorid" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="操作人姓名" prop="operationunitid" :label-width="formLabelWidth">
                <el-input v-model="packFrom.operationunitid" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
              <el-form-item label="计量单位" prop="measurementunit" :label-width="formLabelWidth">
                <el-input v-model="packFrom.measurementunit" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改对话框-->
    <el-dialog title="物品修改" style="width: 1400px;" :visible.sync="dialogFormVisible1" @close="cleanForm">
      <el-form :model="packFrom" ref="packFrom" >
        <el-row type="flex">
          <el-form-item label="序号" prop="id" :label-width="formLabelWidth" v-show="false">
            <el-input v-model="packFrom.id" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
          <el-col >
              <el-form-item label="物品编码" prop="itemcode" :label-width="formLabelWidth">
                <el-input v-model="packFrom.itemcode" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="物品名称" prop="itemname" :label-width="formLabelWidth">
                <el-input v-model="packFrom.itemname" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="计划价格" prop="plannedprice" :label-width="formLabelWidth">
               <el-input v-model="packFrom.plannedprice" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="规格" prop="specifications" :label-width="formLabelWidth">
                <el-input v-model="packFrom.specifications" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
              <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
                <el-input v-model="packFrom.type" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
                <el-radio v-model="radio" value="1" :label="1">正常</el-radio>
                <el-radio v-model="radio" value="2" :label="2">作废</el-radio>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
              <el-form-item label="操作人工号" prop="operatorid" :label-width="formLabelWidth">
                <el-input v-model="packFrom.operatorid" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="操作人姓名" prop="operationunitid" :label-width="formLabelWidth">
                <el-input v-model="packFrom.operationunitid" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
              <el-form-item label="计量单位" prop="measurementunit" :label-width="formLabelWidth">
                <el-input v-model="packFrom.measurementunit" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'pacPackaging',
    data: function() {
      return {
        id: null,
        itemcode: null,
        itemname: null,
        plannedprice: null,
        specifications: null,
        type: null,
        status: null,
        show: false,
        result: [],
        data: [],
        dialogFormVisible: false,
        formLabelWidth: "90px",
        dialogFormVisible1:false,
        radio:'1',
        //对象
        packFrom: {
          id: null,
          itemcode: null,
          itemname: null,
          plannedprice: null,
          specifications: null,
          type: null,
          status: null,
          operatorid: null,
          operationunitid: null,
          measurementunit:null
        }
      }
    },
    //查询全部
    created: function() {
      this.findAll();
    },
    methods: {
      //弹出修改框
      handleEdit: function(row) {
        this.packFrom.id =row.id;
        this.packFrom.itemcode =row.itemcode;
        this.packFrom.itemname =row.itemname;
        this.packFrom.plannedprice=row.plannedprice;
        this.packFrom.specifications=row.specifications;
        this.packFrom.type=row.type;
        this.radio=row.status;
        this.packFrom.measurementunit=row.measurementunit;
        //不需要显示，只需要从登陆用户获取
        this.packFrom.operatorid=row.operatorid;
        this.packFrom.operationunitid=row.operationunitid;
        this.dialogFormVisible1 = true;
      },
      //清空表单
      cleanForm: function() {
        //清空表单数据
        this.packFrom.itemcode =null;
        this.packFrom.itemname =null;
        this.packFrom.plannedprice=null;
        this.packFrom.specifications=null;
        this.packFrom.type=null;
        this.radio=null;
        this.packFrom.operatorid=null;
        this.packFrom.operationunitid=null;
        this.packFrom.measurementunit=null;
        //隐藏对话框
        this.dialogFormVisible = false;

      },
      //删除的方法
      handleDelete: function(row) {
        let params={ ID:row.id}
        let url ='http://localhost/Pack/deletePack';
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          //ajax提交数据
          axios.post(url, qs.stringify(params)).then(resp => {
            if(resp.data!=null){
              this.findAll();
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
      //弹出新增框
      handleInsert: function(row) {
        //显示对话框
        this.dialogFormVisible = true;
      },
      //新增提交    操作人必须从当前用户获取
      doSubmit: function() {
        this.$refs['packFrom'].validate((valid) => {
          if (valid) {
            //alert(3);
            let url = 'http://localhost/Pack/insertPack';
            let params = {
              ITEMCODE: this.packFrom.itemcode,
              ITEMNAME: this.packFrom.itemname,
              PLANNEDPRICE: this.packFrom.plannedprice,
              SPECIFICATIONS: this.packFrom.specifications,
              TYPE: this.packFrom.type,
              STATUS: this.radio,
              OPERATORID: this.packFrom.operatorid,
              OperationUnitID: this.packFrom.operationunitid,
              MEASUREMENTUNIT:this.packFrom.measurementunit
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible = false;
              this.cleanForm();
              if(resp.data!=null){
                this.findAll();
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
      //修改方法 操作人必须从当前用户获取
      doSubmit1:function(){
            this.$refs['packFrom'].validate((valid) => {
              if (valid) {
                //alert(3);
                let url = 'http://localhost/Pack/updatePack';
                let params = {
                  ID:this.packFrom.id,
                  ITEMCODE: this.packFrom.itemcode,
                  ITEMNAME: this.packFrom.itemname,
                  PLANNEDPRICE: this.packFrom.plannedprice,
                  SPECIFICATIONS: this.packFrom.specifications,
                  TYPE: this.packFrom.type,
                  STATUS: this.radio,
                  OPERATORID: this.packFrom.operatorid,
                  OperationUnitID: this.packFrom.operationunitid,
                  MEASUREMENTUNIT:this.packFrom.measurementunit
                }
                //ajax提交数据
                axios.post(url, qs.stringify(params)).then(resp => {
                  //清空表单
                  //隐藏对话框
                  this.dialogFormVisible1 = false;
                  this.cleanForm();
                  if(resp.data!=null){
                    this.findAll();
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
      //多条件查询
      doSubmit2:function(){
        this.data=this.result;
        if(this.itemcode==null && this.itemname==null && this.plannedprice==null && this.specifications==null && this.type==null&& this.status==null){
          this.findAll();
        }
        if (this.itemcode != null && this.itemcode != "") {
          this.data = this.data.filter(f => f.itemcode.indexOf(this.itemcode) != -1);
        }
        if (this.itemname != null && this.itemname != "") {
          this.data = this.data.filter(a => a.itemname.indexOf(this.itemname) != -1);
        }
        if (this.plannedprice != null && this.plannedprice != "") {
          this.data = this.data.filter(b => b.plannedprice.indexOf(this.plannedprice) != -1);
        }
        if (this.specifications != null && this.specifications != "") {
          this.data = this.data.filter(c => c.specifications.indexOf(this.specifications) != -1);
        }
        if (this.type != null && this.type != "") {
          this.data = this.data.filter(d => d.type.indexOf(this.type) != -1);
        }
        if (this.status != null && this.status != "") {
          this.data = this.data.filter(e => e.status.indexOf(this.status) != -1);
        }
        return this.data;
        this.cleanInput();
      },
      //查询全部
      findAll:function(){
        let url = 'http://localhost/Pack/findAllPack';
        axios.post(url, null).then(resp => {
          this.result = resp.data;
          this.data=resp.data;
        }).catch(error => {
          console.log(error);
        });
      },
      //清空输入框
      cleanInput:function(){
        this.itemcode=null;
        this.itemname=null;
        this.plannedprice=null;
        this.specifications=null;
        this.type=null;
        this.status=null;
      }
    }
  }
</script>
<style scoped>

</style>
