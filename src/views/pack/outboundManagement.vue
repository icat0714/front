<template>
  <div>

    <!--搜索框      高级查询  出库类型bug        -->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">出库管理</el-divider>
      <el-form-item label="出库单号:">
        <el-input v-model="warehouseno" placeholder="请输入出库单号"></el-input>
      </el-form-item>
      <el-form-item label="开单人姓名:">
        <el-input v-model="drawername1" placeholder="请输入开单人姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="doSubmit5">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" icon="el-icon-minus" @click="cleanInput">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="show = !show" icon="el-icon-more-outline">更多</el-button>
      </el-form-item><br />
      <div v-if="show">
        <el-form-item label="运输单号:">
          <el-input v-model="transport" placeholder="请输入运输单号"></el-input>
        </el-form-item>
      </div>
      <el-button type="primary" @click="handleInsert" icon="el-icon-plus">新增</el-button>
      <el-button type="primary" @click="develop" icon="el-icon-s-check">审核</el-button>
      <el-button type="primary" @click="develop" icon="el-icon-pie-chart">详细</el-button>
      <!--数据表格           v-if="show"    -->
      <el-table :data="data1" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="id" label="序号" min-width="20" align="center"></el-table-column>
        <el-table-column prop="warehouseno" label="出库单号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="reservoirtype" label="出库类型" min-width="40" align="center"></el-table-column>
        <el-table-column prop="transport" label="运输单号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="subordinateunit" label="所属单位" min-width="40" align="center"></el-table-column>
        <el-table-column prop="drawerno1" label="开单人工号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="drawername1" label="开单人姓名" min-width="50" align="center"></el-table-column>
        <el-table-column prop="downtime" label="开单时间" min-width="80" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" min-width="40" align="center"></el-table-column>
        <el-table-column label="操作" min-width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="mini" type="success" @click="handleFind(scope.row)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!--新增对话框-->
    <el-dialog title="货物运输新增" style="width: 1400px;" :visible.sync="dialogFormVisible" @close="cleanForm">
      <el-form :model="stockFrom" ref="stockFrom">
        <el-row type="flex">
          <el-col>
            <el-form-item label="出库类型" prop="reservoirtype" :label-width="formLabelWidth">
              <el-select v-model="stockFrom.reservoirtype" placeholder="全部" style="width: 200px;">
                <el-option label="期初库存" value="1"></el-option>
                <el-option label="调拨入库" value="2"></el-option>
                <el-option label="下发入库" value="3"></el-option>
                <el-option label="盘盈调整" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="所属单位" prop="subordinateunit" :label-width="formLabelWidth">
              <el-input v-model="stockFrom.subordinateunit" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <!-- 从登陆获取 -->
          <el-col>
            <el-form-item label="开单人工号" prop="drawerno" :label-width="formLabelWidth" >
              <el-input v-model="stockFrom.drawerno1"  autocomplete="off" style="width: 200px;" :readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="开单人姓名" prop="drawername" :label-width="formLabelWidth">
              <el-input v-model="stockFrom.drawername1" autocomplete="off" style="width: 200px;" :readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="运输单号" prop="transport" :label-width="formLabelWidth">
              <el-input v-model="stockFrom.transport" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
              <el-input v-model="stockFrom.remark" autocomplete="off" style="width: 200px;"></el-input>
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
      <el-form :model="stockFrom" ref="stockFrom">
        <el-form-item label="出库单号" prop="warehouseno" :label-width="formLabelWidth" v-if="show">
          <el-input v-model="stockFrom.warehouseno" autocomplete="off" style="width: 200px;"></el-input>
        </el-form-item>
        <el-row type="flex">
          <el-col>
            <el-form-item label="出库类型" prop="reservoirtype" :label-width="formLabelWidth">
              <el-select v-model="stockFrom.reservoirtype" placeholder="全部" style="width: 200px;">
                <el-option label="期初库存" :value="1"></el-option>
                <el-option label="调拨入库" :value="2"></el-option>
                <el-option label="下发入库" :value="3"></el-option>
                <el-option label="盘盈调整" :value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="所属单位" prop="subordinateunit" :label-width="formLabelWidth">
              <el-input v-model="stockFrom.subordinateunit" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <!-- 从登陆获取 -->
          <el-col>
            <el-form-item label="开单人工号" prop="drawerno" :label-width="formLabelWidth">
              <el-input v-model="stockFrom.drawerno1" autocomplete="off" style="width: 200px;" :readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="开单人姓名" prop="drawername" :label-width="formLabelWidth">
              <el-input v-model="stockFrom.drawername1" autocomplete="off" style="width: 200px;" :readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="运输单号" prop="transport" :label-width="formLabelWidth">
              <el-input v-model="stockFrom.transport" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
              <el-input v-model="stockFrom.remark" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit1">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看明细对话框 -->
    <!-- 数据表格-->
    <el-dialog title="查看明细" style="width: 1750px;margin-top:100px;" :visible.sync="dialogFormVisible2">
      <el-button size="mini" type="success" @click="insertItem">新增明细</el-button>
      <el-table :data="data2" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="id" label="序号" min-width="40" align="center"></el-table-column>
        <el-table-column prop="warehouseno" label="出库单号" min-width="68" align="center" v-if="show"></el-table-column>
        <el-table-column prop="goodscode" label="货物编码" min-width="68" align="center"></el-table-column>
        <el-table-column prop="goodsname" label="货物名称" min-width="68" align="center"></el-table-column>
        <el-table-column prop="storagenum" label="出库数量" min-width="68" align="center"></el-table-column>
        <el-table-column prop="actualnum" label="实际出库数量" min-width="68" align="center"></el-table-column>
        <el-table-column prop="plannedprice" label="计划价格" min-width="40" align="center"></el-table-column>
        <el-table-column prop="specifications" label="规格" min-width="40" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" min-width="40" align="center"></el-table-column>
        <el-table-column prop="measurementunit" label="计量单位" min-width="40" align="center" v-if="show"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="40" align="center"></el-table-column>
        <el-table-column label="操作" min-width="50" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleItemEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--新增对话框           库存明细-->
    <el-dialog title="库存明细新增" style="width: 1750px;margin-top:100px;" :visible.sync="dialogFormVisible3" @close="cleanItemForm">
      <el-form :model="stockItemFrom" ref="stockItemFrom">
        <el-row type="flex">
          <el-col>
            <el-form-item label="货物编码" prop="goodscode" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.goodscode" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="货物名称" prop="goodsname" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.goodsname" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="出库数量" prop="storagenum" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.storagenum" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
              <el-radio v-model="stockItemFrom.status" value="1" :label="1">正常</el-radio>
              <el-radio v-model="stockItemFrom.status" value="2" :label="2">作废</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="计划价格" prop="plannedprice" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.plannedprice" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="计量单位" prop="specifications" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.specifications" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
              <el-select v-model="stockItemFrom.type" placeholder="全部" style="width: 200px;">
                <el-option label="调拨出库" value="1"></el-option>
                <el-option label="下发出库" value="2"></el-option>
                <el-option label="核销出库" value="3"></el-option>
                <el-option label="领用出库" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="规格" prop="measurementunit" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.measurementunit" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit3">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改对话框           库存明细-->
    <el-dialog title="库存明细修改" style="width: 1400px;" :visible.sync="dialogFormVisible4" @close="cleanItemForm">
      <el-form :model="stockItemFrom" ref="stockItemFrom">
        <el-row type="flex">
          <el-col>
            <el-form-item label="货物编码" prop="goodscode" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.goodscode" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="货物名称" prop="goodsname" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.goodsname" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="出库数量" prop="storagenum" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.storagenum" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="实际出库数量" prop="actualnum" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.actualnum" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="计划价格" prop="plannedprice" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.plannedprice" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="计量单位" prop="specifications" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.specifications" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
              <el-select v-model="stockItemFrom.type" placeholder="全部" style="width: 200px;">
                <el-option label="调拨出库" :value="1"></el-option>
                <el-option label="下发出库" :value="2"></el-option>
                <el-option label="核销出库" :value="3"></el-option>
                <el-option label="领用出库" :value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="规格" prop="measurementunit" :label-width="formLabelWidth">
              <el-input v-model="stockItemFrom.measurementunit" autocomplete="off" style="width: 200px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
              <el-radio v-model="stockItemFrom.status" value="1" :label="1">正常</el-radio>
              <el-radio v-model="stockItemFrom.status" value="2" :label="2">作废</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit4">确 定</el-button>
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
        warehouseno: null,
        reservoirtype: null,
        transport: null,
        subordinateunit: null,
        status: '1',
        goodscode: null,
        goodsname: null,
        readonly:true,
        drawername1: null,
        drawertime: null,
        show: false,
        result: [],
        data1: [],
        data2: [],
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        dialogFormVisible4: false,
        formLabelWidth: "90px",
        stockFrom: {
          warehouseno: null,
          reservoirtype: null,
          transport: null,
          subordinateunit: null,
          drawerno1: null,
          drawername1: null,
          remark: null
        },
        stockItemFrom: {
          id: null,
          warehouseno: null,
          goodscode: null,
          goodsname: null,
          storagenum: null,
          actualnum: null,
          plannedprice: null,
          specifications: null,
          type: null,
          measurementunit: null,
          status: null
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
    //查询全部
    created: function() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      let url = 'http://localhost/Stock/findAllStock';
      axios.post(url, null).then(resp => {
        this.result = resp.data;
        this.data1 = resp.data;
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      //弹出修改框
      handleEdit: function(row) {
        this.dialogFormVisible1 = true;
        this.stockFrom.warehouseno = row.warehouseno;
        this.stockFrom.reservoirtype = row.reservoirtype;
        this.stockFrom.remark = row.remark;
        this.stockFrom.drawerno1 = row.drawerno1;
        this.stockFrom.drawername1 = row.drawername1;
        this.stockFrom.subordinateunit = row.subordinateunit;
        this.stockFrom.transport = row.transport;
      },
      //删除
      handleDelete: function(row) {
        let params = {
          WAREHOUSENO: row.warehouseno
        }
        let url = 'http://localhost/Stock/deleteStock';
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          //ajax提交数据
          axios.post(url, qs.stringify(params)).then(resp => {
            if (resp.data != null) {
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
      cleanForm: function() {
        this.stockFrom.reservoirtype = null;
        this.stockFrom.remark = null;
        this.stockFrom.drawerno1 = null;
        this.stockFrom.drawername1 = null;
        this.stockFrom.subordinateunit = null;
        this.stockFrom.transport = null;

      },
      //弹出新增框
      handleInsert: function() {
        //显示对话框
        this.dialogFormVisible = true;
        this.stockFrom.drawerno1=this.user.empno;
        this.stockFrom.drawername1=this.user.empname;
      },
      //新增提交
      doSubmit: function() {
        this.$refs['stockFrom'].validate((valid) => {
          if (valid) {
            let url = 'http://localhost/Stock/insertStockDown';
            let params = {
              RESERVOIRTYPE: this.stockFrom.reservoirtype,
              SUBORDINATEUNIT: this.stockFrom.subordinateunit,
              DRAWERNO1: this.stockFrom.drawerno1,
              DRAWERNAME1: this.stockFrom.drawername1,
              REMARK: this.stockFrom.remark,
              TRANSPORT: this.stockFrom.transport
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible = false;
              this.cleanForm();
              if (resp.data != null) {
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
      //修改提交
      doSubmit1: function() {
        this.$refs['stockFrom'].validate((valid) => {
          if (valid) {
            let url = 'http://localhost/Stock/updateStockDown';
            let params = {
              WAREHOUSENO: this.stockFrom.warehouseno,
              RESERVOIRTYPE: this.stockFrom.reservoirtype,
              SUBORDINATEUNIT: this.stockFrom.subordinateunit,
              DRAWERNO1: this.stockFrom.drawerno1,
              DRAWERNAME1: this.stockFrom.drawername1,
              REMARK: this.stockFrom.remark,
              TRANSPORT: this.stockFrom.transport
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible1 = false;
              this.cleanForm();
              if (resp.data != null) {
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
      //查询全部
      findAll: function() {
        let url = 'http://localhost/Stock/findAllStock';
        axios.post(url, null).then(resp => {
          this.result = resp.data;
          this.data1 = resp.data;
        }).catch(error => {
          console.log(error);
        });
      },
      //查看明细  库存明细
      handleFind: function(row) {
        //alert(row.warehouseno)
        let params = {
          WAREHOUSENO: row.warehouseno
        }
        this.dialogFormVisible2 = true;
        let url = 'http://localhost/StockItem/findAllStockItem';
        axios.post(url, qs.stringify(params)).then(resp => {
          //alert(resp.data)
          this.data2 = resp.data;
        }).catch(error => {
          console.log(error);
        });
      },
      //新增明细显示   库存明细
      insertItem: function() {
        this.dialogFormVisible3 = true;
      },
      //修改明细显示   库存明细
      handleItemEdit: function(row) {
        this.dialogFormVisible4 = true;
        this.stockItemFrom.goodscode = row.goodscode;
        this.stockItemFrom.goodsname = row.goodsname;
        this.stockItemFrom.storagenum = row.storagenum;
        this.stockItemFrom.actualnum = row.actualnum;
        this.stockItemFrom.plannedprice = row.plannedprice;
        this.stockItemFrom.specifications = row.specifications;
        this.stockItemFrom.measurementunit = row.measurementunit;
        this.stockItemFrom.type = row.type;
        this.stockItemFrom.status = row.status;
      },
      //清除表单   库存明细
      cleanItemForm: function() {
        this.stockItemFrom.goodscode = null;
        this.stockItemFrom.goodsname = null;
        this.stockItemFrom.storagenum = null;
        this.stockItemFrom.actualnum = null;
        this.stockItemFrom.plannedprice = null;
        this.stockItemFrom.specifications = null
        this.stockItemFrom.type = null;
        this.stockItemFrom.measurementunit = null;
        this.stockItemFrom.status = null;
      },
      //新增明细提交
      doSubmit3: function() {
        this.$refs['stockItemFrom'].validate((valid) => {
          if (valid) {
            let url = 'http://localhost/StockItem/insertStockItem';
            let params = {
              WAREHOUSENO: this.stockItemFrom.warehouseno,
              GOODSCODE: this.stockItemFrom.goodscode,
              GOODSNAME: this.stockItemFrom.goodsname,
              STORAGENUM: this.stockItemFrom.storagenum,
              ACTUALNUM: this.stockItemFrom.storagenum,
              PLANNEDPRICE: this.stockItemFrom.plannedprice,
              SPECIFICATIONS: this.stockItemFrom.specifications,
              TYPE: this.stockItemFrom.type,
              MEASUREMENTUNIT: this.stockItemFrom.measurementunit,
              STATUS: this.stockItemFrom.status
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible2 = false;
              this.dialogFormVisible3 = false;
              this.cleanItemForm();
              if (resp.data != null) {
                this.$message({
                  type: 'success',
                  message: '新增明细成功!'
                });
              }
            }).catch(error => {
              console.log("出错了");
            });
          } else {
            console.log('新增明细失败');
            return false;
          }
        });
      },
      //修改明细提交
      doSubmit4: function() {
        this.$refs['stockItemFrom'].validate((valid) => {
          if (valid) {
            let url = 'http://localhost/StockItem/updateStockItem';
            let params = {
              WAREHOUSENO: this.stockItemFrom.warehouseno,
              GOODSCODE: this.stockItemFrom.goodscode,
              GOODSNAME: this.stockItemFrom.goodsname,
              STORAGENUM: this.stockItemFrom.storagenum,
              ACTUALNUM: this.stockItemFrom.actualnum,
              PLANNEDPRICE: this.stockItemFrom.plannedprice,
              SPECIFICATIONS: this.stockItemFrom.specifications,
              TYPE: this.stockItemFrom.type,
              MEASUREMENTUNIT: this.stockItemFrom.measurementunit,
              STATUS: this.stockItemFrom.status
            }
            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
              //清空表单
              //隐藏对话框
              this.dialogFormVisible2 = false;
              this.dialogFormVisible4 = false;
              this.cleanItemForm();
              if (resp.data != null) {
                this.findAll();
                this.$message({
                  type: 'success',
                  message: '修改明细成功!'
                });
              }
            }).catch(error => {
              console.log("出错了");
            });
          } else {
            console.log('修改明细失败');
            return false;
          }
        });
      },
      develop: function() {
        this.$message({
          type: 'success',
          message: '该功能尚在开发中!'
        });
      },
      //多条件查询
      doSubmit5: function() {
        this.data1 = this.result;
        if (this.warehouseno == null && this.drawername1 == null && this.transport == null) {
          this.findAll();
        }
        if (this.warehouseno != null && this.warehouseno != "") {
          this.data1 = this.data1.filter(f => f.warehouseno.indexOf(this.warehouseno) != -1);
        }
        if (this.drawername1 != null && this.drawername1 != "") {
          this.data1 = this.data1.filter(a => a.drawername1.indexOf(this.drawername1) != -1);
        }
        if (this.transport != null && this.transport != "") {
          this.data1 = this.data1.filter(b => b.transport.indexOf(this.transport) != -1);
        }
        return this.data1;
      },
      cleanInput: function() {
        this.warehouseno = null;
        this.drawername1 = null;
        this.transport = null;
      }
    }

  }
</script>
<style scoped>

</style>
