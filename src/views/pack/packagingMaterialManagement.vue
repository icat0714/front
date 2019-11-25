<template>
  <div>

    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">包装材料物品管理</el-divider>
      <el-form-item label="物品编码:">
        <el-input v-model="itemcode" placeholder="请输入物品编码"></el-input>
      </el-form-item>
      <el-form-item label="物品名称:">
        <el-input v-model="itemname" placeholder="请输入物品名称"></el-input>
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
        <el-form-item label="计划价格:">
          <el-input v-model="plannedpric" placeholder="请输入计划价格"></el-input>
        </el-form-item>
        <el-form-item label="规格:" style="margin-left: 27px;">
          <el-input v-model="specifications" placeholder="请输入规格"></el-input>
        </el-form-item>
        <el-form-item label="    类型:">
          <el-input v-model="type" placeholder="请输入类型"></el-input>
        </el-form-item>
        <el-form-item label="    状态:">
          <el-select placeholder="全部">
            <el-option label="正常" value=""></el-option>
            <el-option label="作废" value=""></el-option>
          </el-select>
        </el-form-item><br />
      </div>
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
      <!--数据表格-->
      <el-table :data="result" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="id" label="序号" min-width="20" align="center"></el-table-column>
        <el-table-column prop="itemcode" label="物品编码" min-width="50" align="center"></el-table-column>
        <el-table-column prop="itemname" label="物品名称" min-width="50" align="center"></el-table-column>
        <el-table-column prop="plannedprice" label="计划价格" min-width="50" align="center"></el-table-column>
        <el-table-column prop="specifications" label="规格" min-width="40" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" min-width="40" align="center"></el-table-column>
        <el-table-column prop="measurementunit" label="计量单位" min-width="40" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" min-width="40" align="center"></el-table-column>
        <el-table-column prop="" label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

  </div>
</template>

<script>
  import axios from 'axios'
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
        show: false,
        result: []
      }
    },
    created: function() {
      let url = 'http://localhost/Pack/findAllPack';
      axios.post(url, null).then(resp => {
        this.result = resp.data
      }).catch(error => {
        console.log(error);
      });
    }
  }
</script>
<style scoped>

</style>
