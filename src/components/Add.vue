<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>添加乘客</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="findForm" class="form-inline">
          <el-form-item label="姓名" label-width="50px" prop="id">
            <el-input v-model="findForm.real_name" placeholder="请输入内容" style="width: 300px">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 20px" @click="findPassenger">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info" style="margin-left: 10px" @click="cancelFind">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-table :data="passengerList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100px">
          </el-table-column>
          <el-table-column label="真实姓名" prop="real_name">
          </el-table-column>
          <el-table-column label="身份证号" prop="person_id">
          </el-table-column>
          <el-table-column label="手机号" prop="passenger_phone">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="deletePassenger(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top: 15px" @click="addDialogVisible = true">添加乘客</el-button>
      </div>
    </el-card>
    <el-dialog title="添加乘客" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="100px">
        <el-form-item label="真实姓名" prop="real_name">
          <el-input v-model="addForm.real_name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="person_id">
          <el-input v-model="addForm.person_id"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="passenger_phone">
          <el-input v-model="addForm.passenger_phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPassenger">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "Add",
      data() {
        return {
          passengerList: [],
          addDialogVisible: false,
          findForm: {
            real_name: ''
          },
          deleteForm: {
            user_phone: JSON.parse(window.sessionStorage.getItem("user"))["user_phone"],
            person_id: ''
          },
          addForm: {
            user_phone: JSON.parse(window.sessionStorage.getItem("user"))["user_phone"],
            real_name: '',
            person_id: '',
            passenger_phone: ''
          },
          addFormRules: {
            real_name: [
              { required: true, message: "请输入真实姓名", trigger: 'blur'}
            ],
            person_id: [
              { required: true, message: "请输入身份证号", trigger: 'blur'}
            ],
            passenger_phone: [
              { required: true, message: "请输入手机号", trigger: 'blur'}
            ],
          }
        }
      },
      created() {
        this.getPassengerList();
      },
      methods: {
        async getPassengerList() {
          const user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
          const {data:res} = await this.$http.get("findPassenger",{
            params:{
              user_phone:user_phone
            }
          });
          if(res.status !== 200) return this.$message.error("无乘客");
          else {
            this.passengerList = res.data;
          }
        },
        findPassenger() {
          for (let i = 0; i < this.passengerList.length; i++) {
            if (this.passengerList[i].real_name !== this.findForm.real_name) {
              this.passengerList.splice(i,1);
              i--;
            }
          }
        },
        cancelFind() {
          this.findForm.real_name = '';
          this.getPassengerList();
        },
        async deletePassenger(row) {
          const confirmResult = await this.$confirm("此操作将删除该乘客，是否继续？","提示",{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).catch(err => err)
          if(confirmResult !== "confirm") {
            return this.$message.info("已取消删除");
          }
          this.deleteForm.person_id = row.person_id;
          const {data:res} = await this.$http.post("deletePassenger",this.deleteForm);
          if(res.status !== 200) return this.$message.error("删除失败");
          else {
            this.$message.success("删除成功");
            this.getPassengerList();
          }
        },
        addDialogClosed() {
          this.$refs.addFormRef.resetFields();
        },
        addPassenger() {
          this.$refs.addFormRef.validate(async valid => {
            if(!valid) return this.$message.error("输入有误");
            const {data:res} = await this.$http.post("addPassenger",this.addForm);
            if(res.status !== 200) return this.$message.error("添加失败");
            else {
              this.$message.success("添加成功");
              this.addDialogVisible = false;
              this.getPassengerList();
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  .clearfix {
    display: flex;
    align-items: center;
    .form-inline {
      transform: translate(0,10%);
      height: 50px;
    }
  }
</style>
