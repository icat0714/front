<template>
  <el-container style="margin-top: 20px;">
    <el-header>
      工作单号:
      <el-input style="width: 200px;" placeholder="请输入工作单号" />
      开单时间:
      <el-input style="width: 200px;" placeholder="请输入工作单号" />
      <el-button type="primary" icon="el-icon-search">搜素</el-button>
      <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      <el-button type="primary" @click="more = !more" icon="el-icon-refresh">更多</el-button>
      <el-button type="primary" @click="exportExcel">生成返货单</el-button>
      <el-button type="primary" @click="resellVisible = true">详细</el-button>
      <el-button type="primary" @click="details = true">作废</el-button>
    </el-header>
    <el-main>
      <div v-if="more">
        所属单位:
        <el-input style="width: 200px;" placeholder="请输入来电电话" />
        通知单号:
        <el-input style="width: 200px;" placeholder="请输入来电电话" />
        <br /><br />
      </div>
      <el-table id="tab" @row-click="getTableRow" highlight-current-row :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="返货状态" width="180">
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
        <el-table-column prop="worksheetno" label="工作单号">
        </el-table-column>
        <el-table-column prop="address" label="品名">
        </el-table-column>
        <el-table-column prop="address" label="处理结果">
        </el-table-column>
        <el-table-column prop="address" label="件数">
        </el-table-column>
        <el-table-column prop="address" label="体积">
        </el-table-column>
        <el-table-column prop="address" label="到达地">
        </el-table-column>
        <el-table-column prop="address" label="委托人">
        </el-table-column>
        <el-table-column prop="address" label="受理人">
        </el-table-column>
        <el-table-column prop="address" label="返货确认人">
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
              <el-input style="width: 200px;" :disabled="true"></el-input>
              工作单号:
              <el-input style="width: 200px;" :disabled="true"></el-input>
              工作单类型:
              <el-input style="width: 200px;" :disabled="true"></el-input>
            </el-row>
            <br />
            <el-row>
              签收类型:
              <el-input style="width: 200px;" :disabled="true"></el-input>
              录入单位:
              <el-input style="width: 200px;" :disabled="true"></el-input>
              录入人编码:
              <el-input style="width: 200px;" :disabled="true"></el-input>
            </el-row>
            <br />
            <el-row>
              录入人:
              <el-input style="width: 200px;" :disabled="true"></el-input>
              录入时间:
              <el-input style="width: 200px;" :disabled="true"></el-input>
              录入单位:
              <el-input style="width: 200px;" :disabled="true"></el-input>
            </el-row>
            <br />
            <el-row>
              作废标记:
              <el-input style="width: 200px;" :disabled="true"></el-input>
              异常备注:
              <el-input style="width: 400px;" :disabled="true"></el-input>
            </el-row>

          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';
  export default {
    data: function() {
      return {
        IntoTheWay: '1',
        IntoTarget: null,
        allocation: false,
        details: false,
        more: false,
        activeName: 'first',
        tableData: null
      }
    },
    methods: {
      exportExcel() {
        /* generate workbook object from table */
        let wb = XLSX.utils.table_to_book(document.querySelector('#tab'));
        /* get binary string as output */
        let wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        });
        try {
          FileSaver.saveAs(new Blob([wbout], {
            type: 'application/octet-stream'
          }), '返货单.xlsx');
        } catch (e) {
          if (typeof console !== 'undefined')
            console.log(e, wbout)
        }
        return wbout
      },
      getTableRow() {

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
