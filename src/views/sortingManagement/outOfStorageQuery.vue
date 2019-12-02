<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="操作单位">
        <el-input v-model="formInline.name" placeholder="操作单位"></el-input>
      </el-form-item>
      <el-form-item label="出入类型">
        <el-input v-model="formInline.name" placeholder="出入类型"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="gengDuo=!gengDuo">更多</el-button>
      </el-form-item>


      <div v-show="gengDuo">

        <el-form-item label="含下级" size="mini">
          <el-select v-model="formInline.name">
            <el-option value="0" label="请选择"></el-option>
            <el-option value="1" label="包含"></el-option>
            <el-option value="2" label="不包含"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出入时间">
          <el-input v-model="formInline.name" placeholder="出入时间" size="small"></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-input v-model="formInline.name" placeholder="操作时间" size="small"></el-input>
        </el-form-item>
        <el-form-item label="交接单号">
          <el-input v-model="formInline.name" placeholder="交接单号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="工作单号/合单号">
          <el-input v-model="formInline.name" placeholder="工作单号/合单号" size="small"></el-input>
        </el-form-item>

        <el-form-item label="接货人">
          <el-input v-model="formInline.name" placeholder="接货人" size="small"></el-input>
        </el-form-item>
        <el-form-item label="系统操作员">
          <el-input v-model="formInline.name" placeholder="系统操作员" size="small"></el-input>
        </el-form-item>
        <el-form-item label="查询类型" size="mini">
          <el-select v-model="formInline.name">
            <el-option value="0" label="请选择"></el-option>
            <el-option value="1" label="按单"></el-option>
            <el-option value="2" label="按件"></el-option>
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
      <el-table-column label="交接单号" width="100" prop="name">
      </el-table-column>

      <el-table-column label="工作单号" width="100" prop="name">
      </el-table-column>
      <el-table-column label="件数" width="100" prop="name">
      </el-table-column>
      <el-table-column label="入库人/出库人" width="100" prop="name">
      </el-table-column>
      <el-table-column label="入库时间/出库时间" width="100" prop="name">
      </el-table-column>
      <el-table-column label="交货人" width="100" prop="name">
      </el-table-column>
      <el-table-column label="操作人" width="100" prop="name">
      </el-table-column>
      <el-table-column label="操作时间" width="100" prop="name">
      </el-table-column>
      <el-table-column label="操作单位" width="100" prop="name">
      </el-table-column>

    </el-table>



  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'outOfStorageQuery',
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
