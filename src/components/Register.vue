<template>
  <div class="register_container">
    <div class="register_box">
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="80px" class="register_form">
        <el-form-item label="手机号" style="width:300px;" prop="user_phone">
          <el-input v-model="registerForm.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="width:300px;" prop="password">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" style="width:300px;" prop="confirm_pwd">
          <el-input v-model="registerForm.confirm_pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="用户名" style="width:300px;" prop="user_name">
          <el-input v-model="registerForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" style="width:300px;" prop="real_name">
          <el-input v-model="registerForm.real_name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" style="width:300px;" prop="person_id">
          <el-input v-model="registerForm.person_id"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" style="width:300px;" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-row>
            <el-button type="primary" @click="ensure">确定</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Register",
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
          registerForm: {
            user_phone: '',
            password: '',
            confirm_password: '',
            user_name: '',
            real_name: '',
            person_id: '',
            email: ''
          },
          registerFormRules: {
            user_phone: [
              { required: true, message: "请输入手机号", trigger: 'blur'}
            ],
            password: [
              { required: true, message: "请输入密码", trigger: 'blur'},
              { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' },
              { validator: validatePass, trigger: 'blur' }
            ],
            confirm_pwd: [
              { required: true, message: "请输入密码", trigger: 'blur'},
              { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' },
              { validator: validatePass2, trigger: 'blur', required: true }
            ],
            user_name: [
              { required: true, message: "请输入用户名", trigger: 'blur'}
            ],
            real_name: [
              { required: true, message: "请输入真实姓名", trigger: 'blur'}
            ],
            person_id: [
              { required: true, message: "请输入身份证号", trigger: 'blur'}
            ]
          }
        }
      },
      methods: {
        ensure() {
          this.$refs.registerFormRef.validate(async valid => {
            if(!valid) return this.$message.error("输入有误");
            const {data:res} = await this.$http.post('register',this.registerForm);
            if(res.status !== 200) return this.$message.error("注册失败");
            else {
              this.$message.success("注册成功");
              await this.$router.push('/login');
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  .register_container {
    background-color: bisque;
    height: 100%;
  }
  .register_box {
    width: 450px;
    height: 600px;
    background-color: aliceblue;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 8%;
    .register_form {
      position: absolute;
      transform: translate(15%,15%);
      box-sizing: border-box;
    }
    .button {
      display: flex;
      justify-content: space-around;
      position: absolute;
      left: 25%;
    }
  }
</style>
