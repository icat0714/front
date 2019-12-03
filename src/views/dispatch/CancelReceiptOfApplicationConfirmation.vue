<template>
  <el-container style="margin-top: 20px;">
    <el-header>
      工作单号:
      <el-input style="width: 200px;" placeholder="请输入工作单号" />
      申请单号:
      <el-input style="width: 200px;" placeholder="请输入申请单号" />
      <el-button type="primary" icon="el-icon-search">搜素</el-button>
      <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      <el-button type="primary" @click="more = !more" icon="el-icon-refresh">更多</el-button>
      <el-button type="primary" @click="applyfor">申请取消</el-button>
      <!--      <el-button type="primary" @click="resellVisible = true">确定</el-button>
      <el-button type="primary" @click="details = true">作废</el-button> -->
      <el-button type="primary" @click="OpenTheDetails">详情</el-button>
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
        <el-table-column prop="worksheetno" label="工作单号" width="180">
        </el-table-column>
        <!--        <el-table-column prop="address" label="申请单号">
        </el-table-column> -->
        <el-table-column prop="signtime" label="签收时间">
        </el-table-column>
        <el-table-column prop="signtype" label="签收状态">
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].signtype==1">
              <el-tag type="success">正常签收</el-tag>
            </span>
            <span v-if="tableData[scope.$index].signtype==2">
              <el-tag type="danger">反向签收</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="syunitssignunit.name" label="签收单位">
        </el-table-column>
        <el-table-column prop="syemp.empname" label="申请人">
        </el-table-column>
        <el-table-column prop="inputtime" label="申请时间">
        </el-table-column>
        <el-table-column prop="syunitsinputid.name" label="申请单位">
        </el-table-column>
        <el-table-column prop="reasonforapplying" label="取消签收">
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].reasonforapplying==null">
              <el-tag type="success">未取消</el-tag>
            </span>
            <span v-if="tableData[scope.$index].reasonforapplying!=null">
              <el-tag type="danger">已取消</el-tag>
            </span>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog :title="title"  :visible="allocation" @close="shut">
        <el-form :inline="true" v-model="particulars" label-position="left">
          <el-row>
            <el-col :span='8'>
              <el-form-item label="工作单号:">
                <el-input v-model="particulars.WORKSHEETNO" :disabled="forbidden"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <el-form-item label="申请原因:">
                <el-input :disabled="cause" v-model="particulars.REASONFORAPPLYING"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='8'>
              <el-form-item label="签收状态:">
                <el-input v-model="particulars.SIGNTYPE" :disabled="forbidden"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="签收单位:">
                <el-input v-model="particulars.SIGNUNIT" :disabled="forbidden"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="申请人:">
                <el-input v-model="particulars.INPUTPERSONID" :disabled="forbidden"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='8'>
              <el-form-item label="申请时间:">
                <el-input v-model="particulars.INPUTTIME" :disabled="forbidden"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="申请单位:">
                <el-input v-model="particulars.INPUTID" :disabled="forbidden"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='8'>
              <el-form-item label="确认时间:">
                <el-input v-model="particulars.SIGNTYPE" :disabled="forbidden"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="确认状态:">
                <el-input v-model="particulars.SIGNTYPE" :disabled="forbidden"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


        </el-form>
        <div v-if="!cause">
          <el-button @click="allocation = false">取 消</el-button>
          <el-button @click="amend" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="详情" :visible="details" @close="details = false">
        <el-tabs v-model="activeName">
          <el-tab-pane label="业务通知单信息" name="first">
            <el-row>
              工作单ID:
              <el-input style="width: 200px;" disabled="true"></el-input>
              工作单号:
              <el-input style="width: 200px;" disabled="true"></el-input>
              工作单类型:
              <el-input style="width: 200px;" disabled="true"></el-input>
            </el-row>
            <br />
            <el-row>
              签收类型:
              <el-input style="width: 200px;" disabled="true"></el-input>
              录入单位:
              <el-input style="width: 200px;" disabled="true"></el-input>
              录入人编码:
              <el-input style="width: 200px;" disabled="true"></el-input>
            </el-row>
            <br />
            <el-row>
              录入人:
              <el-input style="width: 200px;" disabled="true"></el-input>
              录入时间:
              <el-input style="width: 200px;" disabled="true"></el-input>
              录入单位:
              <el-input style="width: 200px;" disabled="true"></el-input>
            </el-row>
            <br />
            <el-row>
              作废标记:
              <el-input style="width: 200px;" disabled="true"></el-input>
              异常备注:
              <el-input style="width: 400px;" disabled="true"></el-input>
            </el-row>

          </el-tab-pane>
        </el-tabs>
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
        IntoTheWay: '1',
        IntoTarget: null,
        allocation: false,
        details: false,
        more: false,
        activeName: 'first',
        tableData: null,
        inde: '哈哈',
        forbidden: true,
        id: null,
        particulars: false,
        cause: false,
        title: '新增',
        particulars: {
          ID: null,
          WORKORDERID: null,
          WORKSHEETNO: null,
          WORKORDERTYPE: null,
          SIGNTYPE: null,
          COURIERINT: null,
          COURIERNAME: null,
          RECIPIENT: null,
          SIGNUNIT: null,
          SIGNTIME: null,
          INVALIDATEMARK: null,
          ABNORMALMARK: null,
          INPUTPERSONCODE: null,
          INPUTPERSONID: null,
          INPUTID: null,
          INPUTTIME: null,
          REASONFORAPPLYING: null
        }
      }
    },
    methods: {
      OpenTheDetails() {
        if (this.id == null) {
          this.$message({
            message: '请选择一行',
            type: 'warning'
          });
          return;
        }
        this.title = '详情';
        this.allocation = true;
        this.cause = true;
        let params = {
          id: this.id,
        };
        var str = qs.stringify(params);
        let url = 'http://localhost:80/Json/DisPatch/SignForEntry/selectById';
        axios.post(url, str).then(resp => {
          this.particulars = {
            ID: resp.data.id,
            WORKORDERID: resp.data.workorderid,
            WORKSHEETNO: resp.data.worksheetno,
            WORKORDERTYPE: resp.data.workordertype,
            SIGNTYPE: resp.data.signtype,
            COURIERINT: resp.data.courierint,
            COURIERNAME: resp.data.couriername,
            RECIPIENT: resp.data.recipient,
            SIGNUNIT: resp.data.signunit,
            SIGNTIME: resp.data.signtime,
            INVALIDATEMARK: resp.data.invalidatemark,
            ABNORMALMARK: resp.data.abnormalmark,
            INPUTPERSONCODE: resp.data.inputpersoncode,
            INPUTPERSONID: resp.data.inputpersonid,
            INPUTID: resp.data.inputid,
            INPUTTIME: resp.data.inputtime,
            REASONFORAPPLYING: resp.data.reasonforapplying
          };
        }).catch(error => {
          console.log(error);
        });
      },
      applyfor() {
        if (this.id == null) {
          this.$message({
            message: '请选择一行',
            type: 'warning'
          });
          return;
        }
        this.allocation = true;
        let params = {
          id: this.id,
        };
        var str = qs.stringify(params);
        let url = 'http://localhost:80/Json/DisPatch/SignForEntry/selectById';
        axios.post(url, str).then(resp => {
          this.particulars = {
            ID: resp.data.id,
            WORKORDERID: resp.data.workorderid,
            WORKSHEETNO: resp.data.worksheetno,
            WORKORDERTYPE: resp.data.workordertype,
            SIGNTYPE: resp.data.signtype,
            COURIERINT: resp.data.courierint,
            COURIERNAME: resp.data.couriername,
            RECIPIENT: resp.data.recipient,
            SIGNUNIT: resp.data.signunit,
            SIGNTIME: resp.data.signtime,
            INVALIDATEMARK: resp.data.invalidatemark,
            ABNORMALMARK: resp.data.abnormalmark,
            INPUTPERSONCODE: resp.data.inputpersoncode,
            INPUTPERSONID: resp.data.inputpersonid,
            INPUTID: resp.data.inputid,
            INPUTTIME: resp.data.inputtime,
            REASONFORAPPLYING: resp.data.reasonforapplying
          };
        }).catch(error => {
          console.log(error);
        });
      },
      getTableRow(row) {
        this.id = row.id;
      },
      amend() {
        this.allocation = false;
        let params = {
          ID: this.id,
          REASONFORAPPLYING: this.particulars.REASONFORAPPLYING

        };
        var str = qs.stringify(params);
        let url = 'http://localhost:80/Json/DisPatch/SignForEntry/updateCancelReceiptConfirmation';
        axios.post(url, str).then(resp => {
          let url = 'http://localhost:80/Json/DisPatch/SignForEntry/selectAllList';
          axios.post(url, null).then(resp => {
            this.tableData = resp.data;
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
        });
        this.id = null;
      },
      shut() {
        this.cause = false;
        this.allocation=false;
      }
    },
    created: function() {
      let url = 'http://localhost:80/Json/DisPatch/SignForEntry/selectAllList';
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
