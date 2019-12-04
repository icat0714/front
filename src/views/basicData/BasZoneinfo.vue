<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="所属单位">
        <el-select v-model="formInline.subordinateunit">
          <el-option v-for="t in UnitDate" :label="t.name" :key="'key-'+t.id" :value="t.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="定区编码">
        <el-select v-model="formInline.zonecode">
          <el-option v-for="t in tableData" :label="t.zonecode" :key="'key-'+t.id" :value="t.zonecode"></el-option>
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
      <el-table-column label="定区编码" width="100" prop="zonecode">
      </el-table-column>
      <el-table-column label="定区名称" width="100" prop="zonename">
      </el-table-column>
      <el-table-column label="定区负责人" width="100" prop="zonepeople">
      </el-table-column>
      <el-table-column label="联系电话" width="100" prop="telphone">
      </el-table-column>
      <el-table-column label="所属单位" width="100" prop="subordinateunit">
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
              <el-form-item label="定区名称">
                <el-input v-model="form.ZONENAME" placeholder="定区名称"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-form-item label="定区负责人">
                <el-input v-model="form.ZONEPEOPLE" placeholder="定区负责人"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="联系电话">
                <el-input v-model="form.TELPHONE" placeholder="联系电话"></el-input>
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
    name: 'BasZoneinfo',
    data: function() {
      return {
        formInline: {
          zonecode: null,
          subordinateunit: null
        },

        dialogFormVisible: false,
        form: {
          ID: null,
          ZONECODE: null,
          ZONENAME: null,
          ZONEPEOPLE: null,
          TELPHONE: null,
          SUBORDINATEUNIT: null
        },
        title: "新增",
        tableData: [],
        tableData1: [],
        UnitDate: []

      }
    },

    methods: {
      onSelect: function() {
        let {
          tableData,
          zonecode,
          subordinateunit
        } = this;
        let p1 = null;
        

        if (subordinateunit != '' && subordinateunit != null) {
          p1 = tableData.filter(a => a.subordinateunit.indexOf(subordinateunit) != -1);
          console.log(p1);
        }



        this.tableData1 = p1;
      },
      handleEdit: function(row) {
        this.title = "修改";
        this.form.ID = row.id;
        this.form.ZONECODE = row.zonecode;
        this.form.ZONENAME = row.zonename;
        this.form.ZONEPEOPLE = row.zonepeople;
        this.form.TELPHONE = row.telphome;
        this.form.SUBORDINATEUNIT = row.subordinateunit;

        this.dialogFormVisible = true;

      },
      handleDelete: function(row) {

      },
      addDS: function() {

        if (this.title == '新增') {
          axios.post("http://localhost/addBasZoneinfo", qs.stringify(this.form)).then(resp => {
            console.log(resp.data);
          }).catch(error => {
            console.log(error);
          });
        } else {
          axios.post("http://localhost/updateBasZoneinfo", qs.stringify(this.form)).then(resp => {
            console.log(resp.data);
          }).catch(error => {
            console.log(error);
          });
        }
        this.title = "新增";
        this.form.ZONECODE = null;
        this.form.ZONENAME = null;
        this.form.ZONEPEOPLE = null;
        this.form.TELPHONE = null;
        this.form.SUBORDINATEUNIT = null;
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
    computed: {
      cv: function() {
        for (let i = 0; i < this.proData.length; i++) {
          if (this.formInline.Province == this.proData[i].name) {
            return this.cityData[i];
          }
        }
        return null;
      }
    },
    created() {
      axios.post("http://localhost/json_BasZoneinfoList", null).then(resp => {
        console.log(resp.data);
        this.tableData = resp.data;
        this.tableData1 = resp.data;
      }).catch(error => {
        console.log(error);
      });

      axios.post("http://localhost/Unit/findAll", null).then(resp => {
        console.log(resp.data);
        this.UnitDate = resp.data;
      }).catch(error => {
        console.log(error);
      });

    }


  }
</script>


<style>
</style>
