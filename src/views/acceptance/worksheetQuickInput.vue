<template>
  <div style="width:1297px;">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工作单快速录入</span>
      </div>
      <div class="text item">
        <el-button size="mini" type="success" @click="insert">保存</el-button>
      </div>
    </el-card>

    <table border="1" cellspacing="0" width="100%">
      <tr height="60px" valign="middle" align="center">
        <td width="250px" class="aa">工作单号</td>
        <td width="395px">
          <el-input v-model="AccWorksheet.WORKSHEETNO" placeholder="请输入工作单号"></el-input>
        </td>
        <td width="250px" class="aa">到达地</td>
        <td width="395px">
          <el-input v-model="AccWorksheet.DESTINATION" placeholder="请输入到达地"></el-input>
        </td>
      </tr>

      <tr height="60px" valign="middle" align="center">
        <td width="250px" class="aa">产品</td>
        <td width="395px">
          <el-input v-model="AccWorksheet.PRODUCTTIME" placeholder="请输入产品"></el-input>
        </td>
        <td width="250px" class="aa">总件数</td>
        <td width="395px">
          <el-input v-model="AccWorksheet.TOTAL" placeholder="请输入总件数"></el-input>
        </td>
      </tr>

      <tr height="60px" valign="middle" align="center">
        <td width="250px" class="aa">重量</td>
        <td width="395px">
          <el-input v-model="AccWorksheet.WEIGHT" placeholder="请输入重量"></el-input>
        </td>
        <td width="250px" class="aa">配载要求</td>
        <td width="395px">
          <el-input v-model="AccWorksheet.STOWAGEREQUIREMENTS" placeholder="请输入配载要求"></el-input>
        </td>
      </tr>

    </table>


    <el-dialog title="新增" width="50%" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="AccBusinessadmissibility">

        <el-form-item label="业务通知单号">
          <el-input v-model="AccBusinessadmissibility.BUSINESSNOTICENO" autocomplete="off" size="mini" placeholder="业务通知单号"></el-input>
        </el-form-item>

        <el-form-item label="客户编号">
          <el-input v-model="AccBusinessadmissibility.CUSTOMCODE" autocomplete="off" size="mini" placeholder="客户编号"></el-input>
        </el-form-item>

        <el-form-item label="客户名称">
          <el-input v-model="AccBusinessadmissibility.CUSTOMNAME" autocomplete="off" size="mini" placeholder="客户名称"></el-input>
        </el-form-item>

        <el-form-item label="联系人">
          <el-input v-model="AccBusinessadmissibility.LINKMAN" autocomplete="off" size="mini" placeholder="联系人"></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="AccBusinessadmissibility.TELPHONE" autocomplete="off" size="mini" placeholder="电话"></el-input>
        </el-form-item>

        <el-form-item label="取件地址">
          <el-input v-model="AccBusinessadmissibility.PICKUPADDRESS" autocomplete="off" size="mini" placeholder="取件地址"></el-input>
        </el-form-item>

        <el-form-item label="取件城市">
          <el-input v-model="AccBusinessadmissibility.ARRIVECITY" autocomplete="off" size="mini" placeholder="取件城市"></el-input>
        </el-form-item>

        <el-form-item label="到达城市">
          <el-input v-model="AccBusinessadmissibility.ARRIVECITY" autocomplete="off" size="mini" placeholder="到达城市"></el-input>
        </el-form-item>

        <el-form-item label="产品">
          <el-input v-model="AccBusinessadmissibility.name" autocomplete="off" size="mini" placeholder="产品"></el-input>
        </el-form-item>

        <el-form-item label="预约取件时间">
          <el-input v-model="AccBusinessadmissibility.time" autocomplete="off" size="mini" placeholder="预约取件时间"></el-input>
        </el-form-item>

        <el-form-item label="品名">
          <el-input v-model="AccBusinessadmissibility.name" autocomplete="off" size="mini" placeholder="品名"></el-input>
        </el-form-item>

        <el-form-item label="重量">
          <el-input v-model="AccBusinessadmissibility.WEIGHT" autocomplete="off" size="mini" placeholder="重量"></el-input>
        </el-form-item>

        <el-form-item label="体积">
          <el-input v-model="AccBusinessadmissibility.VOLUME" autocomplete="off" size="mini" placeholder="体积"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="AccBusinessadmissibility.IMPORTANTHINTS" autocomplete="off" size="mini" placeholder="备注"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>




  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: "worksheetQuickInput",
    data: function() {
      return {
        AccBusinessadmissibility: {
          name: null,
          BUSINESSNOTICENO: null,
          CUSTOMCODE: null,
          CUSTOMNAME: null,
          LINKMAN: null,
          TELPHONE: null,
          PICKUPADDRESS: null,
          ARRIVECITY: null,
          time: null,
          WEIGHT: null,
          VOLUME: null,
          IMPORTANTHINTS: null
        },
        dialogFormVisible: false,
        input: 1,
        AccWorksheet: {
          WORKSHEETNO: null,
          DESTINATION: null,
          PRODUCTTIME: null,
          TOTAL: null,
          WEIGHT: null,
          STOWAGEREQUIREMENTS: null
        }
      }
    },
    methods: {
      insert: function() {
        this.AccBusinessadmissibility.BUSINESSNOTICENO=this.AccWorksheet.WORKSHEETNO;
        this.dialogFormVisible = true;

      },
      onSubmit: function() {
        let str = qs.stringify(this.AccWorksheet);
        let url = "http://localhost/insert_AccWorkSheet";

        axios.post(url, str).then(resp => {

        }).catch(error => {
          console.log(error);
        });

        url = "http://localhost/insert_AccBusinessadmissibility";
        str = qs.stringify(this.AccBusinessadmissibility);

        axios.post(url, str).then(resp => {

        }).catch(error => {
          console.log(error);
        });
        this.dialogFormVisible = false;

        this.AccWorksheet= {
          WORKSHEETNO: null,
          DESTINATION: null,
          PRODUCTTIME: null,
          TOTAL: null,
          WEIGHT: null,
          STOWAGEREQUIREMENTS: null
        };

        this.AccBusinessadmissibility= {
          name: null,
          BUSINESSNOTICENO: null,
          CUSTOMCODE: null,
          CUSTOMNAME: null,
          LINKMAN: null,
          TELPHONE: null,
          PICKUPADDRESS: null,
          ARRIVECITY: null,
          time: null,
          WEIGHT: null,
          VOLUME: null,
          IMPORTANTHINTS: null
        }

      }


    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

  .aa {
    background-color: #DCDFE6;
  }
</style>
