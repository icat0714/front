<template>
  <div>

    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px;margin-left: 30px;">
      <el-divider content-position="left">包装信息查询</el-divider>
      <el-form-item label="工作单号:">
        <el-input v-model="warehouseno" placeholder="请输入工作单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="doSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" icon="el-icon-minus" @click="cleanInput">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="show = !show" icon="el-icon-more-outline">更多</el-button>
      </el-form-item><br />
      <div v-if="show">
      <el-form-item label="入库人员:">
         <el-input v-model="drawername" placeholder="请输入入库人员"></el-input>
      </el-form-item>
      <el-form-item label="出库人员:">
         <el-input v-model="drawername1" placeholder="请输入出库人员"></el-input>
      </el-form-item><br/>
      </div>
      <!--数据表格-->
      <el-table :data="data" style=" margin-top:10px;width: 100%;" :border="true" max-height="550">
        <el-table-column prop="id" label="序号" min-width="20" align="center"></el-table-column>
        <el-table-column prop="warehouseno" label="工作单号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="transport" label="运输单号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="drawername" label="入库人" min-width="40" align="center"></el-table-column>
        <el-table-column prop="drawertime" label="入库时间" min-width="40" align="center"></el-table-column>
        <el-table-column prop="drawername1" label="出库人" min-width="40" align="center"></el-table-column>
        <el-table-column prop="downtime" label="出库时间" min-width="40" align="center"></el-table-column>
        <el-table-column prop="subordinateunit" label="所在单位" min-width="40" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" min-width="40" align="center"></el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'pack',
    data: function() {
      return {
        result:[],
        data:[],
        show:false,
        warehouseno:null,
        drawertime:null,
        drawername1:null,
        drawername:null
      }
    },
    //查询
    created:function(){
      let url = 'http://localhost/Stock/findAllStock';
      axios.post(url, null).then(resp => {
        this.result = resp.data;
        this.data = resp.data;
      }).catch(error => {
        console.log(error);
      });
    },
    methods:{
      //多条件查询
      doSubmit: function() {
          this.data = this.result;
          if (this.warehouseno == null && this.drawername == null && this.drawername1 == null ) {
            this.findAll();
          }
          if (this.warehouseno != null && this.warehouseno != "") {
            this.data = this.data.filter(f => f.warehouseno.indexOf(this.warehouseno) != -1);
          }
          if (this.drawername != null && this.drawername != "") {
            this.data = this.data.filter(a => a.drawername.indexOf(this.drawername) != -1);
          }
          if (this.drawername1 != null && this.drawername1 != "") {
            this.data = this.data.filter(b => b.drawername1.indexOf(this.drawername1) != -1);
          }
          return this.data;
      },
      cleanInput:function(){
        this.warehouseno=null;
        this.drawername=null;
        this.drawername1=null;
      },
      findAll:function(){
        let url = 'http://localhost/Stock/findAllStock';
        axios.post(url, null).then(resp => {
          this.result = resp.data;
          this.data = resp.data;
        }).catch(error => {
          console.log(error);
        });
      }
    }


  }
</script>
<style scoped>

</style>
