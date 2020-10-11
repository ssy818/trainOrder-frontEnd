<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>出行向导</el-breadcrumb-item>
      <el-breadcrumb-item>时刻表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="timeForm" :rules="timeFormRules" class="form-inline">
          <el-form-item label="车次" label-width="120px" prop="id">
            <el-input v-model="timeForm.id" placeholder="请输入内容" style="width: 300px">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="出发日期" label-width="120px" prop="date" style="margin-left: 20px;">
            <el-date-picker v-model="timeForm.date" type="date" placeholder="选择日期" style="width: 300px;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 80px;">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-table height="250" border style="width: 100%">
          <el-table-column label="序号">
          </el-table-column>
          <el-table-column label="发时">
          </el-table-column>
          <el-table-column label="停靠车站">
          </el-table-column>
          <el-table-column label="到时">
          </el-table-column>
          <el-table-column label="历时">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
      name: "Time",
      data() {
        return {
          timeForm: {
            id: '',
            date: ''
          },
          timeFormRules: {
            id: [
              { required: true, message: "请输入车次", trigger: blur}
            ],
            date: [
              { required: true, message: "请输入出发日期", trigger: blur}
            ]
          }
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
