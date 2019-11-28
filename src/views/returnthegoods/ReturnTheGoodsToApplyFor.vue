<template>
  <el-container style="margin-top: 20px;">
    <el-header>
      工作单号:
      <el-input style="width: 200px;" placeholder="请输入工作单号" />
      返货原因:
      <el-select placeholder="请选择原因">
        <el-option label="类型一" value="1"></el-option>
        <el-option label="类型二" value="2"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search">搜素</el-button>
      <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      <el-button type="primary" @click="more = !more" icon="el-icon-refresh">更多</el-button>
      <el-button type="primary" @click="OpenTheNew">新增</el-button>
      <el-button type="primary" @click="OpenTheChange">修改</el-button>
      <el-button type="primary" @click="voidReturnNote">作废</el-button>
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
      <el-table highlight-current-row @row-click="getTableRow" :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="applicationno" label="申请单号" width="180">
        </el-table-column>
        <el-table-column prop="worksheetno" label="工作单号">
        </el-table-column>
        <el-table-column prop="returntype" label="返货类型">
        </el-table-column>
        <el-table-column prop="aploss" label="破损丢失件数">
        </el-table-column>
        <el-table-column prop="entrytime" label="进港时间">
        </el-table-column>
        <el-table-column prop="receivegunit" label="接收单位">
        </el-table-column>
        <el-table-column prop="invalidatesign" label="作废标志">
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].invalidatesign==0"><el-tag type="success">有效</el-tag></span>
            <span v-if="tableData[scope.$index].invalidatesign==1"><el-tag type="danger">已作废</el-tag></span>
          </template>
        </el-table-column>
        <el-table-column prop="returnunit" label="返货单位">
        </el-table-column>
        <el-table-column prop="entryunit" label="录入单位">
        </el-table-column>
        <el-table-column prop="personname" label="录入人">
        </el-table-column>



      </el-table>
      <el-dialog :title="title" :visible="allocation" @close="allocation = false">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="申请单号">
                <el-input :disabled="forbidden" v-model="information.ApplicationNo" placeholder="请输入申请单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工作单号">
                <el-input :disabled="forbidden" v-model="information.WorkSheetNo" placeholder="请输入工作单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="返货类型">
                <el-select :disabled="forbidden" v-model="information.ReturnType" placeholder="请选择">
                  <el-option label="类型一" value="1"></el-option>
                  <el-option label="类型二" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="申请备注">
                <el-input :disabled="forbidden" v-model="information.ApRemark" placeholder="请输入申请备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="破损丢失件数">
                <el-input :disabled="forbidden" v-model="information.ApLoss" placeholder="请输入破损丢失件数"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进港时间">
                <el-date-picker :disabled="forbidden" v-model="information.EntryTime" type="date" placeholder="请输入进港时间"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="接收单位">
                <el-input :disabled="forbidden" v-model="information.ReceivegUnit" placeholder="请输入接收单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="作废标志">
                <el-radio :disabled="forbidden" v-model="information.InvalidateSign" :label="1">是</el-radio>
                <el-radio :disabled="forbidden" v-model="information.InvalidateSign" :label="0">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="返货单位">
                <el-input :disabled="forbidden" v-model="information.ReturnUnit" placeholder="请输入返货单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="录入时间">
                <el-date-picker :disabled="forbidden" v-model="information.RecordingTime" type="date" placeholder="请输入录入时间"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="录入单位">
                <el-input :disabled="forbidden" v-model="information.EntryUnit" placeholder="请输入录入单位"></el-input>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="	录入人">
                <el-input :disabled="forbidden" v-model="information.PersonName" placeholder="请输入录入人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="确认时间">
                <el-date-picker :disabled="forbidden" v-model="information.ConfirmationTime" type="date" placeholder="请输入确认时间"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="确认单位">
                <el-input :disabled="forbidden" v-model="information.ConfirmationUnit" placeholder="请输入确认单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="确认人">
                <el-input :disabled="forbidden" v-model="information.ConfirmationPersonName" placeholder="请输入确认人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="返货处理状态">
                <el-select :disabled="forbidden" v-model="information.TreatmentState" placeholder="请选择">
                  <el-option label="未确认" value="1"></el-option>
                  <el-option label="同意返货" value="2"></el-option>
                  <el-option label="拒绝" value="3"></el-option>
                  <el-option label="同意转发" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="返货执行状态">
                <el-select :disabled="forbidden" v-model="information.ApReturnStatus" placeholder="请选择">
                  <el-option label="无" value="1"></el-option>
                  <el-option label="已转发" value="2"></el-option>
                  <el-option label="已返货" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="系统自动确认标志">
                <el-radio :disabled="forbidden" v-model="information.IdentificationSign" :label="0">是</el-radio>
                <el-radio :disabled="forbidden" v-model="information.IdentificationSign" :label="1">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="拒绝类型">
                <el-select :disabled="forbidden" v-model="information.DenialType" placeholder="请选择">
                  <el-option label="类型一" value="1"></el-option>
                  <el-option label="类型二" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="处理意见">
                <el-input :disabled="forbidden" v-model="information.HandlingOpinions" type="textarea" :rows="4"
                  placeholder="请输入处理意见">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div v-show="!forbidden">
          <el-button @click="allocation = false">取 消</el-button>
          <el-button @click="renewal" type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs'
  export default {
    data: function() {
      return {
        IntoTheWay: '1',
        IntoTarget: null,
        allocation: false,
        more: false,
        activeName: 'first',
        tableData: null,
        title: '新增',
        id: null,
        forbidden: true,
        information: {
          ID: null,
          ApplicationNo: null,
          WorkSheetNo: null,
          ReturnType: null,
          ApRemark: null,
          ApLoss: null,
          EntryTime: null,
          ReceivegUnit: null,
          InvalidateSign: '1',
          ReturnUnit: null,
          RecordingTime: null,
          EntryUnit: null,
          PersonName: null,
          ConfirmationTime: null,
          ConfirmationUnit: null,
          ConfirmationPersonName: null,
          TreatmentState: null,
          ApReturnStatus: null,
          IdentificationSign: '1',
          HandlingOpinions: null,
          DenialType: null,
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
          ApplicationNo: null,
          WorkSheetNo: null,
          ReturnType: null,
          ApRemark: null,
          ApLoss: null,
          EntryTime: null,
          ReceivegUnit: null,
          InvalidateSign: '1',
          ReturnUnit: null,
          RecordingTime: null,
          EntryUnit: null,
          PersonName: null,
          ConfirmationTime: null,
          ConfirmationUnit: null,
          ConfirmationPersonName: null,
          TreatmentState: null,
          ApReturnStatus: null,
          IdentificationSign: '1',
          HandlingOpinions: null,
          DenialType: null,
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
          let url = 'http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectById';
          var str = qs.stringify(params);
          axios.post(url, str).then(resp => {
            console.log(resp)
            this.information = {
              ID: resp.data.id,
              ApplicationNo: resp.data.applicationno,
              WorkSheetNo: resp.data.worksheetno,
              ReturnType: resp.data.returntype,
              ApRemark: resp.data.apremark,
              ApLoss: resp.data.aploss,
              EntryTime: resp.data.entrytime,
              ReceivegUnit: resp.data.receivegunit,
              InvalidateSign: resp.data.invalidatesign,
              ReturnUnit: resp.data.returnunit,
              RecordingTime: resp.data.recordingtime,
              EntryUnit: resp.data.entryunit,
              PersonName: resp.data.personname,
              ConfirmationTime: resp.data.confirmationtime,
              ConfirmationUnit: resp.data.confirmationunit,
              ConfirmationPersonName: resp.data.confirmationpersonname,
              TreatmentState: resp.data.treatmentstate,
              ApReturnStatus: resp.data.apreturnstatus,
              IdentificationSign: resp.data.identificationsign,
              HandlingOpinions: resp.data.handlingopinions,
              DenialType: resp.data.denialtype,
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
          this.forbidden = true;
          this.title = '详情';
          this.allocation = true;
          let params = {
            id: this.id
          };
          let url = 'http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectById';
          var str = qs.stringify(params);
          axios.post(url, str).then(resp => {
            console.log(resp)
            this.information = {
              ID: resp.data.id,
              ApplicationNo: resp.data.applicationno,
              WorkSheetNo: resp.data.worksheetno,
              ReturnType: resp.data.returntype,
              ApRemark: resp.data.apremark,
              ApLoss: resp.data.aploss,
              EntryTime: resp.data.entrytime,
              ReceivegUnit: resp.data.receivegunit,
              InvalidateSign: resp.data.invalidatesign,
              ReturnUnit: resp.data.returnunit,
              RecordingTime: resp.data.recordingtime,
              EntryUnit: resp.data.entryunit,
              PersonName: resp.data.personname,
              ConfirmationTime: resp.data.confirmationtime,
              ConfirmationUnit: resp.data.confirmationunit,
              ConfirmationPersonName: resp.data.confirmationpersonname,
              TreatmentState: resp.data.treatmentstate,
              ApReturnStatus: resp.data.apreturnstatus,
              IdentificationSign: resp.data.identificationsign,
              HandlingOpinions: resp.data.handlingopinions,
              DenialType: resp.data.denialtype,
            };
          }).catch(error => {
            console.log(error);
          });
        }
      },
      renewal() {
        if (this.title == "新增") {
          let url = "http://localhost/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/addRetReturnlist";
          let params = {
            ID: this.information.ID,
            APPLICATIONNO: this.information.ApplicationNo,
            WORKSHEETNO: this.information.WorkSheetNo,
            RETURNTYPE: this.information.ReturnType,
            APREMARK: this.information.ApRemark,
            APLOSS: this.information.ApLoss,
            ENTRYTIME: this.information.EntryTime,
            RECEIVEGUNIT: this.information.ReceivegUnit,
            INVALIDATESIGN: this.information.InvalidateSign,
            RETURNUNIT: this.information.ReturnUnit,
            RECORDINGTIME: this.information.RecordingTime,
            ENTRYUNIT: this.information.EntryUnit,
            PERSONNAME: this.information.PersonName,
            CONFIRMATIONTIME: this.information.ConfirmationTime,
            CONFIRMATIONUNIT: this.information.ConfirmationUnit,
            CONFIRMATIONPERSONNAME: this.information.ConfirmationPersonName,
            TREATMENTSTATE: this.information.TreatmentState,
            APRETURNSTATUS: this.information.ApReturnStatus,
            IDENTIFICATIONSIGN: this.information.IdentificationSign,
            HANDLINGOPINIONS: this.information.HandlingOpinions,
            DENIALTYPE: this.information.DenialType
          };
          var str = qs.stringify(params);
          axios.post(url, str).then(resp => {}).catch(error => {
            console.log(error);
          });
          this.$message({
            message: '更新完成',
            type: 'success'
          });
          this.allocation = false;
          axios.post('http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectAllList', null).then(resp => {
            this.tableData = resp.data;

          }).catch(error => {
            console.log(error);
          });

        } else if (this.title == "修改") {
          let url = "http://localhost/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/updateRetReturnlist";
          let params = {
            ID: this.information.ID,
            APPLICATIONNO: this.information.ApplicationNo,
            WORKSHEETNO: this.information.WorkSheetNo,
            RETURNTYPE: this.information.ReturnType,
            APREMARK: this.information.ApRemark,
            APLOSS: this.information.ApLoss,
            ENTRYTIME: this.information.EntryTime,
            RECEIVEGUNIT: this.information.ReceivegUnit,
            INVALIDATESIGN: this.information.InvalidateSign,
            RETURNUNIT: this.information.ReturnUnit,
            RECORDINGTIME: this.information.RecordingTime,
            ENTRYUNIT: this.information.EntryUnit,
            PERSONNAME: this.information.PersonName,
            CONFIRMATIONTIME: this.information.ConfirmationTime,
            CONFIRMATIONUNIT: this.information.ConfirmationUnit,
            CONFIRMATIONPERSONNAME: this.information.ConfirmationPersonName,
            TREATMENTSTATE: this.information.TreatmentState,
            APRETURNSTATUS: this.information.ApReturnStatus,
            IDENTIFICATIONSIGN: this.information.IdentificationSign,
            HANDLINGOPINIONS: this.information.HandlingOpinions,
            DENIALTYPE: this.information.DenialType
          };
          var str = qs.stringify(params);
          axios.post(url, str).then(resp => {}).catch(error => {
            console.log(error);
          });
          this.$message({
            message: '更新完成',
            type: 'success'
          });
          this.allocation = false;
          axios.post('http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectAllList', null).then(resp => {
            this.tableData = resp.data;
          }).catch(error => {
            console.log(error);
          });
        }

      },
      getTableRow(row) {
        this.id = row.id;
      },
      CloseTheEditor() {
        this.compile = false;
        this.id = null;
        this.information = {
          ID: null,
          Outline: null,
          ReleaseTime: null,
          FailureTime: null,
          Status: '0',
          Content: null
        }
      },
      voidReturnNote() {
        let params = {
          id: this.id
        };
        let url = 'http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/voidReturnNote';
        var str = qs.stringify(params);
        axios.post(url, str).then(resp => {
          if (resp.data >= 0) {
            axios.post('http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectAllList', null).then(
              resp => {
                this.tableData = resp.data;

              }).catch(error => {
              console.log(error);
            });
          } else {
            this.$message.error('操作失败');
          }
        }).catch(error => {
          console.log(error);
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
