<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>修改信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="text item">
        <template>
          <el-form label-position="right" label-width="80px" class="info-table">
            <el-form-item label="用户名">
              <el-input style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input style="width: 300px"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </div>
      <el-button type="primary">保存</el-button>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "Fix"
    }
</script>

<style lang="less" scoped>
  .box-card {
    display: flex;
    align-items: center;
    .info-table {
      transform: translate(80%,0);
      width: 500px;
      margin-top: 20px;
    }
    .el-button {
      transform: translate(95%,0);
      margin-left: 500px;
      margin-top: 20px;
    }
  }
</style>
