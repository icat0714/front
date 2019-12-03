<template>
  <el-container style="margin-top: 20px;">
    <el-header>
      所属单位:
      <el-input style="width: 200px;" placeholder="请输入来电电话" />
      通知单号:
      <el-input style="width: 200px;" placeholder="请输入来电电话" />
      <el-button type="primary" icon="el-icon-search">查台</el-button>
      <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      <el-button type="primary" @click="more = !more" icon="el-icon-refresh">更多</el-button>
      <el-button type="primary" @click="allocation = true">分配</el-button>
      <!-- <el-button type="primary" @click="resellVisible = true">退回</el-button> -->
      <el-button type="primary" @click="resellVisible = true">销单</el-button>
      <el-button type="primary" @click="details = true">详情</el-button>
    </el-header>
    <el-main>
      <div v-if="more">
        所属单位:
        <el-input style="width: 200px;" placeholder="请输入来电电话" />
        通知单号:
        <el-input style="width: 200px;" placeholder="请输入来电电话" />
        <br /><br />
      </div>
      <el-table highlight-current-row :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="businessnoticeno" label="通知单号" width="180">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.reservationtime" label="预约收件时间">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.customname" label="客户名称">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.pickupaddress" label="取件地址">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.customcode" label="客户编号">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.linkman" label="联系人">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.telphone" label="电话">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.weight" label="重量">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.volume" label="体积">
        </el-table-column>
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.importanthints" label="重要提示">
        </el-table-column>
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.arrivecity" label="到达城市">
        </el-table-column>
      </el-table>
      <el-dialog title="分配" :visible="allocation" @close="allocation = false">
        <el-form>
          <el-form-item label="所属单位">
            <el-select placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分拣编码">
            <el-select placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="allocation = false">取 消</el-button>
          <el-button @click="allocation = false" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="详情" :visible="details" @close="details = false">
        <el-tabs v-model="activeName">
          <el-tab-pane label="业务通知单信息" name="first"></el-tab-pane>
          <el-tab-pane label="工单信息" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="调度历史" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios';
  export default {
    data: function() {
      return {
        IntoTheWay: '1',
        IntoTarget: null,
        allocation: false,
        details: false,
        activeName: 'first',
        more: false,
        tableData:null
      }
    },
    created: function() {
      let url = 'http://localhost:80/Json/ArtificialScheduling/selectAllList';
      axios.post(url, null).then(resp => {
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
