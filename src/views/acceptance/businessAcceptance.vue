<template>
  <div>

    <br />
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;">
      <el-form-item label="通知单号">
        <el-input v-model="formInline.BusinessNoticeNo" placeholder="通知单号"></el-input>
      </el-form-item>
      <el-form-item label="客户编号">
        <el-input v-model="formInline.CustomCode" placeholder="客户编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>



    <el-row>
      <el-button type="primary" @click="dialogFormVisible=true">新增</el-button>
      <el-button type="success">编辑</el-button>
      <el-button type="primary">追单</el-button>
      <el-button type="primary">改单</el-button>
      <el-button type="primary">销单</el-button>
      <el-button type="primary">运费计算</el-button>
    </el-row>


    <el-table :data="tableData" stripe style="width: 100%">


      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="businessnoticeno" label="业务通知单号" width="180">
      </el-table-column>
      <el-table-column prop="customcode" label="客户编号">
      </el-table-column>


      <el-table-column prop="customname" label="客户名称">
      </el-table-column>

      <el-table-column prop="linkman" label="联系人">
      </el-table-column>

      <el-table-column prop="telphone" label="电话">
      </el-table-column>

      <el-table-column prop="pickupaddress" label="取件地址">
      </el-table-column>
      <!-- 没有属性 -->
      <el-table-column prop="" label="取件城市">
      </el-table-column>

      <el-table-column prop="arrivecity" label="到达城市">
      </el-table-column>
      <!-- 没有属性 -->
      <el-table-column prop="" label="产品">
      </el-table-column>

      <el-table-column prop="time" label="预约取件时间">
      </el-table-column>

    </el-table>



    <!-- Form -->

    <el-dialog title="新增" :visible.sync="dialogFormVisible">

      <el-form :model="insertForm" :inline="true">
        <table align="center">
          <tr>
            <td>
              <el-form-item label="业务通知单号" :label-width="formLabelWidth">
                <el-input v-model="insertForm.BusinessNoticeNo" autocomplete="off"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="客户编号" :label-width="formLabelWidth">
                <el-input v-model="insertForm.CustomCode" autocomplete="off"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="客户名称" :label-width="formLabelWidth">
                <el-input v-model="insertForm.CustomName" autocomplete="off"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="联系人" :label-width="formLabelWidth">
                <el-input v-model="insertForm.Linkman" autocomplete="off"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="insertForm.TelPhone" autocomplete="off"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="取件地址" :label-width="formLabelWidth">
                <el-input v-model="insertForm.PickupAddress" autocomplete="off"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="取件城市" :label-width="formLabelWidth">
                <el-input v-model="insertForm.ArriveCity" autocomplete="off"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="到达城市" :label-width="formLabelWidth">
                <el-input v-model="insertForm.ArriveCity" autocomplete="off"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="产品">
                  <el-select v-model="insertForm.BusinessNoticeNo" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
            </td>
            <td>
              <el-form-item label="预约取件时间" :label-width="formLabelWidth">
                <el-input v-model="insertForm.time" autocomplete="off"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="品名" :label-width="formLabelWidth">
                <el-input v-model="insertForm.BusinessNoticeNo" autocomplete="off"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="重量" :label-width="formLabelWidth">
                <el-input v-model="insertForm.Weight" autocomplete="off"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>
              <el-form-item label="体积" :label-width="formLabelWidth">
                <el-input v-model="insertForm.Volume" autocomplete="off"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="insertForm.BusinessNoticeNo" autocomplete="off"></el-input>
              </el-form-item>
            </td>
          </tr>


        </table>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>


  </div>

</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'businessAcceptance',
    data: function() {
      return {
        formInline: {
          BusinessNoticeNo: null,
          CustomCode: null
        },
        insertForm:{
          BusinessNoticeNo:null,
          CustomCode:null,
          CustomName:null,
          Linkman:null,
          TelPhone:null,
          PickupAddress:null,
          ArriveCity:null,
          time:null,
          Weight:null,
          Volume:null

        },
        tableData: [],
        dialogFormVisible: false,
        formLabelWidth: "70"

      }
    },
    methods: {
      onSelect: function() {

        let param = {
          BusinessNoticeNo: this.formInline.BusinessNoticeNo,
          CustomCode: this.formInline.CustomCode
        }
        let url = 'http://localhost/json_AccBusinessadmissibility';
        let str = qs.stringify(param);

        axios.post(url, str).then(resp => {
          this.tableData = resp.data;
        }).catch(error => {
          console.log(error);
        });
      },

      onSubmit:function(){

        let param={
          BUSINESSNOTICENO:this.insertForm.BusinessNoticeNo,
          CUSTOMCODE:this.insertForm.CustomCode,
          CUSTOMNAME:this.insertForm.CustomName,
          LINKMAN:this.insertForm.Linkman,
          TELPHONE:this.insertForm.TelPhone,
          PICKUPADDRESS:this.insertForm.PickupAddress,
          ARRIVECITY:this.insertForm.ArriveCity,
          time:this.insertForm.time,
          WEIGHT:this.insertForm.Weight,
          VOLUME:this.insertForm.Volume
        };
        let url = 'http://localhost/insert_AccBusinessadmissibility';
        let str = qs.stringify(param);
        console.log(this.insertForm.Weight);
        console.log(str);
        axios.post(url, str).then(resp => {
          this.dialogFormVisible=true;
        }).catch(error => {
          console.log(error);
        });
      }

    },
    created: function() {

      let url = 'http://localhost/json_AccBusinessadmissibility';

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
