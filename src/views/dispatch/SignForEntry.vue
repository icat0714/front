<template>
  <el-container style="margin-top: 20px;">
    <el-header>
      录入人姓名:
      <el-input style="width: 200px;" placeholder="请输入来电电话" />
      工作单号:
      <el-input style="width: 200px;" placeholder="请输入来电电话" />
      <el-button type="primary" icon="el-icon-search">查台</el-button>
      <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      <el-button type="primary" @click="more = !more" icon="el-icon-refresh">更多</el-button>
      <el-button type="primary" @click="OpenTheNew">新增</el-button>
      <el-button type="primary" @click="OpenTheChange">修改</el-button>
      <el-button type="primary" @click="OpenTheDetails">详情</el-button>
    </el-header>
    <el-main>
      <div v-if="more">
        所属单位:
        <el-input placeholder="请输入来电电话" />
        通知单号:
        <el-input placeholder="请输入来电电话" />
        <br /><br />
      </div>
      <el-table highlight-current-row @row-click="getTableRow" :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="workorderid" label="工作单ID" width="180">
        </el-table-column>
        <el-table-column prop="worksheetno" label="工作单号">
        </el-table-column>
        <el-table-column prop="workordertype" label="工作单类型">
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].workordertype==1">
              <el-tag type="success">返单</el-tag>
            </span>
            <span v-if="tableData[scope.$index].workordertype==2">
              <el-tag type="danger">调单</el-tag>
            </span>
            <span v-if="tableData[scope.$index].workordertype==3">
              <el-tag type="danger">正常单据</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="workordertype" label="签收类型">
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].signtype==1">
              <el-tag type="success">正常签收</el-tag>
            </span>
            <span v-if="tableData[scope.$index].signtype==2">
              <el-tag type="danger">反向签收</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="syunitsinputid.name" label="录入单位">
        </el-table-column>
        <el-table-column prop="syemp.id" label="录入人编号">
        </el-table-column>
        <el-table-column prop="syemp.empname" label="录入人姓名">
        </el-table-column>
        <el-table-column prop="recipient" label="签收人">
        </el-table-column>
        <el-table-column prop="couriername" label="派送员工姓名">
        </el-table-column>

      </el-table>
      <el-dialog :title="title" :visible="allocation" @close="allocation = false">
        <el-form :inline="true" v-model="information" label-position="left">
          <el-row>
            <!-- <el-form-item label="工作单号">
              <el-input v-model="information.WORKSHEETNO"></el-input>
            </el-form-item> -->
            <el-form-item label="返货标志">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="工作单类型">
              <el-select v-model="information.WORKORDERTYPE" placeholder="请选择">
                <el-option label="返单" :value="1"></el-option>
                <el-option label="调单" :value="2"></el-option>
                <el-option label="正常单据" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="签收类型">
              <el-radio v-model="information.SIGNTYPE" :label="1">正常签收</el-radio>
              <el-radio v-model="information.SIGNTYPE" :label="2">反向签收</el-radio>
            </el-form-item>
            <!-- <el-form-item label="原单核销标志">
              <el-input placeholder="请输入原单核销标志"></el-input>
            </el-form-item> -->
            <el-form-item label="签收人">
              <el-input v-model="information.RECIPIENT" placeholder="请输入签收人"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="派送员工号">
              <el-input v-model="information.COURIERINT" placeholder="请输入派送员工号"></el-input>
            </el-form-item>
            <el-form-item label="派送员名称">
              <el-input v-model="information.COURIERNAME" placeholder="请输入派送员名称"></el-input>
            </el-form-item>
            <!--  <el-form-item label="派件单位">
              <el-input placeholder="请输入派件单位"></el-input>
            </el-form-item> -->
          </el-row>
          <el-row>
            <el-form-item label="签收时间">
              <el-date-picker v-model="information.SIGNTIME" type="date" placeholder="请选择签收日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="录入人">
              <el-input v-model="information.INPUTPERSONID" placeholder="请输入录入人"></el-input>
            </el-form-item>
            <el-form-item label="录入单位">
              <el-input v-model="information.INPUTID" placeholder="请输入录入单位"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="录入时间">
              <el-date-picker v-model="information.INPUTTIME" type="date" placeholder="请选择录入时间">
              </el-date-picker>
            </el-form-item>

          </el-row>


        </el-form>
        <div>
          <el-button @click="allocation = false">取 消</el-button>
          <el-button @click="renewal" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="详情" :visible="details" @close="details = false">
        <el-tabs v-model="activeName">
          <el-tab-pane label="业务通知单信息" name="first">
            <el-row>
              <el-col :span='8'>
                工作单ID:
                <el-input v-model="particulars.WORKORDERID" :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                工作单号:
                <el-input  v-model="particulars.WORKSHEETNO" :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                工作单类型:
                <template>
                  <span v-if="particulars.WORKORDERTYPE==1">
                     <el-input :disabled="true" value="返单"></el-input>
                  </span>
                  <span v-if="particulars.WORKORDERTYPE==2">
                    <el-input :disabled="true" value="调单"></el-input>
                  </span>
                  <span v-if="particulars.WORKORDERTYPE==3">
                    <el-input :disabled="true" value="正常单据"></el-input>
                  </span>
                </template>

              </el-col>
            </el-row>
            <br />
            <el-row>
              <el-col :span='8'>
                签收类型:
               <template>
                 <span v-if="particulars.SIGNTYPE==1">
                    <el-input :disabled="true" value="正常签收"></el-input>
                 </span>
                 <span v-if="particulars.SIGNTYPEE==2">
                   <el-input :disabled="true" value="反向签收"></el-input>
                 </span>
               </template>
              </el-col>
              <el-col :span='8'>
                录入单位:
                <el-input v-model="particulars.INPUTID" :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                录入人编码:
                <el-input v-model="particulars.INPUTPERSONCODE" :disabled="true"></el-input>
              </el-col>
            </el-row>
            <br />
<!--            <el-row>
              <el-col :span='8'>
                录入人姓名:
                <el-input v-model="particulars.WORKSHEETNO" :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                签收人:
                <el-input v-model="particulars.WORKSHEETNO" :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                派送员工号:
                <el-input v-model="particulars.WORKSHEETNO" :disabled="true"></el-input>
              </el-col>
            </el-row>
            <br />
            <el-row>
              <el-col :span='8'>
                派送员工姓名:
                <el-input v-model="particulars.WORKSHEETNO" :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                签收单位:
                <el-input v-model="particulars.WORKSHEETNO" :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                签收时间:
                <el-input v-model="particulars.WORKSHEETNO" :disabled="true"></el-input>
              </el-col>
            </el-row>
            <br />
            <el-row>
              <el-col :span='8'>
                录入人:
                <el-input v-model="particulars.WORKSHEETNO" :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                录入时间:
                <el-input v-model="particulars.WORKSHEETNO"  :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                录入单位
                <el-input v-model="particulars.WORKSHEETNO" :disabled="true"></el-input>
              </el-col>
            </el-row>
            <br />
            <el-row>
              <el-col :span='8'>
                作废标记:
                <el-input :disabled="true"></el-input>
              </el-col>
              <el-col :span='8'>
                异常备注:
                <el-input style="width: 400px;" :disabled="true"></el-input>
              </el-col>
            </el-row> -->

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
        title: '新增',
        id: null,
        information: {
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
          INPUTTIME: null
        },
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
          INPUTTIME: null
        }
      }
    },
    methods: {
      OpenTheNew() {
        this.title = '新增'
        this.allocation = true;
        this.forbidden = false;
        this.information = {
          ID: null,
          WORKORDERID: null,
          WORKSHEETNO: null,
          WORKORDERTYPE: null,
          SIGNTYPE: "1",
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
        };
      },
      OpenTheChange() {
        if (this.id == null) {
          this.$message({
            message: '请选择欲修改项',
            type: 'warning'
          });
        } else {
          this.forbidden = false;
          this.title = "修改";
          this.allocation = true;
          let params = {
            id: this.id
          };
          let url = 'http://localhost/Json/DisPatch/SignForEntry/selectById';
          var str = qs.stringify(params);
          axios.post(url, str).then(resp => {
            this.information = {
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
            };
          }).catch(error => {
            console.log(error);
          });
        }
      },
      OpenTheDetails() {
        if (this.id == null) {
          this.$message({
            message: '请选择欲查询详情项',
            type: 'warning'
          });
        } else {
          this.title = '详情';
          this.details = true;
          let params = {
            id: this.id
          };
          let url = 'http://localhost/Json/DisPatch/SignForEntry/selectById';
          var str = qs.stringify(params);
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
            };
          }).catch(error => {
            console.log(error);
          });
        }
      },
      renewal() {
        if (this.title == "新增") {
          alert()
          let url = "http://localhost/Json/DisPatch/SignForEntry/addDisWorkOrderSign";
          let params = {
            ID: this.information.ID,
            WORKORDERID: this.information.WORKORDERID,
            WORKSHEETNO: this.information.WORKSHEETNO,
            WORKORDERTYPE: this.information.WORKORDERTYPE,
            SIGNTYPE: this.information.SIGNTYPE,
            COURIERINT: this.information.COURIERINT,
            COURIERNAME: this.information.COURIERNAME,
            RECIPIENT: this.information.RECIPIENT,
            SIGNUNIT: this.information.SIGNUNIT,
            SIGNTIME: this.information.SIGNTIME,
            INVALIDATEMARK: this.information.INVALIDATEMARK,
            ABNORMALMARK: this.information.ABNORMALMARK,
            INPUTPERSONCODE: this.information.INPUTPERSONCODE,
            INPUTPERSONID: this.information.INPUTPERSONID,
            INPUTID: this.information.INPUTID,
            INPUTTIME: this.information.INPUTTIME,
          };
          var str = qs.stringify(params);
          axios.post(url, str).then(resp => {
            axios.post('http://localhost:80/Json/DisPatch/SignForEntry/selectAllList', null).then(
              resp => {
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
          this.allocation = false;


        } else if (this.title == "修改") {
          let url = "http://localhost/Json/DisPatch/SignForEntry/updateDisWorkOrderSign";
          let params = {
            ID: this.information.ID,
            WORKORDERID: this.information.WORKORDERID,
            WORKSHEETNO: this.information.WORKSHEETNO,
            WORKORDERTYPE: this.information.WORKORDERTYPE,
            SIGNTYPE: this.information.SIGNTYPE,
            COURIERINT: this.information.COURIERINT,
            COURIERNAME: this.information.COURIERNAME,
            RECIPIENT: this.information.RECIPIENT,
            SIGNUNIT: this.information.SIGNUNIT,
            SIGNTIME: this.information.SIGNTIME,
            INVALIDATEMARK: this.information.INVALIDATEMARK,
            ABNORMALMARK: this.information.ABNORMALMARK,
            INPUTPERSONCODE: this.information.INPUTPERSONCODE,
            INPUTPERSONID: this.information.INPUTPERSONID,
            INPUTID: this.information.INPUTID,
            INPUTTIME: this.information.INPUTTIME,
          };
          var str = qs.stringify(params);
          axios.post(url, str).then(resp => {
            axios.post('http://localhost:80/Json/DisPatch/SignForEntry/selectAllList', null).then(resp => {
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
          this.allocation = false;

        }

      },
      getTableRow(row) {
        this.id = row.id;
      }
    },
    created: function() {
      let url = 'http://localhost:80/Json/DisPatch/SignForEntry/selectAllList';
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
