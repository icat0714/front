<template>
  <div>

    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">包装信息录入</el-divider>
      <el-form-item label="入库单号:">
        <el-input v-model="warehouseno" placeholder="请输入入库单号"></el-input>
      </el-form-item>
      <el-form-item label="入库类型:">
        <el-select v-model="reservoirtype" placeholder="全部">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" icon="el-icon-minus">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="show = !show" icon="el-icon-more-outline">更多</el-button>
      </el-form-item><br />
      <div v-if="show">
      <el-form-item label="运输单号:" >
        <el-input v-model="transport" placeholder="请输入运输单号"></el-input>
      </el-form-item>
      <el-form-item v-model="subordinateunit" label="所属单位:">
       <el-select placeholder="1">
         <el-option label="2" value=""></el-option>
         <el-option label="3" value=""></el-option>
       </el-select>
       <el-form-item v-model="status" label="状态:">
        <el-select placeholder="1">
          <el-option label="2" value=""></el-option>
          <el-option label="3" value=""></el-option>
        </el-select>
       </el-form-item>
      </el-form-item>
      <br/>
      <el-form-item label="货物编码:">
         <el-input v-model="goodscode" placeholder="请输入货物编码"></el-input>
      </el-form-item>
      <el-form-item label="货物名称:">
         <el-input v-model="goodsname" placeholder="请输入货物名称"></el-input>
      </el-form-item>
      <el-form-item label="开单时间:">
         <el-input v-model="drawertime" placeholder="请输入开单时间"></el-input>
      </el-form-item>
      </div>
      <el-button type="primary" @click="handleInsert" icon="el-icon-plus">新增</el-button>
      <!--数据表格-->
      <el-table :data="result" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="id" label="序号" min-width="20" align="center"></el-table-column>
        <el-table-column prop="pacStockitem.warehouseno" label="入库单号" min-width="40" align="center"></el-table-column>
        <el-table-column prop="reservoirtype" label="入库类型" min-width="40" align="center"></el-table-column>
        <el-table-column prop="transport" label="运输单号" min-width="40" align="center"></el-table-column>
        <el-table-column prop="subordinateunit" label="所属单位" min-width="40" align="center"></el-table-column>
        <el-table-column prop="drawerno" label="开单人工号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="drawername" label="开单人姓名" min-width="50" align="center"></el-table-column>
        <el-table-column prop="drawertime" label="开单时间" min-width="70" align="center"></el-table-column>
        <el-table-column prop="pacStockitem.status" label="状态" min-width="40" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" min-width="40" align="center"></el-table-column>
        <el-table-column  label="操作" min-width="120" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              <el-button size="mini" type="success" @click="handleFind(scope.row)">查看明细</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!--新增对话框-->
    <el-dialog title="货物新增" style="width: 1400px;" :visible.sync="dialogFormVisible" @close="cleanForm">
      <el-form :model="stockFrom" ref="stockFrom" >
        <el-row type="flex">
          <el-col >
              <el-form-item label="入库类型" prop="reservoirtype" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.reservoirtype" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="所属单位" prop="subordinateunit" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.subordinateunit" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="货物编码" prop="goodscode" :label-width="formLabelWidth">
               <el-input v-model="stockFrom.stockItemFrom.goodscode" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="货物名称" prop="goodsname" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.stockItemFrom.goodsname" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="入库数量" prop="storagenum" :label-width="formLabelWidth">
               <el-input v-model="stockFrom.stockItemFrom.storagenum" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="计划价格" prop="plannedprice" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.stockItemFrom.plannedprice" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="规格" prop="specifications" :label-width="formLabelWidth">
               <el-input v-model="stockFrom.stockItemFrom.specifications" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
                <el-select v-model="stockFrom.stockItemFrom.type" placeholder="全部">
                  <el-option  label="初期库存" :value="1"></el-option>
                  <el-option  label="调拨入库" :value="2"></el-option>
                  <el-option  label="下发入库" :value="3"></el-option>
                  <el-option  label="盘盈调整" :value="4"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="计量单位" prop="measurementunit" :label-width="formLabelWidth">
               <el-input v-model="stockFrom.stockItemFrom.measurementunit" autocomplete="off" style="width: 200px;"></el-input>
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
          <!-- 从登陆获取 -->
          <el-col >
              <el-form-item label="开单人工号" prop="drawerno" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.drawerno" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="开单人姓名" prop="drawername" :label-width="formLabelWidth">
                 <el-input v-model="stockFrom.drawername" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
              <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.remark" autocomplete="off" style="width: 525px;"></el-input>
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
    <el-dialog title="货物修改" style="width: 1400px;" :visible.sync="dialogFormVisible1" @close="cleanForm">
      <el-form :model="stockFrom" ref="stockFrom" >
        <el-row type="flex">
          <el-col >
              <el-form-item label="入库类型" prop="reservoirtype" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.reservoirtype" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="所属单位" prop="subordinateunit" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.subordinateunit" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="货物编码" prop="goodscode" :label-width="formLabelWidth">
               <el-input v-model="stockFrom.stockItemFrom.goodscode" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="货物名称" prop="goodsname" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.stockItemFrom.goodsname" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="入库数量" prop="storagenum" :label-width="formLabelWidth">
               <el-input v-model="stockFrom.stockItemFrom.storagenum" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="计划价格" prop="plannedprice" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.stockItemFrom.plannedprice" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="规格" prop="specifications" :label-width="formLabelWidth">
               <el-input v-model="stockFrom.stockItemFrom.specifications" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.stockItemFrom.type" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
             <el-form-item label="计量单位" prop="measurementunit" :label-width="formLabelWidth">
               <el-input v-model="stockFrom.stockItemFrom.measurementunit" autocomplete="off" style="width: 200px;"></el-input>
             </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.stockItemFrom.status" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col >
              <el-form-item label="开单人工号" prop="drawerno" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.drawerno" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
          <el-col >
              <el-form-item label="开单人姓名" prop="drawername" :label-width="formLabelWidth">
                 <el-input v-model="stockFrom.drawername" autocomplete="off" style="width: 200px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
              <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                <el-input v-model="stockFrom.remark" autocomplete="off" style="width: 525px;"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
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
    name: 'stock',
    data: function() {
      return {
        warehouseno:null,
        reservoirtype:null,
        transport:null,
        subordinateunit:null,
        status:null,
        goodscode:null,
        goodsname:null,
        drawertime:null,
        show:false,
        result:[],
        data1:[],
        dialogFormVisible:false,
        dialogFormVisible1:false,
        formLabelWidth: "90px",
        radio:'1',
        stockFrom:{
          warehouseno:null,
          reservoirtype:null,
          transport:null,
          subordinateunit:null,
          drawerno:null,
          drawername:null,
          remark:null,
          stockItemFrom:{
            goodscode:null,
            goodsname:null,
            storagenum:null,
            plannedprice:null,
            specifications:null,
            type:null,
            measurementunit:null,
            status:null
          }
        },
        pacStockitem:{
          GOODSCODE:null,
          GOODSNAME:null,
          STORAGENUM:null,
          PLANNEDPRICE:null,
          SPECIFICATIONS:null,
          TYPE:null,
          MEASUREMENTUNIT:null,
          STATUS:null
        }
      }
    },
    //查询全部
    created: function() {
      let url = 'http://localhost/Stock/findAllStock';
      axios.post(url, null).then(resp => {
        this.result = resp.data;
      }).catch(error => {
        console.log(error);
      });
    },
    methods:{
      //弹出修改框
      handleEdit: function(row) {
        //显示对话框
        this.dialogFormVisible1 = true;
      },
      //删除
      handleDelete: function(row) {
          let params={ WAREHOUSENO:row.pacStockitem.warehouseno}
          let url ='http://localhost/Stock/deleteStock';
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
      //清空表单数据
      cleanForm: function(){
          this.stockFrom.reservoirtype=null;
          this.stockFrom.transport=null;
          this.stockFrom.subordinateunit=null;
          this.stockFrom.drawerno=null;
          this.stockFrom.drawername=null;
          this.stockFrom.remark=null;
          this.stockFrom.stockItemFrom.goodscode=null;
          this.stockFrom.stockItemFrom.goodsname=null;
          this.stockFrom.stockItemFrom.storagenum=null;
          this.stockFrom.stockItemFrom.plannedprice=null;
          this.stockFrom.stockItemFrom.specifications=null;
          this.stockFrom.stockItemFrom.type=null;
          this.stockFrom.stockItemFrom.measurementunit=null;
          this.stockFrom.stockItemFrom.status=null;
      },
      //弹出新增框
      handleInsert: function() {
        //显示对话框
        this.dialogFormVisible = true;
      },
      //弹出明细框
      handleFind: function(row) {

      },
      //新增提交
      doSubmit:function(){
        this.$refs['stockFrom'].validate((valid) => {
          if (valid) {
            alert(1);
            let url = 'http://localhost/Stock/insertStock';
            let params = {
              RESERVOIRTYPE:this.stockFrom.reservoirtype,
              SUBORDINATEUNIT:this.stockFrom.subordinateunit,
              DRAWERNO:this.stockFrom.drawerno,
              DRAWERNAME:this.stockFrom.drawername,
              REMARK:this.stockFrom.remark,
              pacStockitem.GOODSCODE=this.stockFrom.stockItemFrom.goodscode,
              pacStockitem.GOODSNAME:this.stockFrom.stockItemFrom.goodsname,
              pacStockitem.STORAGENUM:this.stockFrom.stockItemFrom.storagenum,
              pacStockitem.PLANNEDPRICE:this.stockFrom.stockItemFrom.plannedprice,
              pacStockitem.SPECIFICATIONS:this.stockFrom.stockItemFrom.specifications,
              pacStockitem.TYPE:this.stockFrom.stockItemFrom.type,
              pacStockitem.MEASUREMENTUNIT:this.stockFrom.stockItemFrom.measurementunit,
              pacStockitem.STATUS:this.stockFrom.stockItemFrom.status
            }
            console.log(params);
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
      //查询全部
      findAll:function(){
        let url = 'http://localhost/Stock/findAllStock';
        axios.post(url, null).then(resp => {
          this.result = resp.data;
        }).catch(error => {
          console.log(error);
        });
      }
    }


  }
</script>
<style scoped>

</style>
