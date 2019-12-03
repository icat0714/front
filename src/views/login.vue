<template>

  <div>
    <el-form v-model="form">
      用户名：<el-input v-model="form.EMPNAME" /> <br />
      密码：<el-input v-model="form.PWD" /><br />
      <input type="button" @click="onSubmit" value="登录" />

    </el-form>

  </div>

</template>

<script>
  import axios from 'axios'
  import qs from 'qs'


  export default {
    name: 'login',
    data: function() {
      return {
        form: {
          EMPNAME: null,
          PWD: null
        },
        user:{}
      }
    },

    methods: {
      onSubmit: function() {

        let param = {
          EMPNAME: this.form.EMPNAME,
          PWD: this.form.PWD
        };
        axios.post("http://localhost/login", qs.stringify(this.form)).then(resp => {
          console.log(resp.data);
          this.user = resp.data
        }).catch(error => {
          console.log(error);
        });

      }
    }

  }
</script>

<style>
</style>
