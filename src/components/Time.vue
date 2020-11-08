<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>出行向导</el-breadcrumb-item>
      <el-breadcrumb-item>时刻表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="timeFormRef" :model="timeForm" :rules="timeFormRules" class="form-inline">
          <el-form-item label="车次" label-width="120px" prop="train_no">
            <el-input v-model="timeForm.train_no" placeholder="请输入内容" style="width: 300px">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="出发日期" label-width="120px" prop="depart_date" value-format="yyyy-MM-dd" style="margin-left: 20px;">
            <el-date-picker v-model="timeForm.depart_date" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width: 300px;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 80px;" @click="getTrainStationList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-table :data="trainStationList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100px">
          </el-table-column>
          <el-table-column label="发时" prop="leave_time">
          </el-table-column>
          <el-table-column label="停靠车站" prop="station_name">
          </el-table-column>
          <el-table-column label="到时" prop="arrive_time">
          </el-table-column>
          <el-table-column label="历时" prop="last_time">
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
          trainStationList: [],
          timeForm: {
            train_no: '',
            depart_date: ''
          },
          timeFormRules: {
            train_no: [
              { required: true, message: "请输入车次", trigger: blur}
            ],
            depart_date: [
              { required: true, message: "请输入出发日期", trigger: blur}
            ]
          },
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          }
        }
      },
      methods: {
        getTrainStationList() {
          this.$refs.timeFormRef.validate(async valid => {
            if(!valid) return this.$message.error("输入有误");
            const {data:res} = await this.$http.post("findTrainStation",this.timeForm);
            if(res.status !== 200) {
              return this.$message.error(res.message);
            }
            else this.trainStationList = res.data;
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
