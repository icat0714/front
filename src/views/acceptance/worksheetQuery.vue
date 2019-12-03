<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="工作单号:">
        <el-input v-model="formInline.name" placeholder="工作单号"></el-input>
      </el-form-item>
      <el-form-item label="开单时间">
        <el-input v-model="formInline.name" placeholder="开单时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="dialogFormVisible=true">新增</el-button>


   <el-table
       :data="tableData"
       border
       style="width: 100%">
       <el-table-column
         fixed
         prop="date"
         label="日期"
         width="150">
       </el-table-column>
       <el-table-column
         prop="name"
         label="姓名"
         width="120">
       </el-table-column>
       <el-table-column
         prop="province"
         label="省份"
         width="120">
       </el-table-column>
       <el-table-column
         prop="city"
         label="市区"
         width="120">
       </el-table-column>
       <el-table-column
         prop="address"
         label="地址"
         width="300">
       </el-table-column>
       <el-table-column
         prop="zip"
         label="邮编"
         width="120">
       </el-table-column>
       <el-table-column
         fixed="right"
         label="操作"
         width="100">
         <template slot-scope="scope">
           <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
           <el-button type="text" size="small">编辑</el-button>
         </template>
       </el-table-column>
     </el-table>


  </div>
</template>

<script>
  
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name:'worksheetQuery',
    data:function(){
      return{
        formInline:{
          name:null
        },
        tableData:[],
        dialogFormVisible:false
      }
    },
    methods:{
      onSelect:function(){

      }
    },
    created:function(){
      let url="http://localhost/json_AccWorksheet";

      axios.post(url, null).then(resp => {
        console.log(resp.data);
      }).catch(error => {
        console.log(error);
      });

    }

  }


</script>

<style>
</style>
