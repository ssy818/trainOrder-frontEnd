<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车票查询</el-breadcrumb-item>
      <el-breadcrumb-item>接续换乘</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="indirectForm" :rules="indirectFormRules" class="form-inline">
          <el-form-item label="出发地" label-width="95px" prop="start">
            <el-input v-model="indirectForm.start" placeholder="北京" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="目的地" label-width="95px" prop="end">
            <el-input v-model="indirectForm.end" placeholder="上海" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="出发日期" label-width="95px" prop="date">
            <el-date-picker v-model="indirectForm.date" type="date" placeholder="选择日期" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="换乘站" label-width="95px">
            <el-input v-model="indirectForm.mid" placeholder="北京" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 50px;">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-table height="250" border style="width: 100%">
          <el-table-column label="出发站">
          </el-table-column>
          <el-table-column label="车次">
          </el-table-column>
          <el-table-column label="出发时间">
          </el-table-column>
          <el-table-column label="到达时间">
          </el-table-column>
          <el-table-column label="换乘车站">
          </el-table-column>
          <el-table-column label="接续时间">
          </el-table-column>
          <el-table-column label="车次">
          </el-table-column>
          <el-table-column label="出发时间">
          </el-table-column>
          <el-table-column label="到达时间">
          </el-table-column>
          <el-table-column label="到达站">
          </el-table-column>
          <el-table-column label="总用时">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
      name: "Indirect",
      data() {
        return {
          indirectForm: {
            start: '',
            end: '',
            date: '',
            mid: ''
          },
          indirectFormRules: {
            start: [
              { required: true, message: "请输入出发地", trigger: blur}
            ],
            end: [
              { required: true, message: "请输入目的地", trigger: blur}
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
