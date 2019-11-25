<template>
  <div>

    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">库存管理</el-divider>
      <el-form-item label="货物编码:">
        <el-input v-model="itemcode" placeholder="请输入运输单号"></el-input>
      </el-form-item>
      <el-form-item label="所属单位:">
        <el-select placeholder="部门一">
          <el-option label="部门二" value=""></el-option>
          <el-option label="部门三" value=""></el-option>
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
      <el-form-item label="规格:" style="margin-left: 27px;">
        <el-input v-model="specifications" placeholder="请输入规格"></el-input>
      </el-form-item>
      <el-form-item label="    类型:" style="margin-left: 28px;">
        <el-input v-model="type" placeholder="请输入类型"></el-input>
      </el-form-item>
      <br/>
      </div>
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
      <!--数据表格-->
      <el-table :data="result" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="" label="序号" min-width="20" align="center"></el-table-column>
        <el-table-column prop="" label="货物编码" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="货物名称" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="数量" min-width="50" align="center"></el-table-column>
        <el-table-column prop="" label="计划价格" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="规格" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="类型" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="计量单位" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="金额" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="所属单位" min-width="40" align="center"></el-table-column>
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
