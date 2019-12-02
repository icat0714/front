<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>出港配载查询</a></el-breadcrumb-item>
    </el-breadcrumb>
   <!-- <el-header>
          工作单号:
          <el-input style="width: 200px;" placeholder="请输入来电电话" />
          到达口岸:
          <el-input style="width: 200px;" placeholder="请输入来电电话" />
          <el-button type="primary" icon="el-icon-search">查台</el-button>
          <el-button type="primary" icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" @click="more = !more" icon="el-icon-refresh">更多</el-button>
          <el-button type="primary" @click="allocation = true">分配</el-button>
          <el-button type="primary" @click="resellVisible = true">退回</el-button>
          <el-button type="primary" @click="resellVisible = true">销单</el-button>
          <el-button type="primary" @click="details = true">详情</el-button>
        </el-header> -->

    <div class="filter-container">
      <el-input v-model="name" placeholder="工作单号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="name" placeholder="到达口岸" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        更多
      </el-button>
    </div>

    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="ID" min-width="60" align="center"></el-table-column>
      <el-table-column prop="port" label="到达口岸" min-width="40"></el-table-column>
      <el-table-column prop="demand" label="配载方式" min-width="50"></el-table-column>
      <el-table-column prop="vehicleint" label="航班车次" min-width="70"></el-table-column>
      <el-table-column prop="carrier" label="承运商" min-width="50"></el-table-column>
      <el-table-column prop="expectdeparturedate" label="预计离港时间" min-width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.operationtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expectarrivaldate" label="预计到港时间" min-width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.operationtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cargo" label="件数" min-width="70"></el-table-column>
      <el-table-column prop="handleperson" label="处理人" min-width="70"></el-table-column>
    </el-table>
    <el-pagination background style="margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page" :page-sizes="[1, 2, 3, 4]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'Lineresource',
    data: function() {
      return {
        port: null,
        result: [],
        total: 2,
        page: 1,
        rows: 2,
        LineresForm: {
          id: null,
          port: null,
          demand: null,
          vehicleint: null,
          carrier: null,
          expectdeparturedate: null,
          expectarrivaldate: null,
          cargo: null,
          handleperson: null
        }

      }
    },
    methods: {
      onSubmit: function() {

      },
      add: function() {

      }
    },
    created: function() {
      let url = 'http://localhost:/lineresource/findAll';
      axios.post(url, null).then(resp => {
        this.result = resp.data
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
