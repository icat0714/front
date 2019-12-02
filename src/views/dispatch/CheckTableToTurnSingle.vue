<template>
  <el-container>
    <el-main>
      来电电话：
      <el-input style="width: 200px;" placeholder="请输入来电电话" />
      通知单号：
      <el-input style="width: 200px;" placeholder="请输入来电电话" />
      <el-button type="primary" icon="el-icon-search">查台</el-button>
      <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      <el-button type="primary" icon="el-icon-refresh">更多</el-button>
      <el-button type="primary" @click="OpenTheChange">转单</el-button>
      <!-- <el-button type="primary" @click="resellVisible = true">重发</el-button> --><br /><br />
      <el-table @row-click="getTableRow" highlight-current-row :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="jobno" label="工单号" width="180">
        </el-table-column>
        <el-table-column prop="shortmessageint" label="短信序号">
        </el-table-column>
        <el-table-column prop="businessnoticeno" label="业务通知单号">
        </el-table-column>
        <el-table-column prop="workgenerationtime" label="工单生成时间">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.pickupaddress" label="收件地址">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.linkman" label="联系人">
        </el-table-column>
        <el-table-column prop="accbusinessadmissibility.telphone" label="联系电话">
        </el-table-column>
        <el-table-column prop="aftersinglenum" label="追单次数">
        </el-table-column>
        <el-table-column prop="syunits.name" label="处理单位">
        </el-table-column>
      </el-table>
      <el-dialog title="转单" :visible="resellVisible" @close="resellVisible = false">
        <el-form>
          <el-form-item label="转入方式">
            <el-radio v-model="information.radio" label="PickupUnit">定区编码</el-radio>
            <el-radio v-model="information.radio" label="SmallMemberNum">小件员工号</el-radio>
            <el-radio v-model="information.radio" label="SortingCode">单位</el-radio>
          </el-form-item>
          <el-form-item label="转入目标">
            <el-input v-model="information.content" style="width: 200px;" placeholder="请输入转入目标"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="resellVisible = false">取 消</el-button>
          <el-button @click="transferOfOrder" type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data: function() {
      return {
        IntoTarget: null,
        resellVisible: false,
        tableData: null,
        information: {
          id: null,
          radio: "PickupUnit",
          content: null
        }
      }
    },
    methods: {
      getTableRow(row) {
        this.information = {
          id: row.id,
          radio: "PickupUnit",
          content: null
        }
      },
      OpenTheChange() {
        if (this.information.id == null) {
          this.$message({
            message: '请选择一项在修改',
            type: 'warning'
          });
        } else {
          this.resellVisible = true;
        }

      },
      transferOfOrder() {
        let params = {
          id: this.information.id,
          line: this.information.radio,
          data: this.information.content
        }
        var str = qs.stringify(params);
        let url = 'http://localhost:80/Json/CheckTableToTurnSingle/transferOfOrder';
        axios.post(url, str).then(resp => {
          this.resellVisible = false;
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          let url = 'http://localhost:80/Json/CheckTableToTurnSingle/selectAllList';
          axios.post(url, null).then(resp => {
            console.log(resp.data);
            this.tableData = resp.data;


          }).catch(error => {
            console.log(error);
          });


        }).catch(error => {
          console.log(error);
        });
      }
    },
    created: function() {
      let url = 'http://localhost:80/Json/CheckTableToTurnSingle/selectAllList';
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
