<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>跟踪表查询</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="物流序号:">
        <el-input v-model="logisticsint" placeholder="请输入物流序号"></el-input>
      </el-form-item>
      <el-form-item label="线路名称:">
        <el-input v-model="linename" placeholder="请输入线路名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-more" @click="more">更多</el-button>
      </el-form-item>
      <br>
      <vue v-show="morekai">

        <el-form-item label="司机">
          <el-input v-model="driver" placeholder="请输入司机"></el-input>
        </el-form-item>
        <el-form-item label="车型">
          <el-input v-model="cartype" placeholder="请输入车型"></el-input>
        </el-form-item>
        <el-form-item label="物流状态">
          <el-input v-model="logisticsstate" placeholder="请输入物流状态"></el-input>
        </el-form-item>
      </vue>

    </el-form>
    <!--数据表格-->
    <el-table :data="data1" style="width: 100%;" :border="true" max-height="550" align="center">
      <el-table-column prop="logisticsint" label="物流序号" min-width="100" align="center"></el-table-column>
      <el-table-column prop="linename" label="线路名称" min-width="70" align="center"></el-table-column>
      <el-table-column prop="startcompany" label="发车单位" min-width="80" align="center"></el-table-column>
      <el-table-column prop="generateperson" label="生成人" min-width="80" align="center"></el-table-column>
      <el-table-column prop="carint" label="车牌号" min-width="100" align="center"></el-table-column>
      <el-table-column prop="driver" label="司机" min-width="70" align="center"></el-table-column>
      <el-table-column prop="driverphone" label="司机电话" min-width="100" align="center"></el-table-column>
      <el-table-column prop="cartype" label="车型" min-width="80" align="center"></el-table-column>
      <el-table-column prop="logisticsstate" label="物流状态" min-width="100" align="center"></el-table-column>
      <el-table-column prop="iscancel" label="作废" min-width="50" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
         <template slot-scope="scope">
        <el-button size="mini" style="width: 100px" type="info" @click="handleList(scope.row)">
          查看明细
        </el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-table>
    <el-pagination background style="margin-top: 20px;" :current-page="page" :page-sizes="[1, 2, 3, 4]" :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    </el-dialog>
    <el-dialog :title="title" :fullscreen="true" :visible.sync="dialogFormVisible">
      <el-table :data="data2" style="width: 100%;" :border="true" max-height="550" align="center">
        <el-table-column prop="id" label="序号" min-width="60" align="center"></el-table-column>
        <el-table-column prop="companyname" label="单位名称" min-width="70" align="center"></el-table-column>
        <el-table-column prop="logisticsint" label="物流序号" min-width="80" align="center"></el-table-column>
        <el-table-column prop="expectdeparturedate" label="预计离开时间" min-width="100" align="center"></el-table-column>
        <el-table-column prop="expectarrivaldate" label="预计到达时间" min-width="100" align="center"></el-table-column>
        <el-table-column prop="actualdeparturedate" label="实际离开时间" min-width="100" align="center"></el-table-column>
        <el-table-column prop="actualarrivaldate" label="实际到达时间" min-width="100" align="center"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- <div v-show="xiangqing">
    <el-table :data="data1" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="logisticsint" label="物流序号" min-width="50"></el-table-column>
      <el-table-column prop="linename" label="线路名称" min-width="70"></el-table-column>
      <el-table-column prop="startcompany" label="发车单位" min-width="80"></el-table-column>
      <el-table-column prop="generateperson" label="生成人" min-width="80"></el-table-column>
      <el-table-column prop="carint" label="车牌号" min-width="100"></el-table-column>
      <el-table-column prop="driver" label="司机" min-width="70"></el-table-column>
      <el-table-column prop="driverphone" label="司机电话" min-width="100"></el-table-column>
      <el-table-column prop="cartype" label="车型" min-width="80"></el-table-column>
      <el-table-column prop="logisticsstate" label="物流状态" min-width="100"></el-table-column>
      <el-table-column prop="iscancel" label="作废" min-width="50"></el-table-column>
    </el-table>
    <el-form-item>
      <el-button size="mini" @click="hand()">返回</el-button>
    </el-form-item>
  </div> -->
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'SelectLogTrack',
    data: function() {
      return {
        port: null,
        result: [],
        data1: [],
        data2: [],
        morekai: false,
         dialogFormVisible: false,
        total: 2,
        page: 1,
        rows: 2,
        logisticsint: null,
        linename: null,
        startcompany: null,
        generateperson: null,
        carint: null,
        driver: null,
        driverphone: null,
        cartype: null,
        logisticsstate: null,
        iscancel: null,
        LineresForm: {
          logisticsint: null,
          linename: null,
          startcompany: null,
          generateperson: null,
          carint: null,
          driver: null,
          driverphone: null,
          cartype: null,
          logisticsstate: null,
          iscancel: null
        }

      }
    },
    methods: {
      onSubmit: function() {

        this.data1 = this.result;
        if (this.logisticsint == null && this.linename == null && this.driver == null && cartype == null &&
          logisticsstate == null) {
          this.findAll();
        }
        if (this.linename != null && this.linename != "") {
          this.data1 = this.data1.filter(c => c.linename.indexOf(this.linename) != -1);

        }
        if (this.logisticsint != null && this.logisticsint != "") {
          this.data1 = this.data1.filter(f => f.logisticsint.indexOf(this.logisticsint) != -1);
        }
        if (this.driver != null && this.driver != "") {
          this.data1 = this.data1.filter(a => a.driver.indexOf(this.driver) != -1);
        }
        if (this.cartype != null && this.cartype != "") {
          this.data1 = this.data1.filter(b => b.cartype.indexOf(this.cartype) != -1);
        }
        if (this.logisticsstate != null && this.logisticsstate != "") {
          this.data1 = this.data1.filter(l => l.logisticsstate.indexOf(this.logisticsstate) != -1);
        }


      },
      more: function() {
        this.morekai = !this.morekai
      },
      handleList: function(){
        this.dialogFormVisible = true
        let url = 'http://localhost:/logLogisticsdetails/findAll';
        axios.post(url, null).then(resp => {
          this.result = resp.data
          this.data2 = resp.data
        }).catch(error => {
          console.log(error);
        });
      },
      add: function() {

      }
    },
    created: function() {
      let url = 'http://localhost:/logLogistics/findAll';
      axios.post(url, null).then(resp => {
        this.result = resp.data
        this.data1 = resp.data
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
