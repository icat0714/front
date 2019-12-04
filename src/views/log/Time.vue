<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>时间统计</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="物流序号:">
        <el-input v-model="logisticsint" placeholder="请输入物流序号"></el-input>
      </el-form-item>
      <el-form-item label="单位名称:">
        <el-input v-model="companyname" placeholder="请输入单位名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
      <div class="export">
           <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="success">导出</el-button>
      </div>
    </el-form>

    <!--数据表格-->
    <el-table :data="data1" style="width: 100%;" :border="true" max-height="550" align="center" id="da1">
      <el-table-column prop="id" label="序号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="companyname" label="单位名称" min-width="70" align="center"></el-table-column>
      <el-table-column prop="logisticsint" label="物流序号" min-width="80" align="center"></el-table-column>
      <el-table-column prop="expectdeparturedate" label="预计离开时间" min-width="100" align="center"></el-table-column>
      <el-table-column prop="expectarrivaldate" label="预计到达时间" min-width="100" align="center"></el-table-column>
      <el-table-column prop="actualdeparturedate" label="实际离开时间" min-width="100" align="center"></el-table-column>
      <el-table-column prop="actualarrivaldate" label="实际到达时间" min-width="100" align="center"></el-table-column>
    </el-table>
    <el-pagination background style="margin-top: 20px;" :current-page="page" :page-sizes="[1, 2, 3, 4]" :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'Time',
    data: function() {
      return {
        port: null,
        result: [],
        data1: [],
        total: 2,
        page: 1,
        rows: 2,
        id: null,
        companyname: null,
        logisticsint: null,
        expectdeparturedate: null,
        expectarrivakdate: null,
        actualdeparturedate: null,
        actualarrivaldate: null,
        LineresForm: {
          id: null,
          companyname: null,
          logisticsint: null,
          expectdeparturedate: null,
          expectarrivakdate: null,
          actualdeparturedate: null,
          actualarrivaldate: null
        }

      }
    },
    methods: {
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#da1'));
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
      },
      onSubmit: function() {
        this.data1 = this.result;
        if (this.logisticsint == null && this.companyname == null) {
          this.findAll();
        }
        if (this.companyname != null && this.companyname != "") {
          this.data1 = this.data1.filter(c => c.companyname.indexOf(this.companyname) != -1);

        }
        if (this.logisticsint != null && this.logisticsint != "") {
          this.data1 = this.data1.filter(f => f.logisticsint.indexOf(this.logisticsint) != -1);
        }
      },
      add: function() {

      }
    },
    created: function() {
      let url = 'http://localhost:/logLogisticsdetails/findAll';
      axios.post(url, null).then(resp => {
        this.result = resp.data
        this.data1 = resp.data
      }).catch(error => {
        console.log(error);
      });
    }
  }
</script>

<style>
  .divClass {
    margin-top: 15px;
    margin-left: 15px;
  }
</style>
