<template>
  <el-menu background-color="#334157" class="el-menu-demo" mode="horizontal" text-color="#fff" active-text-color="#fff">
    <el-button class="buttonimg">
      <img class="showimg" :src="collapsed?imgshow:imgsq" @click="doToggle()">
      <!--  <i class="el-icon-s-fold"  @click="doToggle()"></i> -->
    </el-button>
    <el-submenu index="2" class="submenu">
      <template slot="title">超级管理员</template>
      <el-menu-item index="2-1">设置</el-menu-item>
      <el-menu-item index="2-2">个人中心</el-menu-item>
      <el-menu-item @click="logOff" index="2-3">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data: function() {
      return {
        collapsed: true,
        imgshow: require("../../assets/img/show.png"),
        imgsq: require("../../assets/img/sq.png")
      }
    },
    methods: {
      doToggle: function() {
        this.collapsed = !this.collapsed;
        this.$emit('showCollapsed', this.collapsed)
      },
      logOff: function() {
        this.$confirm('是否退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            sessionStorage.setItem('user','');
            this.$router.push({
              path: '/'
            });

        }).catch(() => {});

    }
  }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
  }

  .submenu {
    float: right;
  }

  .buttonimg {
    height: 60px;
    background-color: transparent;
    border: none;
  }

  .showimg {
    width: 26px;
    height: 26px;
    position: absolute;
    top: 17px;
    left: 17px;
  }

  .showimg:active {
    border: none;
  }
</style>
