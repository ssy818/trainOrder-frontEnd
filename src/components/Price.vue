<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>出行向导</el-breadcrumb-item>
      <el-breadcrumb-item>票价查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="priceFormRef" :model="priceForm" :rules="priceFormRules" class="form-inline">
          <el-form-item label="出发地" label-width="110px" prop="start_place">
            <el-input v-model="priceForm.start_place" placeholder="北京" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="目的地" label-width="110px" prop="end_place">
            <el-input v-model="priceForm.end_place" placeholder="上海" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="出发日期" label-width="11git 0px" prop="start_date">
            <el-date-picker v-model="priceForm.start_date" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width: 200px;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 80px;" @click="getTicketPriceList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-table :data="ticketPriceList" border style="width: 100%">
          <el-table-column label="车次" prop="train_no">
          </el-table-column>
          <el-table-column label="出发站" prop="start_station_name">
          </el-table-column>
          <el-table-column label="到达站" prop="end_station_name">
          </el-table-column>
          <el-table-column label="出发时间" prop="start_time">
          </el-table-column>
          <el-table-column label="到达时间" prop="end_time">
          </el-table-column>
          <el-table-column label="历时" prop="last_time">
          </el-table-column>
          <el-table-column label="特等座" prop="premier_seat">
          </el-table-column>
          <el-table-column label="一等座" prop="first_seat">
          </el-table-column>
          <el-table-column label="二等座" prop="second_seat">
          </el-table-column>
          <el-table-column label="软卧" prop="soft_sleeper">
          </el-table-column>
          <el-table-column label="硬卧" prop="hard_sleeper">
          </el-table-column>
          <el-table-column label="硬座" prop="hard_seat">
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
        ticketPriceList:[],
        priceForm: {
          start_place: '',
          end_place: '',
          start_date: '',
          min_time: '',
          max_time: '',
          query: "price"
        },
        priceFormRules: {
          start_place: [
            { required: true, message: "请输入出发地", trigger: blur}
          ],
          end_place: [
            { required: true, message: "请输入目的地", trigger: blur}
          ],
          start_date: [
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
      getTicketPriceList() {
        this.$refs.priceFormRef.validate(async valid => {
          if(!valid) return this.$message.error("输入有误");
          const {data:res} = await this.$http.post('findDirectTicket',this.priceForm);
          if(res.status !== 200) return this.$message.error("结果为空");
          else this.ticketPriceList = res.data;
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
