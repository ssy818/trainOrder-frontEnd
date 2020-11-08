<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="text item">
        <template>
          <el-form ref="oldFormRef" :model="oldForm" v-if="fixButton === '确定'" label-position="right" label-width="80px" class="info-table">
            <el-form-item label="旧密码" prop="password">
              <el-input v-model="oldForm.password" type="password" style="width: 300px"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="newFormRef" :model="newForm" v-if="fixButton === '保存'" label-position="right" label-width="80px" class="info-table">
            <el-form-item label="新密码" prop="password">
              <el-input v-model="newForm.password" type="password" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item type="password" label="确认密码" prop="confirm_pwd">
              <el-input v-model="newForm.confirm_pwd" type="password" style="width: 300px"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </div>
      <el-button type="primary" @click="fix">{{fixButton}}</el-button>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Fix",
    data() {
      const validatePass = (rule,value,callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.password !== '') {
            this.$refs.registerFormRef.validateField('confirm_pwd');
          }
          callback();
        }
      };
      const validatePass2 = (rule,value,callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        fixButton: "确定",
        oldForm: {
          user_phone: JSON.parse(window.sessionStorage.getItem("user"))["user_phone"],
          password: ''
        },
        newForm: {
          user_phone: JSON.parse(window.sessionStorage.getItem("user"))["user_phone"],
          password: '',
          confirm_pwd: ''
        },
        oldFormRules: {
          password: [
            { required: true, message: "请输入旧密码", trigger: 'blur'}
          ]
        },
        newFormRules: {
          password: [
            { required: true, message: "请输入新密码", trigger: 'blur'},
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          confirm_pwd: [
            { required: true, message: "请确认密码", trigger: 'blur'},
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur', required: true }
          ],
        }
      }
    },
    methods: {
      fix() {
        if (this.fixButton === "确定") {
          this.$refs.oldFormRef.validate(async valid => {
            if(!valid) return this.$message.error("输入有误");
            const {data:res} = await this.$http.post('login',this.oldForm);
            if(res.status !== 200) return this.$message.error("密码错误");
            else {
              this.$message.success("密码正确");
              this.fixButton = "保存";
            }
          })
        }
        else if (this.fixButton === "保存") {
          this.$refs.newFormRef.validate(async valid => {
            if(!valid) return this.$message.error("输入有误");
            const {data:res} = await this.$http.post('updateUserPwd',this.newForm);
            if(res.status !== 200) return this.$message.error(res.status);
            else {
              this.$message.success("修改成功");
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
