<template>
  <div class="divClass">
    <!--面包屑-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a>书本管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-form :inline="true" class="demo-form-inline" style="margin-top: 10px;">
      <el-form-item label="书本名称">
        <el-input v-model="bookname" placeholder="请输入书本名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table :data="result" style="width: 100%;" :border="true" max-height="550">
      <el-table-column prop="id" label="ID" min-width="20" align="center"></el-table-column>
      <el-table-column prop="bookname" label="书本名称" min-width="40"></el-table-column>
      <el-table-column prop="price" label="书本价格" min-width="50"></el-table-column>
      <el-table-column prop="booktype" label="书本类型" min-width="70"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background style="margin-top: 20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page" :page-sizes="[1, 2, 3, 4]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="cleanForm">
      <el-form :model="bookForm" ref="bookForm" :rules="rules">
        <el-form-item label="编号" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="bookForm.id"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书本名称" prop="bookname" :label-width="formLabelWidth">
          <el-input v-model="bookForm.bookname"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书本价格" prop="price" :label-width="formLabelWidth">
          <el-input v-model="bookForm.price"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书本类型"  prop="booktype" :label-width="formLabelWidth">
          <el-select v-model="bookForm.booktype"  placeholder="--请选择书本类型--" style="width: 100%;">
            <el-option label="修仙" value="修仙"></el-option>
            <el-option label="玄幻" value="玄幻"></el-option>
            <el-option label="名著" value="名著"></el-option>
            <el-option label="言情" value="言情"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'BookList',
    data: function() {
      return {
        bookname: null,
        result: [],
        total: 10,
        page: 1,
        rows: 3,
        bookForm: {
          id: null,
          bookname: null,
          price: null,
          booktype: null
        },
        dialogFormVisible: false,
        formLabelWidth: "80px",
        title: '书本新增',
        rules: {
          bookname: [{
              required: true,
              message: '请输入书本名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 5,
              message: '长度在 1 到 5 个字符',
              trigger: 'blur'
            }
          ],
          price: [{
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          }],
          booktype: [{
            required: true,
            message: '请选择书本类型',
            trigger: 'change'
          }]
        }


      }
    },
    methods: {
      onSubmit: function() {

      },
      //修改的方法
      handleEdit: function(row) { //row代表当前行对象
        this.title = '书本编辑';
        //console.log(row)
        //在对话框的表单中显示数据
        this.bookForm.id = row.id;
        this.bookForm.bookname = row.bookname;
        this.bookForm.price = row.price;
        this.bookForm.booktype = row.booktype;

        //显示对话框
        this.dialogFormVisible = true;
      },

      //关闭对话框清空数据的方法
      cleanForm: function() {
        this.title = '书本新增';
        //清空表单数据
        this.bookForm.id = null;
        this.bookForm.bookname = null;
        this.bookForm.price = null;
        this.bookForm.booktype = null;

      },

      //删除的方法
      handleDelete: function(row) {

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      //提交的方法
      doSubmit: function() {
        this.$refs['bookForm'].validate((valid) => {

          if (valid) {
            let url = 'http://localhost:8080/addBooks';
            if (this.title == '书本编辑') {
              url = 'http://localhost:8080/updateBooks';
            }

            let params = {
              id: this.bookForm.id,
              bookname: this.bookForm.bookname,
              price: this.bookForm.price,
              booktype: this.bookForm.booktype
            }

            //ajax提交数据
            axios.post(url, qs.stringify(params)).then(resp => {
                //隐藏对话框
                this.dialogFormVisible = false;
            }).catch(error => {
              console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });




        this.title = '书本新增';
        //清空表单数据
        this.bookForm.id = null;
        this.bookForm.bookname = null;
        this.bookForm.price = null;
        this.bookForm.booktype = null;
      },


      handleSizeChange: function(rows) { //每页行数
        console.log("每页:" + rows);
        this.rows = rows;
        this.query();
      },
      handleCurrentChange: function(page) { //当前页数
        console.log("当前页:" + page);
        this.page = page;
        this.query();

      },
      query: function() {
        let url = 'http://localhost:8080/findBooks';
        let params = {
          bookname: this.bookname,
          page: this.page,
          rows: this.rows
        }

        let str = qs.stringify(params);
        axios.post(url, str).then(resp => {
          this.result = resp.data.rows;
          this.total = resp.data.total
        }).catch(error => {
          console.log(error);
        });
      }
    },
    created: function() {
      this.query();

    }
  }
</script>

<style>
  .divClass {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
