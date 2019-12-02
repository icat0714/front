<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="入库交接单:">
        <el-input v-model="formInline.name" placeholder="入库交接单"></el-input>
      </el-form-item>
      <el-form-item label="接货时间">
        <el-input v-model="formInline.name" placeholder="接货时间"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="gengDuo=!gengDuo">更多</el-button>
      </el-form-item>


      <div v-show="gengDuo">
        <el-form-item label="接货人">
          <el-input v-model="formInline.name" placeholder="接货人"></el-input>
        </el-form-item>
        <el-form-item label="接收单位">
          <el-input v-model="formInline.name" placeholder="接收单位"></el-input>
        </el-form-item>
        <el-form-item label="发货人:">
          <el-input v-model="formInline.name" placeholder="发货人"></el-input>
        </el-form-item>
        <el-form-item label="发货单位">
          <el-input v-model="formInline.name" placeholder="发货单位"></el-input>
        </el-form-item>
        <el-form-item label="工作单状态">
          <el-select v-model="formInline.name">
            <el-option value="0" label="请选择"></el-option>
            <el-option value="1" label="中转入库"></el-option>
            <el-option value="2" label="二次入库"></el-option>
            <el-option value="3" label="初始入库"></el-option>
            <el-option value="4" label="有货无单"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单号:">
          <el-input v-model="formInline.name" placeholder="单号"></el-input>
        </el-form-item>
        <el-form-item label="合包号">
          <el-input v-model="formInline.name" placeholder="合包号"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-row>
      <el-button size="small" type="primary" @click="opAdd">新增入库</el-button>
      <el-button size="small" type="success">新增异常记录</el-button>
    </el-row>


    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="入库交接单号" width="120" prop="id">
      </el-table-column>

      <el-table-column label="接货时间" width="150" prop="time">
      </el-table-column>
      <el-table-column label="接货人" width="150" prop="acceptperson">
      </el-table-column>
      <el-table-column label="接收单位" width="150" prop="acceptcompany">
      </el-table-column>
      <el-table-column label="发货人" width="150" prop="deliveryperson">
      </el-table-column>
      <el-table-column label="发货单位" width="150" prop="deliverycompany">
      </el-table-column>


      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="ckmx(scope.row)">查看明细</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="900px">
      <el-form :model="form" :inline="true">
        <el-form-item label="接货人">
          <el-select v-model="form.acceptperson">
            <el-option v-for="(ee,index) in selectForm" :key="'key-'+ee.id" :label="ee.empname" :value="ee.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货人">
          <el-select v-model="form.deliveryperson">
            <el-option v-for="(ee,index) in selectForm" :key="'key-'+ee.id" :label="ee.empname" :value="ee.id"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <table>
          <tr>
            <td>单号</td>
            <td>合包号</td>
            <td>重量</td>
            <td>关联出库交接单</td>
            <td>状态</td>
          </tr>
          <tr>
            <td>
              <el-input v-model="form1.id" auto-complete="off" placeholder="单号"></el-input>
            </td>
            <td>
              <el-input v-model="form1.packageid" auto-complete="off" placeholder="合包号"></el-input>
            </td>
            <td>
              <el-input v-model="form1.weight" auto-complete="off" placeholder="重量"></el-input>
            </td>
            <td>
              <el-input v-model="form1.outboundid" auto-complete="off" placeholder="关联出库交接单"></el-input>
            </td>
            <td>
              <el-select v-model="form1.state">
                <el-option label="请选择" value="0"></el-option>
                <el-option label="中转入库" value="0"></el-option>
                <el-option label="二次入库" value="1"></el-option>
                <el-option label="初始入库" value="2"></el-option>
                <el-option label="有货无单" value="3"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              <el-input v-model="form2.id" auto-complete="off" placeholder="单号"></el-input>
            </td>
            <td>
              <el-input v-model="form2.packageid" auto-complete="off" placeholder="合包号"></el-input>
            </td>
            <td>
              <el-input v-model="form2.weight" auto-complete="off" placeholder="重量"></el-input>
            </td>
            <td>
              <el-input v-model="form2.outboundid" auto-complete="off" placeholder="关联出库交接单"></el-input>
            </td>
            <td>
              <el-select v-model="form2.state">
                <el-option label="请选择" value="0"></el-option>
                <el-option label="中转入库" value="0"></el-option>
                <el-option label="二次入库" value="1"></el-option>
                <el-option label="初始入库" value="2"></el-option>
                <el-option label="有货无单" value="3"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              <el-input v-model="form3.id" auto-complete="off" placeholder="单号"></el-input>
            </td>
            <td>
              <el-input v-model="form3.packageid" auto-complete="off" placeholder="合包号"></el-input>
            </td>
            <td>
              <el-input v-model="form3.weight" auto-complete="off" placeholder="重量"></el-input>
            </td>
            <td>
              <el-input v-model="form3.outboundid" auto-complete="off" placeholder="关联出库交接单"></el-input>
            </td>
            <td>
              <el-select v-model="form3.state">
                <el-option label="请选择" value="0"></el-option>
                <el-option label="中转入库" value="0"></el-option>
                <el-option label="二次入库" value="1"></el-option>
                <el-option label="初始入库" value="2"></el-option>
                <el-option label="有货无单" value="3"></el-option>
              </el-select>
            </td>
          </tr>
        </table>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="收货地址" :visible.sync="dialogTableVisible_01">
      <el-table :data="gridData">
        <el-table-column property="id" label="单号" width="150"></el-table-column>
        <el-table-column property="packageid" label="合包号" width="200"></el-table-column>
        <el-table-column property="weight" label="重量" width="150"></el-table-column>
        <el-table-column property="outboundid" label="关联出库交接单" width="150"></el-table-column>
        <el-table-column property="state" label="状态" width="150"></el-table-column>
      </el-table>
    </el-dialog>



  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'storage',
    data: function() {
      return {
        formInline: {
          name: ''
        },
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
        }],
        gengDuo: false,
        dialogFormVisible: false,
        form: {
          name: null,
          time: null,
          acceptperson: null,
          acceptcompany: null,
          deliveryperson: null,
          deliverycompany: null
        },
        form1:{
          id:null,
          packageid:null,
          weight:null,
          outboundid:null,
          state:null
        },
        form2:{
          id:null,
          packageid:null,
          weight:null,
          outboundid:null,
          state:null
        },
        form3:{
          id:null,
          packageid:null,
          weight:null,
          outboundid:null,
          state:null
        },
        selectForm:[
          {id:1,empname:'hxb'},
          {id:2,empname:'hhh'}
        ],
        gridData:[],
        dialogTableVisible_01:false

      }
    },

    methods: {
      onSelect: function() {

      },
      handleEdit: function(row) {
        console.log(row);
      },
      handleDelete: function(row) {
        console.log(row);
        let param={
          ID:row.id
        };
        axios.post("http://localhost/deleteSorStorage", qs.stringify(param)).then(resp => {
          console.log(resp.data);
        }).catch(error => {
          console.log(error);
        });

        axios.post("http://localhost/deleteSorStoragedetails", qs.stringify(param)).then(resp => {
          console.log(resp.data);
        }).catch(error => {
          console.log(error);
        });


      },
      handleSelectionChange: function() {

      },
      ckmx: function(row) {
        this.dialogTableVisible_01=true
        console.log(row.id);
        let param={
          ID:row.id
        };
        axios.post("http://localhost/json_SorStoragedetailsList", qs.stringify(param)).then(resp => {
          console.log(resp.data);
          this.gridData=resp.data
        }).catch(error => {
          console.log(error);
        });
      },
      opAdd: function() {
        this.dialogFormVisible = true;
      },
      onSubmit:function(){

        let param={
          time:this.form.time,
          ACCEPTPERSON:this.form.acceptperson,
          ACCEPTCOMPANY:this.form.acceptcompany,
          DELIVERYPERSON:this.form.deliveryperson,
          DELIVERYCOMPANY:this.form.deliverycompany
        }

        axios.post("http://localhost:80/addSorStorage", qs.stringify(param)).then(resp => {
          this.form2.outboundid=this.form3.outboundid=this.form1.outboundid=resp.data
        }).catch(error => {
          console.log(error);
        });

        if(this.form1.id!=null){
          param={
            ID:this.form1.id,
            PACKAGEID:this.form1.packageid,
            WEIGHT:this.form1.weight,
            OUTBOUNDID:this.form1.outboundid,
            STATE:this.form1.state
          }
          axios.post("http://localhost:80/addSorStoragedetails", qs.stringify(param)).then(resp => {
          }).catch(error => {
            console.log(error);
          });
        }

        if(this.form2.id!=null){
          param={
            ID:this.form2.id,
            PACKAGEID:this.form2.packageid,
            WEIGHT:this.form2.weight,
            OUTBOUNDID:this.form2.outboundid,
            STATE:this.form2.state
          }
          axios.post("http://localhost:80/addSorStoragedetails", qs.stringify(param)).then(resp => {
          }).catch(error => {
            console.log(error);
          });
        }


        if(this.form3.id!=null){
          param={
            ID:this.form3.id,
            PACKAGEID:this.form3.packageid,
            WEIGHT:this.form3.weight,
            OUTBOUNDID:this.form3.outboundid,
            STATE:this.form3.state
          }
          axios.post("http://localhost:80/addSorStoragedetails", qs.stringify(param)).then(resp => {
          }).catch(error => {
            console.log(error);
          });
        }

        this.dialogFormVisible=false


      }
    },
    created: function() {
      axios.post("http://localhost/json_sorStorageList", null).then(resp => {
        this.tableData = resp.data
      }).catch(error => {
        console.log(error);
      });

      axios.post("http://localhost/josn_SyEmpList", null).then(resp => {
        this.selectForm = resp.data
      }).catch(error => {
        console.log(error);
      });



    }


  }
</script>

<style>
</style>
