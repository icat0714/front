<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>进港分单</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="中心名称">
        <el-input v-model="bookname" placeholder="请输入中心名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="工作单号" min-width="50" align="center"></el-table-column>
      <el-table-column prop="sendcompany" label="派送单位" min-width="50"></el-table-column>
      <el-table-column prop="cargoaddress" label="货物地址" min-width="50"></el-table-column>
      <el-table-column prop="issueperson" label="分单人" min-width="70"></el-table-column>
      <el-table-column prop="issuedate" label="分单时间" min-width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.operationtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="workaddress" label="入库中心" min-width="70"></el-table-column>
      <el-table-column prop="storagedate" label="入库时间" min-width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.operationtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="outbounddate" label="出库时间" min-width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.operationtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="timelimit" label="送达时限" min-width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.operationtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="batch" label="批次" min-width="70"></el-table-column>

    </el-table>
    <el-pagination background style="margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page" :page-sizes="[1, 2, 3, 4]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-dialog>

  </div>
</template>

<script>
 import axios from 'axios'
   import qs from 'qs'
   export default {
     name: 'IaeArrival',
     data: function() {
       return {
         port: null,
         result: [],
         total: 3,
         page: 1,
         rows: 3,
         LineresForm: {
           id: null,
           sendcompany: null,
           cargoaddress: null,
           issueperson: null,
           issuedate: null,
           workaddress: null,
           storagedate: null,
           outbounddate: null,
           timelimit: null,
           batch: null
         }

       }
     },
     methods: {
       onSubmit: function() {

       },
       add: function() {

       }
     },
     created: function() {
       let url = 'http://localhost:/iaeArrival/findAll';
       axios.post(url, null).then(resp => {
         this.result = resp.data
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
