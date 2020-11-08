<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/thomas.png" alt="">
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="80px" class="login_form">
        <el-form-item label="手机号" style="width:300px;" prop="user_phone">
          <el-input v-model="loginForm.user_phone" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="width:300px;" prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row class="bottom">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="register">注册</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          loginForm: {
            user_phone: '',
            password: ''
          },
          loginFormRules: {
            user_phone: [
              { required: true, message: "请输入手机号", trigger: 'blur'}
            ],
            password: [
              { required: true, message: "请输入密码", trigger: 'blur'}
            ]
          }
        }
      },
      methods: {
        login() {
          this.$refs.loginFormRef.validate(async valid => {
            if(!valid) return this.$message.error("输入有误");
            const {data:res} = await this.$http.post('login',this.loginForm);
            if(res.status !== 200) return this.$message.error("登录失败");
            else {
              this.$message.success("登录成功");
              window.sessionStorage.setItem("user",JSON.stringify(res.data));
              await this.$router.push('/home');
            }
          })
        },
        register() {
          this.$router.push('/register');
        }
      }
    }
</script>

<style lang="less" scoped>
  .login_container {
    background-color: darkcyan;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #dddddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #ffffff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .login_form {
      position: absolute;
      transform: translate(15%,60%);
      box-sizing: border-box;
    }
    .bottom {
      clear: both;
      text-align: center;
    }
  }
</style>
