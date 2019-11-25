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
        <el-input v-model="bookname" placeholder="请输入物流序号"></el-input>
      </el-form-item>
      <el-form-item label="线路状态:">
        <el-input v-model="bookname" placeholder="请输入线路状态"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>

    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="ID" label="序号" min-width="100"></el-table-column>
      <el-table-column prop="ISCANCEL" label="状态" min-width="100"></el-table-column>
      <el-table-column prop="LINENAME" label="线路名称" min-width="70"></el-table-column>
      <el-table-column prop="LOGISTICSINT" label="物流序号" min-width="80"></el-table-column>
      <el-table-column prop="LogLogisticsdetails.EXPECTDEPARTUREDATE" label="预计离开时间" min-width="50"></el-table-column>
      <el-table-column prop="LogLogisticsdetails.EXPECTARRIVALDATE" label="预计到达时间" min-width="100"></el-table-column>
      <el-table-column prop="LogLogisticsdetails.ACTUALDEPARTUREDATE" label="实际离开时间" min-width="50"></el-table-column>
      <el-table-column prop="LogLogisticsdetails.ACTUALARRIVALDATE" label="实际到达时间" min-width="100"></el-table-column>
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
