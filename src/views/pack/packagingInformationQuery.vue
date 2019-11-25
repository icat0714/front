<template>
  <div>

    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">包装信息查询</el-divider>
      <el-form-item label="工作单号:">
        <el-input v-model="itemcode" placeholder="请输入工作单号"></el-input>
      </el-form-item>
      <el-form-item label="入库时间:">
        <el-input v-model="itemname" placeholder="请输入入库时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" icon="el-icon-minus">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="show = !show" icon="el-icon-more-outline">更多</el-button>
      </el-form-item><br />
      <div v-if="show">
      <el-form-item label="品名:" style="margin-left: 28px;">
        <el-input v-model="type" placeholder="请输入品名"></el-input>
      </el-form-item>
      <el-form-item label="入库人员:">
         <el-input v-model="type" placeholder="请输入入库人员"></el-input>
      </el-form-item>
      <el-form-item label="出库人员:">
         <el-input v-model="type" placeholder="请输入出库人员"></el-input>
      </el-form-item><br/>
      <el-form-item label="包装人员:">
         <el-input v-model="type" placeholder="请输入包装人员"></el-input>
      </el-form-item>
      <el-form-item label="委托单位:">
         <el-input v-model="type" placeholder="请输入委托单位"></el-input>
      </el-form-item><br/>
      <el-form-item label="包装单位:">
         <el-input v-model="type" placeholder="请输入包装单位"></el-input>
      </el-form-item>
      <el-form-item label="包装单位及下级:">
       <el-select placeholder="1">
         <el-option label="2" value=""></el-option>
         <el-option label="3" value=""></el-option>
       </el-select>
      </el-form-item>
      <el-form-item label="单位含下级:" style="margin-left: 27px;">
        <el-select placeholder="1">
          <el-option label="2" value=""></el-option>
          <el-option label="3" value=""></el-option>
        </el-select>
      </el-form-item>
      </div>
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
      <!--数据表格-->
      <el-table :data="result" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="" label="序号" min-width="20" align="center"></el-table-column>
        <el-table-column prop="" label="工作单号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="品名" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="发货方式" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="包装单位" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="入库人" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="入库时间" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="包装员" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="出库人" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="出库时间" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="操作" min-width="100" align="center"></el-table-column>
      </el-table>
    </el-form>

  </div>
</template>

<script>
  export default {
    name: 'pack',
    data: function() {
      return {
        itemcode: null,
        itemname: null,
        plannedpric: null,
        specifications: null,
        type: null,
        status: null,
        show:false
      }
    }


  }
</script>
<style scoped>

</style>
