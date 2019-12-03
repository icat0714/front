<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="标准名称">
        <el-input v-model="formInline.name" placeholder="标准名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-row>
      <el-button size="mini" type="primary" @click="dialogFormVisible=true">新增</el-button>
    </el-row>


    <el-table :data="tableData1" style="width: 100%">
      <el-table-column label="收派标准名称" width="100" prop="name">
      </el-table-column>
      <el-table-column label="最小重量" width="100" prop="minweight">
      </el-table-column>
      <el-table-column label="最大重量" width="100" prop="maxweight">
      </el-table-column>
      <el-table-column label="操作人员" width="100" prop="operatorid">
      </el-table-column>
      <el-table-column label="操作单位" width="100" prop="operationunitid">
      </el-table-column>
      <el-table-column label="操作时间" width="100" prop="operationtime">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>



    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form">

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="标准名称">
                <el-input v-model="form.NAME" placeholder="收派标准名称"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="最小重量">
                <el-input v-model="form.MINWEIGHT" placeholder="最小重量"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="最大重量">
                <el-input v-model="form.MAXWEIGHT" placeholder="最大重量"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="操作人员">
                <el-input v-model="form.OPERATORID" placeholder="操作人员"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="操作单位">
                <el-input v-model="form.OPERATIONUNITID" placeholder="操作单位"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="操作时间">
                <el-input v-model="form.OPERATIONTIME" placeholder="操作时间"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDS">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'deliveryStandard',
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
        dialogFormVisible: false,
        form: {
          NAME: null,
          MINWEIGHT: null,
          MAXWEIGHT: null,
          OPERATORID: null,
          OPERATIONUNITID: null,
          OPERATIONTIME: null
        },
        title: "新增",
        tableData1:[]
      }
    },

    methods: {
      onSelect: function() {
        let {tableData}=this;
        let name=this.formInline.name;
        let p1=tableData.filter(c=>c.name.indexOf(name)!=-1);
        this.tableData1=p1;
      },
      handleEdit: function(row) {
        this.title = "修改";
        this.form.NAME = row.name;
        this.form.MINWEIGHT = row.minweight;
        this.form.MAXWEIGHT = row.maxweight;
        this.form.OPERATORID = row.operatorid;
        this.form.OPERATIONUNITID = row.operationunitid;
        this.form.OPERATIONTIME = row.operationtime;

        this.dialogFormVisible = true;

      },
      handleDelete: function(row) {

      },
      addDS: function() {

        if (this.title == '新增') {
          axios.post("http://localhost/addBasDeliverystandardList", qs.stringify(this.form)).then(resp => {
            console.log(resp.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
            axios.post("http://localhost/updateBasDeliverystandard", qs.stringify(this.form)).then(resp => {
              console.log(resp.data);
            }).catch(error => {
              console.log(error);
            });
        }
        this.title = "新增";
        this.form.NAME = null;
        this.form.MINWEIGHT = null;
        this.form.MAXWEIGHT = null;
        this.form.OPERATORID = null;
        this.form.OPERATIONUNITID = null;
        this.form.OPERATIONTIME = null;
        this.dialogFormVisible=false;
      }
    },
    created() {
      axios.post("http://localhost/json_BasDeliverystandardList", null).then(resp => {
        console.log(resp.data);
        this.tableData = resp.data;
        this.tableData1=resp.data;
      }).catch(error => {
        console.log(error);
      });
    }


  }
</script>

<style>
</style>
