<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="线路名称">
        <el-select v-model="formInline.name" placeholder="线路名称">
          <el-option v-for="t in TrackData" :key="'key-'+t.id" :label="t.linename" :value="t.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="线路类型">
        <el-select v-model="formInline.name">
          <el-option v-for="t in TrackData" :key="'key-'+t.id" :label="t.linetype" :value="t.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-row>
      <el-button size="mini" type="primary" @click="dialogFormVisible=true">新增</el-button>
    </el-row>


    <el-table :data="tableData1" style="width: 100%">
      <el-table-column label="序号" width="100" prop="id">
      </el-table-column>
      <el-table-column label="线路类型" width="100" prop="linetype" :formatter="formatLine">
      </el-table-column>
      <el-table-column label="线路名称" width="100" prop="lineid">
      </el-table-column>
      <el-table-column label="车牌号" width="100" prop="licenseplateint">
      </el-table-column>
      <el-table-column label="承运商" width="100" prop="carrier">
      </el-table-column>
      <el-table-column label="车型" width="100" prop="models">
      </el-table-column>
      <el-table-column label="司机" width="100" prop="driver">
      </el-table-column>
      <el-table-column label="电话" width="100" prop="telephone">
      </el-table-column>
      <el-table-column label="吨控" width="100" prop="ton">
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
              <el-form-item label="线路名称">
                <el-select v-model="form.LINEID" placeholder="线路名称">
                  <el-option v-for="t in TrackData" :key="'key-'+t.id" :label="t.linename" :value="t.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="线路类型">
                <el-select v-model="form.LINETYPE">
                  <el-option v-for="t in TrackData" :key="'key-'+t.id" :label="t.linetype" :value="t.id"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="车牌号">
                <el-input v-model="form.LICENSEPLATEINT" placeholder="车牌号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="承运商">
                <el-input v-model="form.CARRIER" placeholder="承运商"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="车型">
                <el-input v-model="form.MODELS" placeholder="车型"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="司机">
                <el-input v-model="form.DRIVER" placeholder="司机"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="电话">
                <el-input v-model="form.TELEPHONE" placeholder="电话"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="吨控">
                <el-input v-model="form.TON" placeholder="吨控"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <div>
              <el-form-item label="备注">
                <el-input v-model="form.REMARKS" type="textarea" :rows="2"></el-input>
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
    name: 'shuttleBusSet',
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
          ID:null,
          LINETYPE: null,
          LINEID: null,
          LICENSEPLATEINT: null,
          CARRIER: null,
          MODELS: null,
          DRIVER: null,
          TELEPHONE: null,
          TON: null,
          REMARKS: null
        },
        title: "新增",
        tableData1:[],
        TrackData:[]
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
        this.form.ID=row.id;
        this.form.LINETYPE = row.linetype;
        this.form.LINEID = row.lineid;
        this.form.LICENSEPLATEINT = row.licenseplateint;
        this.form.CARRIER = row.carrier;
        this.form.MODELS = row.models;
        this.form.DRIVER = row.driver;
        this.form.TELEPHONE = row.telephone;
        this.form.TON = row.ton;
        this.form.REMARKS = row.remarks;

        this.dialogFormVisible = true;

      },
      handleDelete: function(row) {

      },
      addDS: function() {

        if (this.title == '新增') {
          axios.post("http://localhost/addBasShuttlebus", qs.stringify(this.form)).then(resp => {
            console.log(resp.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
          axios.post("http://localhost/updateBasShuttlebus", qs.stringify(this.form)).then(resp => {
            console.log(resp.data);
          }).catch(error => {
            console.log(error);
          });
        }
        this.title = "新增";
        this.form.ID=null;
        this.form.LINETYPE = null;
        this.form.LINEID = null;
        this.form.LICENSEPLATEINT = null;
        this.form.CARRIER = null;
        this.form.MODELS = null;
        this.form.DRIVER = null;
        this.form.TELEPHONE = null;
        this.form.TON = null;
        this.form.REMARKS = null;
        this.dialogFormVisible=false;
      },
      formatLine:function(row, column, cellValue){

      }
    },
    created() {
      axios.post("http://localhost/json_LogTrackList", null).then(resp => {
        console.log(resp.data);
        this.TrackData=resp.data;
      }).catch(error => {
        console.log(error);
      });

      axios.post("http://localhost/json_BasShuttlebusList", null).then(resp => {
        console.log(resp.data);
        this.tableData=resp.data;
        this.tableData1=resp.data;
      }).catch(error => {
        console.log(error);
      });

    }


  }
</script>

<style>
</style>
