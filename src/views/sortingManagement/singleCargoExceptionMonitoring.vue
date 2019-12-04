<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="异常编号">
        <el-input v-model="formInline.name" placeholder="异常编号"></el-input>
      </el-form-item>
      <el-form-item label="发起时间">
        <el-input v-model="formInline.name" placeholder="发起时间"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="gengDuo=!gengDuo">更多</el-button>
      </el-form-item>


      <div v-show="gengDuo">

        <el-form-item label="发起人">
          <el-input v-model="formInline.name" placeholder="发起人" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发起单位">
          <el-input v-model="formInline.name" placeholder="发起单位" size="small"></el-input>
        </el-form-item>

        <el-form-item label="异常类型">
          <el-select v-model="formInline.name">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="有单无货" value="1"></el-option>
            <el-option label="有货无单" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交接单号">
          <el-input v-model="formInline.name" placeholder="交接单号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="单号">
          <el-input v-model="formInline.name" placeholder="单号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="单号">
          <el-input v-model="formInline.name" placeholder="单号" size="small"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.name">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="已处理" value="1"></el-option>
            <el-option label="未处理" value="1"></el-option>
          </el-select>
        </el-form-item>

      </div>
    </el-form>

    <el-row>
      <el-button size="mini" type="primary">出入库跟踪</el-button>
      <el-button size="mini" type="primary">单货异常关闭</el-button>
    </el-row>


    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column label="异常编号" width="100" prop="id">
      </el-table-column>

      <el-table-column label="发起时间" width="100" prop="launchdate">
      </el-table-column>
      <el-table-column label="发起人" width="100" prop="launchperson">
      </el-table-column>
      <el-table-column label="发起单位" width="100" prop="launchcompany">
      </el-table-column>
      <el-table-column label="异常类型" width="100" prop="abnormaltype">
      </el-table-column>
      <el-table-column label="交接单号" width="100" prop="transferint">
      </el-table-column>
      <el-table-column label="单号" width="100" prop="cargoint">
      </el-table-column>
      <el-table-column label="合包号" width="100" prop="packageint">
      </el-table-column>
      <el-table-column label="对冲异常编号" width="100" prop="hedgeabnint">
      </el-table-column>
      <el-table-column label="状态" width="100" prop="abostate">
      </el-table-column>
      <el-table-column label="处理时间" width="100" prop="handledate">
      </el-table-column>

    </el-table>



  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'singleCargoExceptionMonitoring',
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

      },
      handleSelectionChange:function() {

      }
      
    },
    created:function(){
    	axios.post("http://localhost/json_SorAbnormal", null).then(resp => {
    	  console.log(resp.data);
    	  this.tableData = resp.data;
    	}).catch(error => {
    	  console.log(error);
    	});
    }



  }
</script>

<style>
</style>
