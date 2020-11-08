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
          <el-form ref="editFormRef" :data=checkForm :model="editForm" :rules="editFormRules" label-position="left" label-width="120px" class="info-table">
            <el-form-item v-if="editButton === '编辑'" label="用户名">
              <span>{{checkForm.user_name}}</span>
            </el-form-item>
            <el-form-item v-if="editButton === '保存'" label="用户名" prop="user_name">
              <el-input v-model="editForm.user_name"></el-input>
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
              <span v-if="editButton === '编辑'">{{checkForm.email}}</span>
              <el-input v-model="editForm.email" v-if="editButton === '保存'"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </div>
      <el-button type="primary" @click="edit">{{editButton}}</el-button>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Check",
    data() {
      return {
        editButton: "编辑",
        checkForm: {
          user_name: JSON.parse(window.sessionStorage.getItem("user"))["user_name"],
          real_name: JSON.parse(window.sessionStorage.getItem("user"))["real_name"],
          person_id: JSON.parse(window.sessionStorage.getItem("user"))["person_id"],
          user_phone: JSON.parse(window.sessionStorage.getItem("user"))["user_phone"],
          email: JSON.parse(window.sessionStorage.getItem("user"))["email"]
        },
        editForm: {
          user_phone: JSON.parse(window.sessionStorage.getItem("user"))["user_phone"],
          user_name: JSON.parse(window.sessionStorage.getItem("user"))["user_name"],
          email: JSON.parse(window.sessionStorage.getItem("user"))["email"]
        },
        editFormRules: {
          user_name: [
            { required: true, message: "请输入用户名", trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      edit() {
        if(this.editButton === "编辑") {
          this.editButton = "保存";
        }
        else {
          this.$refs.editFormRef.validate(async valid => {
            if(!valid) return this.$message.error("输入有误");
            const {data:res} = await this.$http.post('updateUserInfo',this.editForm);
            if(res.status !== 200) return this.$message.error("修改失败");
            else {
              this.$message.success("修改成功");
              window.sessionStorage.setItem("user",JSON.stringify(res.data));
              this.editButton = "编辑";
            }
          })
        }
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
