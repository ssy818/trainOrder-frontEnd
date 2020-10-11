<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>出行向导</el-breadcrumb-item>
      <el-breadcrumb-item>票价查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" class="form-inline">
          <el-form-item label="出发地" label-width="95px" prop="start">
            <el-input placeholder="北京" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="目的地" label-width="95px" prop="end">
            <el-input placeholder="上海" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="出发日期" label-width="95px" prop="date">
            <el-date-picker type="date" placeholder="选择日期" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 80px;">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-table height="250" border style="width: 100%">
          <el-table-column label="车次" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
      name: "Price",
      data() {
        return {
          priceForm: {
            start: '',
            end: '',
            date: ''
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
