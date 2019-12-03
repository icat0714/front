<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="工作单号">
        <el-input v-model="formInline.name" placeholder="工作单号"></el-input>
      </el-form-item>
      <el-form-item label="操作单位">
        <el-input v-model="formInline.name" placeholder="操作单位"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="gengDuo=!gengDuo">更多</el-button>
      </el-form-item>


      <div v-show="gengDuo">

        <el-form-item label="入库时间">
          <el-input v-model="formInline.name" placeholder="入库时间" size="small"></el-input>
        </el-form-item>
        <el-form-item label="预警时间">
          <el-input v-model="formInline.name" placeholder="预警时间" size="small"></el-input>
        </el-form-item>
        <el-form-item label="到达地">
          <el-input v-model="formInline.name" placeholder="到达地" size="small"></el-input>
        </el-form-item>
        <el-form-item label="到达时限">
          <el-input v-model="formInline.name" placeholder="到达时限" size="small"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-row>
      <el-button size="mini" type="primary">导出</el-button>
    </el-row>


    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="50" prop="">
      </el-table-column>
      <el-table-column label="工作单号" width="100" prop="name">
      </el-table-column>

      <el-table-column label="入库人" width="100" prop="name">
      </el-table-column>
      <el-table-column label="入库时间" width="100" prop="name">
      </el-table-column>
      <el-table-column label="在库时间" width="100" prop="name">
      </el-table-column>
      <el-table-column label="到达地" width="100" prop="name">
      </el-table-column>
      <el-table-column label="受理单位" width="100" prop="name">
      </el-table-column>
      <el-table-column label="收货地址" width="100" prop="name">
      </el-table-column>
      <el-table-column label="在库件数" width="100" prop="name">
      </el-table-column>
      <el-table-column label="重量" width="100" prop="name">
      </el-table-column>
      <el-table-column label="送达时限" width="100" prop="name">
      </el-table-column>

    </el-table>



  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'stockQuery',
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
        gengDuo: false

      }
    },

    methods: {
      onSelect: function() {

      }
    }


  }
</script>

<style>
</style>
