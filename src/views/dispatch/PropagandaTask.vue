<template>
  <el-container style="margin-top: 20px;">
    <el-header>
      宣传概要:
      <el-input style="width: 200px;" placeholder="请输入宣传概要" />
      发布时间:
      <el-input style="width: 200px;" placeholder="请输入发布时间" />
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button type="primary" icon="el-icon-refresh">重置</el-button>
      <el-button type="primary" @click="more = !more" icon="el-icon-refresh">更多</el-button>
      <el-button type="primary" @click="OpenTheNew">新增</el-button>
      <el-button type="primary" @click="OpenTheChange">修改</el-button>
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
        <el-table-column prop="outline" label="宣传概要" width="180">
        </el-table-column>
        <el-table-column prop="releasetime" label="发布时间">
        </el-table-column>
        <el-table-column prop="failuretime" label="失效时间">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="tableData[scope.$index].status==0">有效</span>
            <span v-if="tableData[scope.$index].status==1">作废</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="宣传内容">
        </el-table-column>


      </el-table>
      <el-dialog :title="title" width="800px" :visible="compile" @close="CloseTheEditor">
        <el-form :model="information" :inline="true" label-position="left">
          <el-row>
            <el-form-item label="发布时间:">
              <el-date-picker v-model="information.ReleaseTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="失效时间:">
              <el-date-picker v-model="information.FailureTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="状态:">
              <el-radio v-model="information.Status" :label="0">有效</el-radio>
              <el-radio v-model="information.Status" :label="1">作废</el-radio>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="宣传概要:">
              <el-input v-model="information.Outline" placeholder="请输入宣传概要"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="宣传内容:">
              <el-input type="textarea" v-model="information.Content" style="width: 500px;" :rows="5" placeholder="请输入宣传内容">
              </el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div>
          <el-button @click="compile = false">取 消</el-button>
          <el-button type="primary" @click="renewal" :loading="loading">确定</el-button>
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
        IntoTheWay: '1',
        IntoTarget: null,
        compile: false,
        more: false,
        activeName: 'first',
        loading: false,
        tableData: null,
        title: '新增',
        information: {
          ID: null,
          Outline: null,
          ReleaseTime: null,
          FailureTime: null,
          Status: '0',
          Content: null
        }

      }
    },
    methods: {
      OpenTheNew() {
        this.title = '新增'
        this.compile = true;
        this.information = {
          ID: null,
          Outline: null,
          ReleaseTime: null,
          FailureTime: null,
          Status: '0',
          Content: null
        }
        let url = 'http://localhost/Json/PropagandaTask/selectAllList';
        axios.post(url, null).then(resp => {
          this.tableData = resp.data;


        }).catch(error => {
          console.log(error);
        });
      },
      OpenTheChange() {
        if (this.information.ID == null) {
          this.$message({
            message: '请选择一项在修改',
            type: 'warning'
          });
        } else {
          this.title = '修改';
          this.compile = true;
        }

      },
      renewal() {
        this.loading = true;
        let params = {
          ID: this.information.ID,
          OUTLINE: this.information.Outline,
          RELEASETIME: this.information.ReleaseTime,
          FAILURETIME: this.information.FailureTime,
          STATUS: this.information.Status,
          CONTENT: this.information.Content
        }
        let url = "http://localhost/Json/PropagandaTask/addDisPropagandatask";
        if (this.title == "修改") {
          url = "http://localhost/Json/PropagandaTask/updateDisPropagandatask";
        }
        var str = qs.stringify(params);
        axios.post(url, str).then(resp => {
          url = 'http://localhost/Json/PropagandaTask/selectAllList';
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

        this.compile = false;
        this.loading = false;

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
      let url = 'http://localhost/Json/PropagandaTask/selectAllList';
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
