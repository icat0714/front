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
      <el-button type="primary" @click="allocation = true">新增</el-button>
      <el-button type="primary" @click="resellVisible = true">修改</el-button>
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
        <el-table-column prop="workorderid" label="工作单ID" width="180">
        </el-table-column>
        <el-table-column prop="worksheetno" label="工作单号">
        </el-table-column>
        <el-table-column prop="workordertype" label="工资单类型">
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].workordertype==1">
              <el-tag type="success">返单</el-tag>
            </span>
            <span v-if="tableData[scope.$index].workordertype==2">
              <el-tag type="danger">调单</el-tag>
            </span>
            <span v-if="tableData[scope.$index].workordertype==2">
              <el-tag type="danger">正常单据</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="签收类型">
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].workordertype==1">
              <el-tag type="success">正常签收</el-tag>
            </span>
            <span v-if="tableData[scope.$index].workordertype==2">
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
      <el-dialog title="新增" :visible="allocation" @close="allocation = false">
        <el-form inline="true" label-position="left">
          <el-row>
            <el-form-item label="工作单号">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="返货标志">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="工作单类型">
              <el-select placeholder="请选择">
                <el-option label="类型一" value="shanghai"></el-option>
                <el-option label="类型二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="签收类型">
              <el-radio>是</el-radio>
              <el-radio>否</el-radio>
            </el-form-item>
            <el-form-item label="原单核销标志">
              <el-input placeholder="请输入原单核销标志"></el-input>
            </el-form-item>
            <el-form-item label="签收人">
              <el-input placeholder="请输入签收人"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="派送员工号">
              <el-input placeholder="请输入派送员工号"></el-input>
            </el-form-item>
            <el-form-item label="派送员名称">
              <el-input placeholder="请输入派送员名称"></el-input>
            </el-form-item>
            <el-form-item label="派件单位">
              <el-input placeholder="请输入派件单位"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="签收时间">
              <el-date-picker type="date" placeholder="请选择签收日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="录入人">
              <el-input placeholder="请输入录入人"></el-input>
            </el-form-item>
            <el-form-item label="录入单位">
              <el-input placeholder="请输入录入单位"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="录入时间">
              <el-date-picker type="date" placeholder="请选择录入时间">
              </el-date-picker>
            </el-form-item>

          </el-row>


        </el-form>
        <div>
          <el-button @click="allocation = false">取 消</el-button>
          <el-button @click="allocation = false" type="primary">确 定</el-button>
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
  export default {
    data: function() {
      return {
        IntoTheWay: '1',
        IntoTarget: null,
        allocation: false,
        details: false,
        more: false,
        activeName: 'first',
        tableData:null
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
