<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>查看信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="text item">
        <template style="align-items: center">
          <el-form :data=checkForm label-position="left" label-width="120px" class="info-table">
            <el-form-item label="用户名">
              <span>{{checkForm.user_name}}</span>
            </el-form-item>
            <el-form-item label="真实姓名">
              <span>{{checkForm.real_name}}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{checkForm.person_id}}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{checkForm.user_phone}}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{checkForm.email}}</span>
            </el-form-item>
          </el-form>
        </template>
      </div>
      <el-button type="primary" @click="fix">修改</el-button>
    </el-card>
  </div>
</template>

<script>
    export default {
      name: "Check",
      data() {
        return {
          checkForm: {
            user_name: JSON.parse(window.sessionStorage.getItem("user"))["user_name"],
            real_name: JSON.parse(window.sessionStorage.getItem("user"))["real_name"],
            person_id: JSON.parse(window.sessionStorage.getItem("user"))["person_id"],
            user_phone: JSON.parse(window.sessionStorage.getItem("user"))["user_phone"],
            email: JSON.parse(window.sessionStorage.getItem("user"))["email"],
          }
        }
      },
      methods: {
        fix() {
          this.$router.push('/info-fix');
        }
      }
    }
</script>

<style lang="less" scoped>
  .box-card {
    display: flex;
    align-items: center;
    .info-table {
      transform: translate(90%,0);
      width: 500px;
    }
    .el-button {
      transform: translate(95%,0);
      margin-left: 500px;
    }
  }
</style>
