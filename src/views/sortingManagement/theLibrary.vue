<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="出库交接单:">
        <el-input v-model="formInline.name" placeholder="出库交接单"></el-input>
      </el-form-item>
      <el-form-item label="交接单类型">
        <el-select v-model="formInline.name">
          <el-option label="请选择" value=""></el-option>
          <el-option label="市内物流交接单" value=""></el-option>
          <el-option label="长途物流交接单" value=""></el-option>
          <el-option label="派送清单" value=""></el-option>
          <el-option label="发货交接单" value=""></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="gengDuo=!gengDuo">更多</el-button>
      </el-form-item>


      <div v-show="gengDuo">
        <el-form-item label="线路资源">
          <el-input v-model="formInline.name" placeholder="线路资源"></el-input>
        </el-form-item>
        <el-form-item label="物流方向">
          <el-input v-model="formInline.name" placeholder="物流方向"></el-input>
        </el-form-item>
        <el-form-item label="接货人">
          <el-input v-model="formInline.name" placeholder="接货人"></el-input>
        </el-form-item>
        <el-form-item label="承运商">
          <el-input v-model="formInline.name" placeholder="承运商"></el-input>
        </el-form-item>

        <el-form-item label="出货人">
          <el-input v-model="formInline.name" placeholder="出货人"></el-input>
        </el-form-item>
        <el-form-item label="出货时间">
          <el-input v-model="formInline.name" placeholder="出货时间"></el-input>
        </el-form-item>
        <el-form-item label="出货单位">
          <el-input v-model="formInline.name" placeholder="出货单位"></el-input>
        </el-form-item>
        <el-form-item label="确认人">
          <el-input v-model="formInline.name" placeholder="确认人"></el-input>
        </el-form-item>

        <el-form-item label="确认时间">
          <el-input v-model="formInline.name" placeholder="确认时间"></el-input>
        </el-form-item>
        <el-form-item label="工作单号">
          <el-input v-model="formInline.name" placeholder="工作单号"></el-input>
        </el-form-item>
        <el-form-item label="合包号">
          <el-input v-model="formInline.name" placeholder="合包号"></el-input>
        </el-form-item>
        <el-form-item label="扫描时间">
          <el-input v-model="formInline.name" placeholder="扫描时间"></el-input>
        </el-form-item>

        <el-form-item label="是否扫描" size="mini">
          <el-select v-model="formInline.name">
            <el-option value="0" label="请选择"></el-option>
            <el-option value="1" label="是"></el-option>
            <el-option value="2" label="否"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="下环节入库" size="mini">
          <el-select v-model="formInline.name">
            <el-option value="0" label="请选择"></el-option>
            <el-option value="1" label="是"></el-option>
            <el-option value="2" label="否"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二次入库" size="mini">
          <el-select v-model="formInline.name">
            <el-option value="0" label="请选择"></el-option>
            <el-option value="1" label="是"></el-option>
            <el-option value="2" label="否"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="录入货票号" size="mini">
          <el-select v-model="formInline.name">
            <el-option value="0" label="请选择"></el-option>
            <el-option value="1" label="是"></el-option>
            <el-option value="2" label="否"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>

    <el-row>
      <el-button size="small" type="primary" @click="add">新增出库</el-button>
    </el-row>


    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column label="出库交接单号" width="100" prop="id">
      </el-table-column>

      <el-table-column label="交接单类型" width="100" prop="handovertype">
      </el-table-column>
      <el-table-column label="线路资源" width="100" prop="line">
      </el-table-column>
      <el-table-column label="物流方向" width="100" prop="direction">
      </el-table-column>
      <el-table-column label="接货人" width="100" prop="acceptperson">
      </el-table-column>
      <el-table-column label="承运商" width="100" prop="carriers">
      </el-table-column>
      <el-table-column label="出货人" width="100" prop="deliveryperson">
      </el-table-column>
      <el-table-column label="出货时间" width="100" prop="time1">
      </el-table-column>
      <el-table-column label="出货单位" width="100" prop="deliverycompany">
      </el-table-column>
      <el-table-column label="确认人" width="100" prop="enterperson">
      </el-table-column>
      <el-table-column label="确认时间" width="100" prop="time2">
      </el-table-column>


      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button  size="mini" @click="ckmx(scope.row)">查看明细</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="新增出库交接单" :visible.sync="dialogFormVisible">
      <el-form :model="form" :inline="true">

        <el-row>
          <el-button size="mini" @click="addRow">新增明细行</el-button>
          <el-button size="mini">删除明细行</el-button>
          <el-button size="mini">保存</el-button>
          <el-button size="mini">关闭</el-button>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="8"><div class="grid-content bg-purple">交接单类型<el-select v-model="form.HANDOVERTYPE">
            <el-option label="市内物流交接单" value="0"></el-option>
            <el-option label="长途物流交接单" value="0"></el-option>
            <el-option label="派送清单" value="0"></el-option>
            <el-option label="发货交接单" value="0"></el-option>
          </el-select></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">线路资源<el-input v-model="form.LINE"></el-input></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">物流方向<el-input v-model="form.DIRECTION"></el-input></div></el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="8"><div class="grid-content bg-purple">运输方式<el-input v-model="form.name" placeholder="运输方式"></el-input></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">承运商<el-input v-model="form.CARRIERS" placeholder="承运商"></el-input></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">接货人<el-input v-model="form.ACCEPTPERSON" placeholder="接货人"></el-input></div></el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="8"><div class="grid-content bg-purple">交货人<el-input v-model="form.DELIVERYPERSON" placeholder="交货人"></el-input></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">交货时间<el-input v-model="form.time1" placeholder="交货时间"></el-input></div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">交货单位<el-input v-model="form.DELIVERYCOMPANY" placeholder="交货单位"></el-input></div></el-col>
        </el-row>
        <br />
        <table cellspacing="0" width="100%" id="tabRow">

          <tr>
            <td>序号</td>
            <td>单号</td>
            <td>合包号</td>
            <td>重量</td>
            <td>体积</td>
            <td>扫描时间</td>
            <td>扫描</td>
            <td>下环节入库</td>
            <td>二次入库</td>
          </tr>
          <tr>
            <td>1</td>
            <td><el-input v-model="form1.ID" placeholder="单号"></el-input></td>
            <td><el-input v-model="form1.PACKAGEID" placeholder="合包号"></el-input></td>
            <td><el-input v-model="form1.WEIGHT" placeholder="重量"></el-input></td>
            <td><el-input v-model="form1.VOLUME" placeholder="体积"></el-input></td>
            <td><el-input v-model="form1.SCANDATE" placeholder="扫描时间"></el-input></td>
            <td>
              <el-select v-model="form1.ISSCAN" placeholder="扫描">
                <!-- <el-option label="请选择" value="0"></el-option> -->
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </td>
            <td>
              <el-select v-model="form1.ISNEXTSTORAGE" placeholder="下环节入库">
                <!-- <el-option label="请选择" value="0"></el-option> -->
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </td>
            <td>
              <el-select v-model="form1.ISDOUBLESTORAGE" placeholder="二次入库">
                <!-- <el-option label="请选择" value="0"></el-option> -->
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td><el-input v-model="form2.ID" placeholder="单号"></el-input></td>
            <td><el-input v-model="form2.PACKAGEID" placeholder="合包号"></el-input></td>
            <td><el-input v-model="form2.WEIGHT" placeholder="重量"></el-input></td>
            <td><el-input v-model="form2.VOLUME" placeholder="体积"></el-input></td>
            <td><el-input v-model="form2.SCANDATE" placeholder="扫描时间"></el-input></td>
            <td>
              <el-select v-model="form2.ISSCAN" placeholder="扫描">
                <!-- <el-option label="请选择" value="0"></el-option> -->
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </td>
            <td>
              <el-select v-model="form2.ISNEXTSTORAGE" placeholder="下环节入库">
                <!-- <el-option label="请选择" value="0"></el-option> -->
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </td>
            <td>
              <el-select v-model="form2.ISDOUBLESTORAGE" placeholder="二次入库">
                <!-- <el-option label="请选择" value="0"></el-option> -->
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </td>
          </tr>


        </table>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSorOutBound">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'theLibrary',
    data: function() {
      return {
        formInline: {
          name:null
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
        dialogFormVisible:false,
        form:{
          name:null,
          HANDOVERTYPE:null,
          LINE:null,
          DIRECTION:null,
          ACCEPTPERSON:null,
          CARRIERS:null,
          DELIVERYPERSON:null,
          DELIVERYCOMPANY:null,
          ENTERPERSON:null,
          time1:null
        },
        form1:{
          ID:null,
          PACKAGEID:null,
          WEIGHT:null,
          VOLUME:null,
          SCANDATE:null,
          ISSCAN:null,
          ISNEXTSTORAGE:null,
          ISDOUBLESTORAGE:null
        },
        form2:{
          ID:null,
          PACKAGEID:null,
          WEIGHT:null,
          VOLUME:null,
          SCANDATE:null,
          ISSCAN:null,
          ISNEXTSTORAGE:null,
          ISDOUBLESTORAGE:null
        }

      }
    },

    methods: {
      onSelect: function() {

      },
      handleEdit:function(row) {
        console.log(row);
      },
      handleDelete:function(row) {

        let param={
          ID:row.id
        }

        axios.post("http://localhost/deleteSorOutbound", qs.stringify(param)).then(resp => {
          console.log(resp.data)
        }).catch(error => {
          console.log(error);
        });
      },
      handleSelectionChange:function() {

      },
      ckmx:function(){

      },
      add:function(){
        this.dialogFormVisible=true;
      },
      addRow:function(){

        alert('123');

      },
      addSorOutBound:function(){
        this.dialogFormVisible=false;
        axios.post("http://localhost/addSorOutbound", qs.stringify(this.form)).then(resp => {
          console.log(resp.data)
        }).catch(error => {
          console.log(error);
        });
        axios.post("http://localhost/addSorOutbounddetails", qs.stringify(this.form1)).then(resp => {
          console.log(resp.data)
        }).catch(error => {
          console.log(error);
        });
        axios.post("http://localhost/addSorOutbounddetails", qs.stringify(this.form2)).then(resp => {
          console.log(resp.data)
        }).catch(error => {
          console.log(error);
        });


      }
    },
    created() {
      axios.post("http://localhost/json_SorOutboundList", null).then(resp => {
        console.log(resp.data);
        this.tableData=resp.data;
      }).catch(error => {
        console.log(error);
      });
    }




  }



</script>

<style>
</style>
