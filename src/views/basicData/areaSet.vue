<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="省份">
        <el-select v-model="formInline.Province">
          <el-option v-for="pro in proData" :key="'pro'+pro.id" :label="pro.name" :value="pro.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="城市">
        <el-select v-model="formInline.city">
          <el-option v-for="c in cv" :key="'key-'+c.name" :label="c.name" :value="c.name"></el-option>
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
      <el-table-column label="省份" width="100" prop="province">
      </el-table-column>
      <el-table-column label="城市" width="100" prop="city">
      </el-table-column>
      <el-table-column label="区(县)" width="100" prop="county">
      </el-table-column>
      <el-table-column label="邮政编码" width="100" prop="postalcode">
      </el-table-column>
      <el-table-column label="简码" width="100" prop="simplecode">
      </el-table-column>
      <el-table-column label="城市编码" width="100" prop="citycode">
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
              <el-form-item label="省份">
                <el-input v-model="form.NAME" placeholder="省份"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="城市">
                <el-input v-model="form.NAME" placeholder="城市"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="区(县)">
                <el-input v-model="form.OPERATORID" placeholder="区(县)"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="邮政编码">
                <el-input v-model="form.OPERATIONUNITID" placeholder="邮政编码"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="操作时间">
                <el-input v-model="form.OPERATIONTIME" placeholder="操作单位"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="form.REMARKS"></el-input>
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
    name: 'areaSet',
    data: function() {
      return {
        formInline: {
          Province: ''
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
          GRADE: null,
          REMARKS: null,
          OPERATORID: null,
          OPERATIONUNITID: null,
          OPERATIONTIME: null
        },
        title: "新增",
        tableData1: [],
        proData:[{name:'北京市',id:0},{name:'天津市',id:1},{name:'河北省',id:2}],
        cityData:[
          [{name:'平谷区',code:'110117'},{name:'东城区',code:'110101'},{name:'西城区',code:'110102'},{name:'崇文区',code:'110103'},{name:'宣武区',code:'110104'}],
          [{name:'和平区',code:'120101'},{name:'河东区',code:'120102'},{name:'河西区',code:'120103'}],
          [{name:'石家庄市',code:'130100'},{name:'长安区',code:'130102'},{name:'桥东区',code:'130103'},{name:'桥西区',code:'130104'},{name:'新华区',code:'130105'},{name:'井陉矿区',code:'130107'}]
        ]
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
        this.form.NAME = row.name;
        this.form.GRADE = row.grade;
        this.form.REMARKS = row.remarks;
        this.form.OPERATORID = row.operatorid;
        this.form.OPERATIONUNITID = row.operationunitid;
        this.form.OPERATIONTIME = row.operationtime;

        this.dialogFormVisible = true;

      },
      handleDelete: function(row) {

      },
      addDS: function() {

        if (this.title == '新增') {
          axios.post("http://localhost/addBasBasicarchives", qs.stringify(this.form)).then(resp => {
            console.log(resp.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
          axios.post("http://localhost/updateBasBasicarchives", qs.stringify(this.form)).then(resp => {
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
        this.dialogFormVisible = false;

      },
      formatGrade: function(row, column, cellValue) {
        if (cellValue == 0) {
          return '否';
        } else {
          return '是';
        }
      }
    },
    computed:{
      cv:function(){
        for(let i=0;i<this.proData.length;i++){
          if(this.formInline.Province==this.proData[i].name){
            return this.cityData[i];
          }
        }
        return null;
      }
    },
    created() {
      axios.post("http://localhost/json_BasAreaList", null).then(resp => {
        console.log(resp.data);
        this.tableData = resp.data;
        this.tableData1 = resp.data;
      }).catch(error => {
        console.log(error);
      });
    }


  }
</script>


<style>
</style>
