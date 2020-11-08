<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/train.png" alt="" height="80" width="70">
        <span>欢迎使用23333火车订票系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggle">|||</div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>车票查询</span>
            </template>
            <el-menu-item index="/direct-tickets">直达车票</el-menu-item>
            <el-menu-item index="/indirect-tickets">接续换乘</el-menu-item>
            <el-menu-item index="/buy-tickets">车票购买</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>出行向导</span>
            </template>
            <el-menu-item index="/timetable">时刻表</el-menu-item>
            <el-menu-item index="/price">票价查询</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>订单中心</span>
            </template>
            <el-menu-item index="/myorder">我的订单</el-menu-item>
            <el-menu-item index="/change">改签/退票</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">个人信息</span>
            </template>
            <el-menu-item index="/info-check">查看信息</el-menu-item>
            <el-menu-item index="/info-fix">修改密码</el-menu-item>
            <el-menu-item index="/passenger">添加乘客</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "Home",
      data() {
        return {
          isCollapse: false
        }
      },
      methods: {
        logout() {
          window.sessionStorage.clear();
          this.$router.push('/login');
        },
        toggle() {
          this.isCollapse = !this.isCollapse;
        }
      }
    }
</script>

<style lang="less" scoped>
  .home_container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #dddddd;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #dddddd;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
