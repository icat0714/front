<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="员工工号">
        <el-input v-model="formInline.name" placeholder="员工工号"></el-input>
      </el-form-item>

      <el-form-item label="员工名称">
        <el-input v-model="formInline.name" placeholder="员工名称"></el-input>
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
      <el-table-column label="员工工号" width="100" prop="empno">
      </el-table-column>
      <el-table-column label="员工名称" width="100" prop="empname">
      </el-table-column>
      <el-table-column label="手机号码" width="100" prop="mobileno">
      </el-table-column>
      <el-table-column label="PDA标志" width="100" prop="pda">
      </el-table-column>
      <el-table-column label="作废标记" width="100" prop="invalidatemark">
      </el-table-column>
      <el-table-column label="类型" width="100" prop="type">
      </el-table-column>
      <el-table-column label="所属单位" width="100" prop="subordinateunit">
      </el-table-column>
      <el-table-column label="车型" width="100" prop="models">
      </el-table-column>
      <el-table-column label="车牌号" width="100" prop="plateint">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>



    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="60%">
      <el-form :inline="true" :model="form">

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="员工工号">
                <el-select v-model="form.EMPNO" placeholder="员工工号">
                  <el-option v-for="t in EmpData" :key="'key-'+t.id" :label="t.empno" :value="t.empno"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="员工名称">
                <el-input v-model="EmpName"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="手机号码">
                <el-input v-model="form.MOBILENO"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="取派员类型">
                <el-input v-model="form.TYPE" placeholder="取派员类型"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="是否使用PDA">
                <el-radio v-model="form.PDA" label="1" value="1">是</el-radio>
                <el-radio v-model="form.PDA" label="0" value="0">否</el-radio>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="收派标准(公斤)">
                <el-select v-model="form.STANDARDKG" placeholder="收派标准(公斤)">
                  <el-option v-for="t in BasDS" :key="'key-'+t.id" :label="t.minweight+'-'+t.maxweight" :value="t.maxweight"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="收派标准(长度)">
                <el-select v-model="form.STANDARDLENGTH">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="车型">
                <el-input v-model="form.MODELS" placeholder="车型"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="车牌号">
                <el-input v-model="form.PLATEINT" placeholder="车牌号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="作废标记">
                <el-radio label="1" v-model="form.INVALIDATEMARK" value="1">是</el-radio>
                <el-radio label="0" v-model="form.INVALIDATEMARK" value="0">否</el-radio>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="所属单位">
                <el-input v-model="form.SUBORDINATEUNIT" placeholder="所属单位"></el-input>
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
    name: 'dispatchingPersonnelSet',
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
          EMPNO: null,
          EMPNAME: null,
          MOBILENO: null,
          TYPE: null,
          PDA: null,
          STANDARDKG: null,
          STANDARDLENGTH: null,
          MODELS: null,
          PLATEINT: null,
          INVALIDATEMARK: null,
          SUBORDINATEUNIT: null
        },
        title: "新增",
        tableData1: [],
        EmpData: [],
        BasData: [],
        BasDS: []
      }
    },

    methods: {
      onSelect: function() {
        let {
          tableData
        } = this;
        let name = this.formInline.name;
        let p1 = tableData.filter(c => c.name.indexOf(name) != -1);
        this.tableData1 = p1;
      },
      handleEdit: function(row) {
        this.title = "修改";
        this.form.EMPNO = row.empno;
        this.form.EMPNAME = row.empname;
        this.form.MOBILENO = row.mobileno;
        this.form.TYPE = row.type;
        this.form.PDA = row.pad;
        this.form.STANDARDKG = row.standardkg;
        this.form.STANDARDLENGTH = row.standardlength;
        this.form.MODELS = row.models;
        this.form.PLATEINT = row.plateint;
        this.form.INVALIDATEMARK = row.invalidatemark;
        this.form.SUBORDINATEUNIT = row.subordinateunit;
        console.log(this.form.INVALIDATEMARK);
        this.dialogFormVisible = true;

      },
      handleDelete: function(row) {

      },
      addDS: function() {

        if (this.title == '新增') {
          axios.post("http://localhost/addBasSubstitute", qs.stringify(this.form)).then(resp => {
            console.log(resp.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
          axios.post("http://localhost/updateBasSubstitute", qs.stringify(this.form)).then(resp => {
            console.log(resp.data);
          }).catch(error => {
            console.log(error);
          });
        }
        this.title = "新增";
        this.form.EMPNO = null;
        this.form.EMPNAME = null;
        this.form.MOBILENO = null;
        this.form.TYPE = null;
        this.form.PDA = null;
        this.form.STANDARDKG = null;
        this.form.STANDARDLENGTH = null;
        this.form.MODELS = null;
        this.form.PLATEINT = null;
        this.form.INVALIDATEMARK = null;
        this.form.SUBORDINATEUNIT = null;
        this.dialogFormVisible = false;
      },
      formatLine: function(row, column, cellValue) {

      }
    },
    computed:{
      EmpName:function(){
        for(let i=0;i<this.EmpData.length;i++){
          if(this.EmpData[i].empno==this.form.EMPNO){
            return this.EmpData[i].empname;
          }
          return null;
        }
      }
    },
    created() {

      axios.post("http://localhost/json_BasSubstitute", null).then(resp => {
        console.log(resp.data);
        this.tableData = resp.data;
        this.tableData1 = resp.data;
      }).catch(error => {
        console.log(error);
      });

      axios.post("http://localhost/josn_SyEmpList", null).then(resp => {
        console.log(resp.data);
        this.EmpData = resp.data;
      }).catch(error => {
        console.log(error);
      });

      axios.post("http://localhost/json_BasBasicarchivesList", null).then(resp => {
        console.log(resp.data);
        this.BasData = resp.data;
      }).catch(error => {
        console.log(error);
      });

      axios.post("http://localhost/json_BasDeliverystandardList", null).then(resp => {
        console.log(resp.data);
        this.BasDS = resp.data;
      }).catch(error => {
        console.log(error);
      });

    }



  }
</script>

<style>
</style>
