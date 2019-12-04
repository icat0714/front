<template>
  <div>
      <!-- 管理分区 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="档案编号">
        <el-input v-model="formInline.name" placeholder="档案编号"></el-input>
      </el-form-item>

      <el-form-item label="档案名称">
        <el-input v-model="formInline.name" placeholder="档案名称"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-row>
      <el-button size="mini" type="primary" @click="dialogFormVisible=true">新增</el-button>
      <div class="export">
           <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="success">导出</el-button>
      </div>
    </el-row>


    <el-table :data="tableData1" style="width: 100%" id="table">
      <el-table-column label="序号" width="100" prop="id">
      </el-table-column>
      <el-table-column label="定区编码" width="100" prop="zonecode">
      </el-table-column>
      <el-table-column label="省份" width="100" prop="province">
      </el-table-column>
      <el-table-column label="城市" width="100" prop="city">
      </el-table-column>
      <el-table-column label="区（县）" width="100" prop="county">
      </el-table-column>
      <el-table-column label="关键字" width="100" prop="keyword">
      </el-table-column>
      <el-table-column label="起始号" width="100" prop="startint">
      </el-table-column>
      <el-table-column label="终止号" width="100" prop="terminateint">
      </el-table-column>
      <el-table-column label="单双号" width="100" prop="sdint">
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
              <el-form-item label="定区编码">
                <el-input v-model="form.ZONECODE" placeholder="定区编码"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="省份">
                <el-input v-model="form.PROVINCE" placeholder="省份"></el-input>
                <!-- <el-radio v-model="form.GRADE" label="1">是</el-radio>
                <el-radio v-model="form.GRADE" label="0">否</el-radio> -->
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="城市">
                <el-input v-model="form.CITY" placeholder="城市"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="区（县）">
                <el-input v-model="form.COUNTY" placeholder="区（县）"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="关键字">
                <el-input v-model="form.KEYWORD" placeholder="关键字"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="起始号">
                 <el-input v-model="form.STARTINT" placeholder="起始号"></el-input>
                <!-- <el-input type="textarea" :rows="2" v-model="form.REMARKS"></el-input> -->
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="终止号">
                 <el-input v-model="form.TERMINATEINT" placeholder="终止号"></el-input>
                <!-- <el-input type="textarea" :rows="2" v-model="form.REMARKS"></el-input> -->
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="单双号">
                 <el-input v-model="form.SDINT" placeholder="单双号"></el-input>
                <!-- <el-input type="textarea" :rows="2" v-model="form.REMARKS"></el-input> -->
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
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'


  export default {
    name: 'BasPartition',
    data: function() {
      return {
        formInline: {
          name: ''
        },
        /* tableData: [{
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
        }], */
        dialogFormVisible: false,
        form: {
          ID:null,
          PROVINCE: null,
          CITY: null,
          COUNTY: null,
          ZONECODE: null,
          KEYWORD: null,
          STARTINT: null,
          TERMINATEINT: null,
          SDINT: null
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
        this.form.ID=row.id;
        this.form.ZONECODE = row.zonecode;
        this.form.PROVINCE = row.Province;
        this.form.CITY = row.city;
        this.form.COUNTY = row.county;
        this.form.KEYWORD = row.keyword;
        this.form.STARTINT = row.startint;
        this.form.TERMINATEINT = row.terminateint;

        this.dialogFormVisible = true;

      },
      handleDelete: function(row) {

      },
      addDS: function() {

        if (this.title == '新增') {
          axios.post("http://localhost/addBasPartition", qs.stringify(this.form)).then(resp => {
            console.log(resp.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
            axios.post("http://localhost/updateBasPartition", qs.stringify(this.form)).then(resp => {
              console.log(resp.data);
            }).catch(error => {
              console.log(error);
            });
        }
        this.title = "新增";
        this.form.ZONECODE = null;
        this.form.PROVINCE = null;
        this.form.CITY = null;
        this.form.COUNTY = null;
        this.form.KEYWORD = null;
        this.form.STARTINT = null;
        this.form.TERMINATEINT = null;
        this.form.SDINT = null;
        this.dialogFormVisible=false;

      },
      formatGrade:function(row, column, cellValue){
        if(cellValue==0){
          return'否';
        }else{
          return '是';
        }
      },
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#table'));
        /* get binary string as output */
        let wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        });
        try {
          FileSaver.saveAs(new Blob([wbout], {
            type: 'application/octet-stream'
          }), '用户提交返利表.xlsx');
        } catch (e) {
          if (typeof console !== 'undefined')
            console.log(e, wbout)
        }
        return wbout
      }
    },
    created() {
      axios.post("http://localhost/json_BasPartitionList", null).then(resp => {
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
