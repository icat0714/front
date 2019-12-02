<template>

  <div>

    <table cellspacing="0" border="1" width="1200px" style="margin-top: 10px;" align="center">
      <tr height="50px" bgcolor="#DCDFE6">
        <td>合包</td>
      </tr>
      <tr height="70px">
        <td>
          <el-row>
            <el-button size="mini">拆包</el-button>
          </el-row>
        </td>
      </tr>
    </table>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <table border="0" cellspacing="0" width="1200px" align="center" style="margin-top: 20px;">
        <tr>
          <td>合包号</td>
          <td>
            <el-input v-model="formInline.name" placeholder="合包号" size="small"></el-input>
          </td>
          <td>拆包人</td>
          <td>
            <el-input v-model="formInline.name" placeholder="拆包人" size="small"></el-input>
          </td>
          <td>封签号</td>
          <td>
            <el-input v-model="formInline.name" placeholder="封签号" size="small"></el-input>
          </td>
          <td>到达地</td>
          <td>
            <el-select v-model="formInline.name" size="small">
              <el-option label="请选择" value=""></el-option>
              <el-option label="北京" value="北京"></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="广州" value="广州"></el-option>
              <el-option label="深圳" value="深圳"></el-option>
              <el-option label="杭州" value="杭州"></el-option>
            </el-select>
          </td>
        </tr>

        <tr>
          <td>计算到达地</td>
          <td>
            <el-input v-model="formInline.name" placeholder="计算到达地" size="small"></el-input>
          </td>
          <td>送达时限</td>
          <td>
            <el-input v-model="formInline.name" placeholder="送达时限" size="small"></el-input>
          </td>
          <td>总票数</td>
          <td>
            <el-input v-model="formInline.name" placeholder="总票数" size="small"></el-input>
          </td>
          <td>总件数</td>
          <td>
            <el-input v-model="formInline.name" placeholder="总件数" size="small"></el-input>
          </td>
        </tr>

        <tr>
          <td>总重量</td>
          <td>
            <el-input v-model="formInline.name" placeholder="总重量" size="small"></el-input>
          </td>
          <td>总体积</td>
          <td>
            <el-input v-model="formInline.name" placeholder="总体积" size="small"></el-input>
          </td>
          <td>状态</td>
          <td>
            <el-input v-model="formInline.name" placeholder="状态" size="small"></el-input>
          </td>
          <td>配载要求</td>
          <td>
            <el-input v-model="formInline.name" placeholder="配载要求" size="small"></el-input>
          </td>
        </tr>

      </table>
    </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <table cellspacing="0" width="1200px" align="center" border="0" style="margin-top: 20px;">
        <tr>
          <td>条码号</td>
          <td>品名</td>
          <td>到达地</td>
          <td>票数</td>
          <td>件数</td>
          <td>实际件数</td>
          <td>重量</td>
          <td>体积</td>
          <td>到达时限</td>
          <td>重要提示</td>
          <td>配载要求</td>
        </tr>
        <tr>
          <td>
            <el-input v-model="formInline.name" placeholder="条码号" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="品名" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="到达地" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="票数" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="件数" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="实际件数" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="重量" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="体积" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="到达时限" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="重要提示" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="配载要求" size="small"></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <el-input v-model="formInline.name" placeholder="条码号" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="品名" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="到达地" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="票数" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="件数" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="实际件数" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="重量" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="体积" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="到达时限" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="重要提示" size="small"></el-input>
          </td>
          <td>
            <el-input v-model="formInline.name" placeholder="配载要求" size="small"></el-input>
          </td>
        </tr>
      </table>
    </el-form>
  </div>

</template>

<script>
  import axios from 'axios'
  import qs from 'qs'


  export default {
    name: 'unpacking',
    data: function() {
      return {
        formInline: {
          name: null
        }
      }
    }
  }
</script>

<style>
</style>
