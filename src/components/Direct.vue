<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车票查询</el-breadcrumb-item>
      <el-breadcrumb-item>直达车票</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="directForm" :rules="directFormRules" class="form-inline">
          <el-form-item label="出发地" label-width="90px" prop="start">
            <el-input v-model="directForm.start" placeholder="北京" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="目的地" label-width="90px" prop="end">
            <el-input v-model="directForm.end" placeholder="上海" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="出发日期" label-width="90px" prop="date">
            <el-date-picker v-model="directForm.date" type="date" placeholder="选择日期" style="width: 140px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="发车时间" label-width="90px">
            <el-time-picker v-model="directForm.mintime" placeholder="选择时间" style="width: 130px;"></el-time-picker>
          </el-form-item>
          <el-form-item label="-">
            <el-time-picker v-model="directForm.maxtime" placeholder="选择时间" style="width: 130px;"></el-time-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 35px;">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-checkbox :indeterminate="checkForm.isIndeterminate" v-model="checkForm.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkForm.checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in checkForm.cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        <el-table height="250" border style="width: 100%">
          <el-table-column label="车次">
          </el-table-column>
          <el-table-column label="出发站">
          </el-table-column>
          <el-table-column label="到达站">
          </el-table-column>
          <el-table-column label="出发时间">
          </el-table-column>
          <el-table-column label="到达时间">
          </el-table-column>
          <el-table-column label="历时">
          </el-table-column>
          <el-table-column label="特等座">
          </el-table-column>
          <el-table-column label="一等座">
          </el-table-column>
          <el-table-column label="二等座">
          </el-table-column>
          <el-table-column label="软卧">
          </el-table-column>
          <el-table-column label="硬卧">
          </el-table-column>
          <el-table-column label="硬座">
          </el-table-column>
          <el-table-column label="操作">
            <el-button type="text">预定</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  const cityOptions = ['G-高铁', 'D-动车', 'Z-直达', 'T-特快','K-快速'];
  export default {
    name: "Direct",
    data() {
      return {
        directForm: {
          start: '',
          end: '',
          date: '',
          mintime: '',
          maxtime: ''
        },
        directFormRules: {
          start: [
            { required: true, message: "请输入出发地", trigger: blur}
          ],
          end: [
            { required: true, message: "请输入目的地", trigger: blur}
          ],
          date: [
            { required: true, message: "请输入出发日期", trigger: blur}
          ]
        },
        checkForm: {
          checkAll: false,
          checkedCities: ['G-高铁', 'D-动车', 'Z-直达', 'T-特快','K-快速'],
          cities: cityOptions,
          isIndeterminate: true
        }
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkForm.checkedCities = val ? cityOptions : [];
        this.checkForm.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkForm.checkAll = checkedCount === this.cities.length;
        this.checkForm.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
  .el-table {
    margin-top: 15px;
  }
</style>
