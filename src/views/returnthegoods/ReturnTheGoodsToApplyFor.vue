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
      <el-button type="primary">确定</el-button>
      <el-button type="primary">作废</el-button>
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
        </el-table-column>
        <el-table-column prop="returnunit" label="返货单位">
        </el-table-column>
        <el-table-column prop="entryunit" label="录入单位">
        </el-table-column>
        <el-table-column prop="personname" label="录入人">
        </el-table-column>



      </el-table>
      <el-dialog :title="title" :visible="allocation" @close="allocation = false">
        <el-form v-model="information" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col span="8">
              <el-form-item label="申请单号">
                <el-input v-model="information.ApplicationNo" placeholder="请输入申请单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="工作单号">
                <el-input v-model="information.WorkSheetNo" placeholder="请输入工作单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="返货类型">
                <el-select v-model="information.ReturnType" placeholder="请选择">
                  <el-option label="类型一" value="shanghai"></el-option>
                  <el-option label="类型二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="申请备注">
                <el-input v-model="information.ApRemark" placeholder="请输入申请备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="破损丢失件数">
                <el-input v-model="information.ApLoss" placeholder="请输入破损丢失件数"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="进港时间">
                <el-date-picker v-model="information.EntryTime" type="date" placeholder="请输入进港时间" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="接收单位">
                <el-input v-model="information.ReceivegUnit" placeholder="请输入接收单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="作废标志">
                <el-radio v-model="information.InvalidateSign" label="0">是</el-radio>
                <el-radio v-model="information.InvalidateSign" label="1">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="返货单位">
                <el-input v-model="information.ReturnUnit" placeholder="请输入返货单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="录入时间">
                <el-date-picker v-model="information.RecordingTime" type="date" placeholder="请输入录入时间" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="录入单位">
                <el-input v-model="information.EntryUnit" placeholder="请输入录入单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="	录入人">
                <el-input v-model="information.PersonName" placeholder="请输入录入人"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="确认时间">
                <el-date-picker v-model="information.ConfirmationTime" type="date" placeholder="请输入确认时间" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="确认单位">
                <el-input v-model="information.ConfirmationUnit" placeholder="请输入确认单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="确认人">
                <el-input v-model="information.ConfirmationPersonName" placeholder="请输入确认人"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="返货处理状态">
                <el-select v-model="information.TreatmentState" placeholder="请选择">
                  <el-option label="未确认" value="1"></el-option>
                  <el-option label="同意返货" value="2"></el-option>
                  <el-option label="拒绝" value="3"></el-option>
                  <el-option label="同意转发" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="返货执行状态">
                <el-select v-model="information.ApReturnStatus" placeholder="请选择">
                  <el-option label="无" value="1"></el-option>
                  <el-option label="已转发" value="2"></el-option>
                  <el-option label="已返货" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="系统自动确认标志">
                <el-radio v-model="information.IdentificationSign" label="0">是</el-radio>
                <el-radio v-model="information.IdentificationSign" label="1">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="拒绝类型">
                <el-select v-model="information.DenialType" placeholder="请选择">
                  <el-option label="类型一" value="shanghai"></el-option>
                  <el-option label="类型二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="24">
              <el-form-item label="处理意见">
                <el-input v-model="information.HandlingOpinions" type="textarea" :rows="4" placeholder="请输入处理意见">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
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
          IdentificationSign: '0',
          HandlingOpinions: null,
          DenialType: null,
        }
      }
    },
    methods: {
      OpenTheNew() {
        this.title = '新增'
        this.allocation = true;
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
          IdentificationSign: '0',
          HandlingOpinions: null,
          DenialType: null,
        };
      },
      OpenTheDetails() {
        if (this.information.ID == null) {
          this.$message({
            message: '请选择欲查询详情项',
            type: 'warning'
          });
        } else {
          this.title = '详情';
          this.allocation = true;
        }

      },
      renewal() {
        this.loading = true;
        if (this.title == "新增") {
          let url = "http://localhost/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/addRetReturnlist";
          let params = {
            ID: this.information.ID,
            OUTLINE: this.information.Outline,
            RELEASETIME: this.information.ReleaseTime,
            FAILURETIME: this.information.FailureTime,
            STATUS: this.information.Status,
            CONTENT: this.information.Content
          };
          var str = qs.stringify(params);
          axios.post(url, str).then(resp => {
          }).catch(error => {
            console.log(error);
          });
          this.$message({
            message: '更新完成',
            type: 'success'
          });
          this.compile = false;
          this.loading = false;
          axios.post('http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectAllList', null).then(resp => {
            this.tableData = resp.data;
            this.getData();
          }).catch(error => {
            console.log(error);
          });

        }

      },
      getTableRow(row) {
        console.log(row);
        this.information = {
          ID: row.id,
          Outline: row.outline,
          ReleaseTime: row.releasetime,
          FailureTime: row.failuretime,
          Status: row.status,
          Content: row.content
        }
      },
      CloseTheEditor() {
        this.compile = false;
        this.information = {
          ID: null,
          Outline: null,
          ReleaseTime: null,
          FailureTime: null,
          Status: '0',
          Content: null
        }
      }
    },
    created: function() {
      let url = 'http://localhost:80/Json/ReturnTheGoods/ReturnTheGoodsToApplyFor/selectAllList';
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
