<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>物流交接单查询</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="交接单号:">
        <el-input v-model="transferint" placeholder="请输入交接单号"></el-input>
      </el-form-item>
      <el-form-item label="司机名称:">
        <el-input v-model="driver" placeholder="请输入司机名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
      </el-form>
    <!--数据表格-->
    <el-table :data="data1" style="width: 100%;" :border="true" max-height="550" align="center">
      <el-table-column prop="id" label="编号" min-width="60" align="center"></el-table-column>
      <el-table-column prop="transferint" label="交接单号" min-width="80" align="center"></el-table-column>
      <el-table-column prop="startstation" label="发站" min-width="80" align="center"></el-table-column>
      <el-table-column prop="endstation" label="到站" min-width="80" align="center"></el-table-column>
      <el-table-column prop="dispatcher" label="调度人员" min-width="80" align="center"></el-table-column>
      <el-table-column prop="driver" label="司机" min-width="80" align="center"></el-table-column>
      <el-table-column prop="deliveryperson" label="发货员" min-width="80" align="center"></el-table-column>
      <el-table-column prop="deliverydate" label="发货时间" min-width="80" align="center"></el-table-column>
    </el-table>
    <el-pagination background style="margin-top: 20px;"
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
     name: 'LogLogisticstransfer',
     data: function() {
       return {
         port: null,
         result: [],
         data1: [],
         total: 2,
         page: 1,
         rows: 2,
         id: null,
         transferint: null,
         startstation: null,
         endstation: null,
         dispatcher: null,
         driver: null,
         deliveryperson: null,
         deliverydate: null,
         LineresForm: {
           id: null,
           transferint: null,
           startstation: null,
           endstation: null,
           dispatcher: null,
           driver: null,
           deliveryperson: null,
           deliverydate: null
         }

       }
     },
     methods: {
       onSubmit: function() {
        this.data1 = this.result;
        if (this.transferint == null && this.driver == null) {
          this.findAll();
        }
        if (this.driver != null && this.driver != "") {
          this.data1 = this.data1.filter(c => c.driver.indexOf(this.driver) != -1);

        }
        if (this.transferint != null && this.transferint != "") {
          this.data1 = this.data1.filter(f => f.transferint.indexOf(this.transferint) != -1);
        }
       },
       add: function() {

       }
     },
     created: function() {
       let url = 'http://localhost:/logLogisticstransfer/findAll';
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
