<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="合包号">
        <el-input v-model="formInline.name" placeholder="合包号"></el-input>
      </el-form-item>
      <el-form-item label="合包状态">
        <el-select v-model="formInline.name">
          <el-option label="请选择" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="gengDuo=!gengDuo">更多</el-button>
      </el-form-item>


      <div v-show="gengDuo">

        <el-form-item label="开始日期">
          <el-input v-model="formInline.name" placeholder="开始日期" size="small"></el-input>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-input v-model="formInline.name" placeholder="结束日期" size="small"></el-input>
        </el-form-item>
        <el-form-item label="设备号">
          <el-input v-model="formInline.name" placeholder="设备号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="合包单位">
          <el-input v-model="formInline.name" placeholder="合包单位" size="small"></el-input>
        </el-form-item>
        <el-form-item label="单位含下级">
          <el-select v-model="formInline.name">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="包含" value="1"></el-option>
            <el-option label="不包含" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>

    <el-row>
      <el-button size="mini" type="primary">导出</el-button>
    </el-row>


    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="50" prop="">
      </el-table-column>
      <el-table-column label="合包号" width="100" prop="name">
      </el-table-column>

      <el-table-column label="封签号" width="100" prop="name">
      </el-table-column>
      <el-table-column label="合包人" width="100" prop="name">
      </el-table-column>
      <el-table-column label="合包单位" width="100" prop="name">
      </el-table-column>
      <el-table-column label="拆包人" width="100" prop="name">
      </el-table-column>
      <el-table-column label="拆包单位" width="100" prop="name">
      </el-table-column>
      <el-table-column label="记录人" width="100" prop="name">
      </el-table-column>
      <el-table-column label="记录时间" width="100" prop="name">
      </el-table-column>

    </el-table>



  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'packageQuery',
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
