<template>
  <div>

    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">包装信息录入</el-divider>
      <el-form-item label="入库单号:">
        <el-input v-model="itemcode" placeholder="请输入入库单号"></el-input>
      </el-form-item>
      <el-form-item label="入库类型:">
        <el-select placeholder="1">
          <el-option label="2" value=""></el-option>
          <el-option label="3" value=""></el-option>
        </el-select>
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
      <el-form-item label="运输单号:" >
        <el-input v-model="type" placeholder="请输入运输单号"></el-input>
      </el-form-item>
      <el-form-item label="所属单位:">
       <el-select placeholder="1">
         <el-option label="2" value=""></el-option>
         <el-option label="3" value=""></el-option>
       </el-select>
       <el-form-item label="状态:">
        <el-select placeholder="1">
          <el-option label="2" value=""></el-option>
          <el-option label="3" value=""></el-option>
        </el-select>
       </el-form-item>
      </el-form-item>
      <br/>
      <el-form-item label="货物编码:">
         <el-input v-model="type" placeholder="请输入货物编码"></el-input>
      </el-form-item>
      <el-form-item label="货物名称:">
         <el-input v-model="type" placeholder="请输入货物名称"></el-input>
      </el-form-item>
      <el-form-item label="开单时间:">
         <el-input v-model="type" placeholder="请输入开单时间"></el-input>
      </el-form-item>
      </div>
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
      <!--数据表格-->
      <el-table :data="result" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="" label="序号" min-width="20" align="center"></el-table-column>
        <el-table-column prop="" label="入库单号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="入库类型" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="运输单号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="所属单位" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="开单人工号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="开单人姓名" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="开单时间" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="状态" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="备注" min-width="40" align="center"></el-table-column>
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
