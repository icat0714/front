<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>出港配载</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="工作单号">
        <el-input v-model="bookname" placeholder="请输入工作单号"></el-input>
      </el-form-item>
      <el-form-item label="到达口岸">
        <el-input v-model="bookname" placeholder="请输入到达口岸"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="工作单号" min-width="50" align="center"></el-table-column>
      <el-table-column prop="PACKINGID" label="合包号" min-width="50"></el-table-column>
      <el-table-column prop="TRANSFER" label="中转" min-width="50"></el-table-column>
      <el-table-column prop="ACTUALCOUNT" label="实际数量" min-width="70"></el-table-column>
      <el-table-column prop="DESTINATION" label="到达地" min-width="50"></el-table-column>
      <el-table-column prop="ENTRUSTCOMPANY" label="受理单位" min-width="70"></el-table-column>
      <el-table-column prop="TACKCARGOADDRESS" label="收货地址" min-width="50"></el-table-column>
      <el-table-column prop="CARGOCOUNT" label="在库件数" min-width="50"></el-table-column>
      <el-table-column prop="CARGOCOUNT" label="实际件数" min-width="70"></el-table-column>
      <el-table-column prop="WEIGHT" label="重量" min-width="70"></el-table-column>
      <el-table-column prop="SURPLUSTIME" label="送达时限" min-width="70"></el-table-column>

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
     name: 'BookList',
     data: function() {
       return {
         port: null,
         result: [],
         total: 2,
         page: 1,
         rows: 2,
         LineresForm: {
           id: null,
           port: null,
           demand: null,
           vehicleint: null,
           carrier: null,
           expectdeparturedate: null,
           expectarrivaldate: null,
           cargo: null,
           handleperson: null
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
       let url = 'http://localhost:/findAll';
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
