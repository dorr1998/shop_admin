<template>
<div class="home">
  <el-container>
  <el-header>
     <div class="logo"></div>
      <div class="logout">
        欢迎光临
        <a href="javascript:;" @click="logout">退出</a>
      </div>
       <h1 class="title">电商后台管理系统</h1>
  </el-header>
  <el-container>
    <el-aside width="200px">
       <!-- el-menu: 菜单组件 -->
        <!-- default-active：默认选中的菜单 -->
        <!-- el-submenu: 子菜单 -->
        <!-- template：表示子菜单的内容 -->
        <!-- el-menu-item-group： 子菜单的分组 -->
        <!-- el-menu-item：菜单项  -->
        <!-- unique-opened：最多只能打开一个子菜单 -->
        <!-- router:开启了路由模式， 当我们点击导航的时候，会发生路由的跳转, 跳转到index对应的路径 -->
       <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <!-- 放菜单项 -->
          <el-menu-item index="/users">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
          </el-menu-item>
          <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
          </el-menu-item>
      </el-submenu>

    </el-menu>
    </el-aside>
    <el-main>
       <!-- 配置了子路由的出口 -->
        <router-view/>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
export default {
  methods: {
    // 退出
    logout() {
      this.$confirm('您确定要退出吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确认按钮
          // 删除token
          localStorage.removeItem('token')
          // 跳转到login组件
          this.$router.push('/login')
          // 提示退出成功
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          // 点击取消按钮
          this.$message({
            type: 'error',
            message: '取消了退出操作'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
// 如果给style添加scoped属性，样式只会在当前组件生效
// 实现原理： 如果给当前组件的style添加了scoped,,,,把当前组件中所有的div都增加一个随机的属性
.el-container {
  height: 100%;
}
.home {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    .logo {
      width: 180px;
      height: 60px;
      float: left;
      background: url('../assets/logo.png') center no-repeat;
      background-size: contain;
    }
    .logout {
      width: 180px;
      height: 60px;
      line-height: 60px;
      font-weight: 700;
      float: right;
      text-align: right;
      a {
        color: darkorange;
      }
    }
    .title {
      overflow: hidden;
      text-align: center;
      height: 60px;
      line-height: 60px;
      color: #fff;
      font-size: 28px;
    }
  }

  .el-aside {
    background-color: #545c64;
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #d4dfe4;
  }
}
</style>
