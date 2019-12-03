<template>
  <div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-left: 30px;margin-top: 30px;">
      <el-form-item label="盘点单号:">
        <el-input v-model="formInline.name" placeholder="盘点单号"></el-input>
      </el-form-item>
      <el-form-item label="操作单位">
        <el-input v-model="formInline.name" placeholder="操作单位"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSelect" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="gengDuo=!gengDuo">更多</el-button>
      </el-form-item>


      <div v-show="gengDuo">
        <el-form-item label="盘点人">
          <el-input v-model="formInline.name" placeholder="盘点人"></el-input>
        </el-form-item>
        <el-form-item label="盘点时间">
          <el-input v-model="formInline.name" placeholder="盘点时间"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-row>
      <el-button size="small" type="primary" @click="dialogFormVisible=true">新增</el-button>
    </el-row>


    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="盘库单号" width="120" prop="id">
      </el-table-column>
      <el-table-column label="扫描设备号" width="150" prop="scanid">
      </el-table-column>
      <el-table-column label="总件数" width="150" prop="cargosum">
      </el-table-column>
      <el-table-column label="盘库人" width="150" prop="checkperson">
      </el-table-column>
      <el-table-column label="盘库时间" width="150" prop="checkdate">
      </el-table-column>
      <el-table-column label="操作单位" width="150" prop="checkcompany">
      </el-table-column>


      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="ckmx(scope.row)">查看明细</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="form" :inline="true">

        <el-row :gutter="5">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="扫描设备号">
                <el-input v-model="form.SCANID" placeholder="扫描设备号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="总件数">
                <el-input v-model="form.CARGOSUM" placeholder="总件数"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="盘库人">
                <el-input v-model="form.CHECKPERSON" placeholder="盘库人"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="8">
            <div class="grid-content bg-purple"><label>入库时间</label>
              <el-date-picker v-model="form.CHECKDATE" align="center" type="date" placeholder="入库时间"
                style="width: 100px;">
              </el-date-picker>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="操作单位">
                <el-input v-model="form.CHECKCOMPANY" placeholder="操作单位"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>


        <el-row :gutter="1">
          <el-col :span="3">
            <div class="grid-content bg-purple">工作单号</div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">扫描设备号</div>
          </el-col>

          <el-col :span="2">
            <div class="grid-content bg-purple">件数</div>
          </el-col>

          <el-col :span="2">
            <div class="grid-content bg-purple">重量</div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">体积</div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">类型</div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">方向</div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">入库人</div>
          </el-col>

          <el-col :span="2">
            <div class="grid-content bg-purple">入库时间</div>
          </el-col>
        </el-row>

        <el-row :gutter="1">
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-input v-model="form1.ID" placeholder="工作单号"></el-input>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-input v-model="form1.PACKAGEID" placeholder="扫描设备号"></el-input>
            </div>
          </el-col>

          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-input v-model="form1.CARGOCOUNT" placeholder="件数"></el-input>
            </div>
          </el-col>

          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-input v-model="form1.WEIGHT" placeholder="重量"></el-input>
            </div>
          </el-col>


          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-input v-model="form1.VOLUME" placeholder="体积"></el-input>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-input v-model="form1.CARGOTYPE" placeholder="类型"></el-input>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-input v-model="form1.DIRECTION" placeholder="方向"></el-input>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-input v-model="form1.STORAGEPERSON" placeholder="入库人"></el-input>
            </div>
          </el-col>

          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-date-picker v-model="form1.time" align="center" type="date" placeholder="入库时间"
                style="width: 100px;">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCheck">确 定</el-button>
      </div>
    </el-dialog>



    <el-dialog title="明细数据" :visible.sync="dialogFormVisible1">
      <el-table :data="tableData1">

        <el-table-column prop="id" label="工作单号" width="180">
        </el-table-column>
        <el-table-column prop="packageid" label="合包号">
        </el-table-column>
        <el-table-column prop="cargocount" label="件数" width="180">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="180">
        </el-table-column>
        <el-table-column prop="volume" label="体积" width="180">
        </el-table-column>
        <el-table-column prop="cargotype" label="类型" width="180">
        </el-table-column>
        <el-table-column prop="direction" label="方向" width="180">
        </el-table-column>
        <el-table-column prop="storageperson" label="入库人" width="180">
        </el-table-column>
        <el-table-column prop="storagedate" label="入库时间" width="180">
        </el-table-column>


      </el-table>
    </el-dialog>




  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'check',
    data: function() {
      return {
        formInline: {
          name: ''
        },
        tableData1: [],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        gengDuo: false,
        dialogFormVisible: false,
        dialogFormVisible1:false,
        form: {
          name: null,
          SCANID: null,
          CARGOSUM: null,
          CHECKPERSON: null,
          CHECKDATE: null,
          CHECKCOMPANY: null
        },
        form1: {
          name: null,
          ID: null,
          PACKAGEID: null,
          CARGOCOUNT: null,
          WEIGHT: null,
          VOLUME: null,
          CARGOTYPE: null,
          DIRECTION: null,
          STORAGEPERSON: null,
          time: null
        }

      }
    },

    methods: {
      onSelect: function() {

      },
      handleEdit: function(row) {

      },
      handleDelete: function(row) {
        let param = {
          ID: row.id
        }

        axios.post("http://localhost/deleteSorCheckbound", qs.stringify(param)).then(resp => {
          console.log(resp.data);
          this.form1.ID = resp.data;
        }).catch(error => {
          console.log(error);
        });
        axios.post("http://localhost/deleteSorCheckbounddetails", qs.stringify(param)).then(resp => {
          console.log(resp.data);
          this.form1.ID = resp.data;
        }).catch(error => {
          console.log(error);
        });

      },
      handleSelectionChange: function() {

      },
      ckmx: function(row) {
        let param = {
          ID: row.id
        }

        axios.post("http://localhost/json_SorCheckbounddetails", qs.stringify(param)).then(resp => {
          console.log(resp.data);
          this.tableData1=resp.data;
        }).catch(error => {
          console.log(error);
        });
        this.dialogFormVisible1=true;
      },
      addCheck: function() {
        this.dialogFormVisible = false;

        axios.post("http://localhost/insertSorCheckbound", qs.stringify(this.form)).then(resp => {
          console.log(resp.data);
          this.form1.ID = resp.data;
        }).catch(error => {
          console.log(error);
        });

        axios.post("http://localhost/addSorCheckbounddetails", qs.stringify(this.form1)).then(resp => {
          console.log(resp.data);
        }).catch(error => {
          console.log(error);
        });



      }
    },
    created: function() {
      axios.post("http://localhost/json_SorCheckboundList", null).then(resp => {
        console.log(resp.data);
        this.tableData = resp.data;
      }).catch(error => {
        console.log(error);
      });
    },
    computed:{
      ppp:function(){
        if(this.dialogFormVisible1==false){
          this.tableData1=null;
        }
        return null;
      }
    }


  }
</script>

<style>
</style>
