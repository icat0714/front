<template>
  <el-container class="main-container">
      <LeftAside :show-collapsed="collapsed" ></LeftAside>
    <el-container>
      <el-header  class="main-header">
        <TopNav  @showCollapsed="getCollapsed"></TopNav>
      </el-header>
      <el-main class="main-center"><router-view></router-view></el-main>
      
    </el-container>
  </el-container>
</template>

<script>
  // 导入组件
  import TopNav from '@/components/common/TopNav.vue'
  import LeftAside from '@/components/common/LeftAside.vue'

  // 导出模块
  export default {
    data: function() {
      return {
        collapsed: true
      }
    },
    components: { //注册组件
      LeftAside,
      TopNav
    },
    methods: {
      getCollapsed: function(collapsed) {
        this.collapsed = collapsed;
      }
    },
    computed: {
      showLeftAside: function() {
        return !this.collapsed ? 'main-aside' : 'main-aside-collapsed'
      }
    }
  };
</script>
<style scoped>
  .main-container {
    height: 100%;
    width: 100%;

  }

  .main-aside-collapsed {
    /* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
    width: 64px !important;
    height: 100%;
    background-color: #334157;
    margin: 0px;
  }

  .main-aside {
    width: 240px !important;
    height: 100%;
    background-color: #334157;
    margin: 0px;
  }

  .main-header,
  .main-center {
    padding: 0px;


  }
</style>
