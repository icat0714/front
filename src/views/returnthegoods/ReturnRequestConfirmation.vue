<template>
  <el-container style="margin-top: 20px;">
    <el-header>
      工作单号:
      <el-input style="width: 200px;" placeholder="请输入工作单号" />
      返货原因:
      <el-select placeholder="请选择原因">
        <el-option label="类型一" value="shanghai"></el-option>
        <el-option label="类型二" value="beijing"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search">搜素</el-button>
      <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      <el-button type="primary" @click="more = !more" icon="el-icon-refresh">更多</el-button>
      <el-button type="primary">申请确认</el-button>
      <el-button type="primary">货物追踪</el-button>
      <el-button type="primary" @click="returnTheGoods">返货</el-button>
      <el-button type="primary" @click="refuse">拒绝</el-button>
      <el-button type="primary">取消</el-button>
    </el-header>
    <el-main>
      <div v-if="more">
        所属单位:
        <el-input style="width: 200px;" placeholder="请输入来电电话" />
        通知单号:
        <el-input style="width: 200px;" placeholder="请输入来电电话" />
        <br /><br />
      </div>
      <el-table @row-click="getTableRow" highlight-current-row :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="confirmationtime" label="确认时间" width="180">
        </el-table-column>
        <el-table-column prop="confirmationunit" label="确认单位">
        </el-table-column>
        <el-table-column prop="confirmationpersonname" label="确认人">
        </el-table-column>
        <el-table-column prop="treatmentstate" label="返货处理状态">
          <!-- 1=未确认，2=同意返货
          3=拒绝，4=同意转发 -->
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].treatmentstate==1">
              <el-tag type="danger">未确定</el-tag>
            </span>
            <span v-if="tableData[scope.$index].treatmentstate==2">
              <el-tag type="success">同意返货</el-tag>
            </span>
            <span v-if="tableData[scope.$index].treatmentstate==3">
              <el-tag type="warning">拒绝</el-tag>
            </span>
            <span v-if="tableData[scope.$index].treatmentstate==4">
              <el-tag type="success">同意转发</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="identificationsign" label="系统自动确认标志">
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].identificationsign==1">
              <el-tag type="danger">未确定</el-tag>
            </span>
            <span v-if="tableData[scope.$index].identificationsign==0">
              <el-tag type="success">已确定</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="handlingopinions" label="返货信息">
        </el-table-column>
        <el-table-column prop=" " label="处理信息">
        </el-table-column>
      </el-table>

    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs'
  export default {
    data: function() {
      return {
        more: false,
        tableData: null,
        id: null
      }
    },
    methods: {

      returnTheGoods() {
        if (this.id == null) {
          this.$message.error('请选择一项');
          return
        }
        let params = {
          ID: this.id,
          TreatmentState: "2"
        };
        var str = qs.stringify(params);
        let url = 'http://localhost:80/Json/ReturnTheGoods/ReturnRequestConfirmation/updateReturnStatus';
        axios.post(url, str).then(resp => {
           this.id = null;
          url = 'http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectAllList';
          axios.post(url, null).then(resp => {
            this.tableData = resp.data;
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
        });
        this.$message({
          message: '更新完成',
          type: 'success'
        });
      },
      getTableRow(row) {
        this.id = row.id;
      },refuse() {
        if (this.id == null) {
          this.$message.error('请选择一项');
          return
        }
        let params = {
          ID: this.id,
          TreatmentState: "3"
        };
        var str = qs.stringify(params);
        let url = 'http://localhost:80/Json/ReturnTheGoods/ReturnRequestConfirmation/updateReturnStatus';
        axios.post(url, str).then(resp => {
          this.id = null;
          url = 'http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectAllList';
          axios.post(url, null).then(resp => {
            this.tableData = resp.data;
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
        });
        this.$message({
          message: '更新完成',
          type: 'success'
        });
      }
    },
    created: function() {
      let url = 'http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectAllList';
      axios.post(url, null).then(resp => {
        this.tableData = resp.data;

      }).catch(error => {
        console.log(error);
      });

    }
  }
</script>

<style>

</style>
